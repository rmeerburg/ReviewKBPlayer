using System;
using Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System.Globalization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Server.Data
{
    public class TalentTrackContext : IdentityDbContext<ApplicationUser>
    {
        public TalentTrackContext(DbContextOptions<TalentTrackContext> options)
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
        public DbSet<ReviewCategory> ReviewCategories { get; set; }

        public async Task EnsureSeeded(string seedFilesDirectory)
        {
            var dataSeeder = new CsvDataImporter(this, seedFilesDirectory);

            if (!this.Players.Any())
                await dataSeeder.SeedPlayers();

            if (!this.Levels.Any())
                await dataSeeder.SeedCategoriesAndLevels();

            if (!this.Participations.Any())
                await dataSeeder.SeedParticipations();

            await this.SaveChangesAsync();
        }
    }
}