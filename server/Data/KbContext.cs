using System;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System.Text.RegularExpressions;
using System.Globalization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Server.Data
{
    public class KbContext : IdentityDbContext<ApplicationUser>
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
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Participation> Participations { get; set; }

        public async Task EnsureSeeded(string seedFilesDirectory)
        {
            if (Players.Any())
                return;

            var matchPlayerRegex = new Regex(@"(?<name>.*?);(?<id>.*?);(?<gender>.*?);(?<dob>.*?);");
            foreach (var player in (await File.ReadAllLinesAsync($"{seedFilesDirectory}\\players.csv")).Skip(1))
            {
                var match = matchPlayerRegex.Match(player);
                Players.Add(new Player { Name = match.Groups["name"].Value, RegistrationId = match.Groups["id"].Value, Gender = match.Groups["gender"].Value == "M" ? Gender.Male : Gender.Female, Dob = DateTime.Parse(match.Groups["dob"].Value, CultureInfo.GetCultureInfo("nl-NL")) });
            }

            var matchTeamRegex = new Regex(@"(?<playerId>.*?);(?<teamId>.*?);.*?");
            var playerTeamSeasons = await File.ReadAllLinesAsync($"{seedFilesDirectory}\\teams_players_seasons.csv");
            var seasonDescriptions = Regex.Matches(playerTeamSeasons.First(), @"(?<seasonId>\d+-\d+)").Select(m => m.Groups["seasonId"].Value).ToList();
            foreach (var season in seasonDescriptions)
                Seasons.Add(new Season { Description = season, });

            int i = 0;
            foreach (var teamLine in playerTeamSeasons.Skip(1))
            {
                var parts = teamLine.Split(";");
                var player = Players.Local.FirstOrDefault(p => p.RegistrationId == parts[0]);

                i = 0;
                foreach (var teamName in parts.Skip(1))
                {
                    if (teamName == "Geen team")
                    {
                        i++;
                        continue;
                    }

                    Team team = Teams.Local.FirstOrDefault(t => t.Name == teamName);
                    if (team == null)
                        Teams.Add(team = new Team { Name = teamName, });

                    Participations.Add(new Participation { PlayerId = player.PlayerId, TeamId = team.TeamId, StartDate = DateTime.Today, SeasonId = Seasons.Local.First(s => s.Description == seasonDescriptions[i]).SeasonId });
                    i++;
                }
            }

            var levels = new string[] { "Slecht", "Zwak", "Gemiddeld", "Goed", "Uitmuntend", };
            foreach (Category cat in Enum.GetValues(typeof(Category)).Cast<Category>().Where(cat => cat != 0))
            {
                i = 1;
                foreach (var lvl in levels)
                {
                    Levels.Add(new Level { Category = cat, ShortDescription = lvl, Description = lvl, Score = i++, });
                }
            }

            await this.SaveChangesAsync();
        }
    }
}