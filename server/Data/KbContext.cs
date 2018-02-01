using System;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System.Text.RegularExpressions;
using System.Globalization;

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
            if (Players.Any())
                return;

            Season newSeason = null;
            Player newPlayer = null;
            Team newTeam = null;

            Seasons.Add(newSeason = new Season { Description = "Season 17/18", StartDate = new DateTime(2017, 8, 1), EndDate = new DateTime(2018, 3, 31), });

            var matchPlayerRegex = new Regex(@"(?<name>.*?);(?<id>.*?);(?<gender>.*?);(?<dob>.*?);");
            foreach(var player in (await File.ReadAllLinesAsync("C:\\source\\ckv_oranje_wit\\server\\Data\\players.csv")).Skip(1))
            {
                var match = matchPlayerRegex.Match(player);
                Players.Add(newPlayer = new Player { Name = match.Groups["name"].Value, RegistratiodId = match.Groups["id"].Value, Gender = match.Groups["gender"].Value == "M" ? Gender.Male : Gender.Female, Dob = DateTime.Parse(match.Groups["dob"].Value) });
            }

            var matchTeamRegex = new Regex(@"(?<playerId>.*?);(?<teamId>.*?);.*?");
            foreach(var teamLine in (await File.ReadAllLinesAsync("C:\\source\\ckv_oranje_wit\\server\\Data\\teams_players.csv")).Skip(1))
            {
                var match = matchTeamRegex.Match(teamLine);
                Team team = null;
                if(!Teams.Any(t => t.Name == match.Groups["teamId"].Value))
                    Teams.Add(team = new Team { Name = match.Groups["teamId"].Value, SeasonId = newSeason.SeasonId, });
                    
                var player = Players.Local.FirstOrDefault(p => p.RegistratiodId == match.Groups["playerId"].Value);
                team = team ?? Teams.Local.FirstOrDefault(t => t.Name == match.Groups["teamId"].Value);
                TeamParticipations.Add(new TeamParticipation { PlayerId = player.PlayerId, TeamId = team.TeamId, StartDate = DateTime.Today, });
            }

            var newCategories = new[] { "Aanvallen", "Verdedigen", "Tactisch", "Technisch", "Fysiek", "Mentaal", }.Select(cat => new Category { Description = cat, }).ToList();
            Categories.AddRange(newCategories);

            var levels = new string[] { "Slecht", "Zwak", "Gemiddeld", "Goed", "Uitmuntend", };

            int i;
            foreach (var cat in newCategories)
            {
                i = 1;
                foreach (var lvl in levels)
                {
                    Levels.Add(new Level { CategoryId = cat.CategoryId, ShortDescription = lvl, Description = lvl, Score = i++, });
                }
            }

            await this.SaveChangesAsync();
        }
    }
}