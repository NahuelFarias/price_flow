using Microsoft.EntityFrameworkCore;
using PriceFlow.Api.Domain.Entities;

namespace PriceFlow.Api.Infraestructure.Database
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        // ------------- Declarar las entidades de EF -------------- //
        public DbSet<Producto> Productos { get; set; }

        // --------------------------------------------------------- //

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
