using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using PriceFlow.Api.Domain.Entities;

namespace PriceFlow.Api.Infraestructure.Database.Configurations
{
    public class ProductoConfiguration : IEntityTypeConfiguration<Producto>
    {
        public void Configure(EntityTypeBuilder<Producto> builder)
        {
            builder.ToTable("productos");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Activo).IsRequired();
            builder.Property(p => p.Sku).IsRequired().HasColumnType("varchar(50)");
            builder.Property(p => p.Marca).IsRequired().HasColumnType("varchar(100)");

            builder.HasIndex(p => p.Sku).IsUnique(true);
        }
    }
}
