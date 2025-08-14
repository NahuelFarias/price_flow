using Microsoft.EntityFrameworkCore;
using PriceFlow.Api.Domain.Entities;
using System.Reflection.Emit;

namespace PriceFlow.Api.Infraestructure.Database
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        // ------------- Declarar las entidades de EF -------------- //
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Precio> Precios { get; set; }
        public DbSet<Canal> Canales { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Promocion> Promociones { get; set; }
        public DbSet<Venta> Ventas { get; set; }

        // --------------------------------------------------------- //

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Producto>(entity => 
            {
                entity.HasIndex(i => i.Sku).IsUnique(true);
            });

            modelBuilder.Entity<Precio>(entity =>
            {
                entity.HasIndex(i => new { i.ProductoId, i.ClienteId, i.CanalId }).IsUnique(true);
                entity.HasOne(e => e.Canal)
                        .WithMany()
                        .HasForeignKey(e => e.CanalId);
                entity.HasOne(e => e.Cliente)
                        .WithMany()
                        .HasForeignKey(e => e.ClienteId);
                entity.HasOne(e => e.Producto)
                        .WithMany()
                        .HasForeignKey(e => e.ProductoId);
            });

            modelBuilder.Entity<Canal>(entity =>
            {
                entity.HasIndex(i => i.NombreCanal).IsUnique(true);
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasIndex(i => i.NombreCliente).IsUnique(true);
            });

            modelBuilder.Entity<Promocion>(entity =>
            {
                entity.HasOne(e => e.Producto)
                        .WithMany()
                        .HasForeignKey(e => e.ProductoId);
            });

            modelBuilder.Entity<Venta>(entity =>
            {
                entity.HasIndex(i => i.IdentificadorVenta).IsUnique(true);
                entity.HasOne(e => e.PrecioDeLista)
                        .WithMany()
                        .HasForeignKey(e => e.PrecioId);
                entity.HasMany(p => p.Promociones)
                        .WithMany();
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
