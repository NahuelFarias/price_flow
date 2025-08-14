using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PriceFlow.Api.Migrations
{
    /// <inheritdoc />
    public partial class AgregarCamposParaDataset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Condicion",
                table: "promociones",
                newName: "Descripcion");

            migrationBuilder.AddColumn<decimal>(
                name: "CostoProducto",
                table: "ventas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DescuentoValor",
                table: "ventas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PrecioUnitario",
                table: "ventas",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "TemporadaEspecial",
                table: "ventas",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UnidadesVendidas",
                table: "ventas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PorcentajeDescuento",
                table: "promociones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "productos",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Nombre",
                table: "productos",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CostoProducto",
                table: "ventas");

            migrationBuilder.DropColumn(
                name: "DescuentoValor",
                table: "ventas");

            migrationBuilder.DropColumn(
                name: "PrecioUnitario",
                table: "ventas");

            migrationBuilder.DropColumn(
                name: "TemporadaEspecial",
                table: "ventas");

            migrationBuilder.DropColumn(
                name: "UnidadesVendidas",
                table: "ventas");

            migrationBuilder.DropColumn(
                name: "PorcentajeDescuento",
                table: "promociones");

            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "productos");

            migrationBuilder.DropColumn(
                name: "Nombre",
                table: "productos");

            migrationBuilder.RenameColumn(
                name: "Descripcion",
                table: "promociones",
                newName: "Condicion");
        }
    }
}
