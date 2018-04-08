using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    public class PlayersController : Controller
    {
        private readonly TalentTrackContext _context;

        public PlayersController(TalentTrackContext context)
        {
            _context = context;
        }

        [HttpGet("api/players")]
        public async Task<IEnumerable<PlayerListModel>> Get()
        {
            var teams = await _context.Teams.ToListAsync();
            IQueryable<Player> players;

            if(this.User.IsInRole("admin"))
                players = _context.Players;
            else
                players = _context.Players.FromSql(@"
                select distinct Players.* 
                from Players
                    left join Participations on Players.PlayerId = Participations.PlayerId
                    left join Teams on Teams.TeamId = Participations.TeamId
                    left join Seasons on Seasons.SeasonId = Participations.SeasonId
                    left join TeamCoaches on TeamCoaches.TeamId = Teams.TeamId
                    left join AspNetUsers on TeamCoaches.UserId = AspNetUsers.Id
                where
                    AspNetUsers.Email = {0}
                    and Seasons.IsActive = 1
                    and (TeamCoaches.Enddate is null or TeamCoaches.Enddate > GETDATE())", User.Identity.Name);

            var result = await players.Include(p => p.Participations).ThenInclude(p => p.Team)
                .Include(p => p.Participations).ThenInclude(p => p.Season)
                .ToListAsync();

            return result
            .Select(p =>
            {
                var model = new PlayerListModel
                {
                    Name = p.Name,
                    RegistrationId = p.RegistrationId,
                    PlayerId = p.PlayerId,
                };
                if (p.Participations.Any())
                    model.CurrentTeam = teams.Find(t => t.TeamId == p.Participations.OrderBy(part => part.Season.StartDate).Last().TeamId).Name;

                return model;
            });
        }

        [HttpGet("api/players/{id}")]
        public IActionResult Get(string id)
        {
            var player = _context.Players
                .Include(p => p.Participations)
                .Include(p => p.Participations).ThenInclude(p => p.Team)
                .Include(p => p.Participations).ThenInclude(p => p.Reviews).ThenInclude(r => r.SubmittedBy)
                .Include(p => p.Participations).ThenInclude(p => p.Season)
                .FirstOrDefault(p => p.RegistrationId == id);

            // order participations by season so they naturally lead up to the latest participations. the startdate property for the participation should be used here but that data is not (yet) available
            player.Participations = player.Participations.OrderBy(p => p.Season.StartDate).ToList();

            if (player != null)
                return Ok(player);
            return NotFound();
        }
    }

    public class PlayerListModel
    {
        public string Name { get; set; }
        public Guid PlayerId { get; set; }
        public string CurrentTeam { get; set; }
        public string RegistrationId { get; set; }
    }
}
