using Server.Models;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<TeamParticipation> TeamParticipations { get; set; }

        // override OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     // modelBuilder.C
        // }
    }
}