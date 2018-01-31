using System;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Server.Data
{
    public class KbContext : DbContext
    {
        public KbContext(DbContextOptions<KbContext> options)
            : base(options)
        {
        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Season> Seasons { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<TeamParticipation> TeamParticipations { get; set; }

        // public async Task EnsureSeeded()
        // {
        //     Season newSeason = null;
        //     Player newPlayer = null;
        //     Team newTeam = null;

        //     if (!await Seasons.AnyAsync())
        //     {
        //         Seasons.Add(newSeason = new Season { Description = "Season 17/18", StartDate = new DateTime(2017, 8, 1), EndDate = new DateTime(2018, 3, 31), });
        //     }

        //     if (!await Players.AnyAsync())
        //     {
        //         Players.Add(newPlayer = new Player { Name = "Piet", });
        //     }

        //     if (!await Teams.AnyAsync())
        //     {
        //         Teams.Add(newTeam = new Team { Name = "A2", SeasonId = newSeason.SeasonId, });
        //     }

        //     if (!await TeamParticipations.AnyAsync())
        //     {
        //         TeamParticipations.Add(new TeamParticipation { PlayerId = newPlayer.PlayerId, TeamId = newTeam.TeamId, StartDate = DateTime.Today, });
        //     }

        //     await this.SaveChangesAsync();
        // }
    }
}