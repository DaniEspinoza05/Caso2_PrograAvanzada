using Microsoft.EntityFrameworkCore;

namespace Caso2ProgramacionAvanzada.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configura el nombre de la tabla para Game
            modelBuilder.Entity<Game>().ToTable("Games");

            // Configuración de la relación uno-a-muchos entre Game y Player
            modelBuilder.Entity<Game>()
                .HasMany(g => g.Players)
                .WithOne(p => p.Game)
                .HasForeignKey(p => p.GameId);

            // Configura el nombre de la tabla para Player
            modelBuilder.Entity<Player>().ToTable("Players");
        }
    }
}
