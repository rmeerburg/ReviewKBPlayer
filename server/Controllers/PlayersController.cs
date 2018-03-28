﻿using System;
using System.Collections.Generic;
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
            var players = await _context.Players.Include(p => p.Participations).ThenInclude(p => p.Team).ToListAsync();
            var teams = await _context.Teams.ToListAsync();

            return players.Select(p =>
            {
                var model = new PlayerListModel
                {
                    Name = p.Name,
                    RegistrationId = p.RegistrationId,
                    PlayerId = p.PlayerId,
                };
                if(p.Participations.Any())
                    model.CurrentTeam = teams.Find(t => t.TeamId == p.Participations.Last().TeamId).Name;

                return model;
            });
        }

        [HttpGet("api/players/{id}")]
        public IActionResult Get(string id)
        {
            var player = _context.Players
                .Include(p => p.Participations).ThenInclude(p => p.Team)
                .Include(p => p.Participations).ThenInclude(p => p.Reviews).ThenInclude(r => r.SubmittedBy)
                .Include(p => p.Participations).ThenInclude(p => p.Season)
                .FirstOrDefault(p => p.RegistrationId == id);

            if(player != null)
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
