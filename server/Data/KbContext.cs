using System;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

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
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<TeamParticipation> TeamParticipations { get; set; }

        public async Task EnsureSeeded()
        {
            if (Ratings.Any())
                return;

            Season newSeason = null;
            Player newPlayer = null;
            Team newTeam = null;

            Seasons.Add(newSeason = new Season { Description = "Season 17/18", StartDate = new DateTime(2017, 8, 1), EndDate = new DateTime(2018, 3, 31), });
            Players.Add(newPlayer = new Player { Name = "Piet", });
            Teams.Add(newTeam = new Team { Name = "A2", SeasonId = newSeason.SeasonId, });
            TeamParticipations.Add(new TeamParticipation { PlayerId = newPlayer.PlayerId, TeamId = newTeam.TeamId, StartDate = DateTime.Today, });
            var newCategories = new[] { "Aanvallen", "Verdedigen", "Tactisch", "Technisch", "Fysiek", "Mentaal", }.Select(cat => new Category { Description = cat, }).ToList();
            await Categories.AddRangeAsync(newCategories);

            var levels = new string[] { "Slecht", "Zwak", "Gemiddeld", "Goed", "Uitmuntend", };

            int i;
            foreach (var cat in newCategories)
            {
                i = 1;
                foreach (var lvl in levels)
                {
                    Levels.Add(new Level { CategoryId = cat.CategoryId, Description = lvl, Score = i++ });
                }
            }

            await this.SaveChangesAsync();
        }
    }
}