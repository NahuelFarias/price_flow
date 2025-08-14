using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PriceFlow.Api.Domain.Entities
{
    /// <summary>
    /// Tabla para guardar histórico de ventas
    /// 
    /// TODO: CONSIDERAR IMPUESTOS??? <-- Puede estar metido en precio
    /// </summary>
    [Table("ventas")]
    public class Venta
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string IdentificadorVenta { get; set; }

        /// <summary>
        /// Es el precio de lista (Sin promociones, sin descuentos)
        /// Precio incluye referencias a Producto, Cliente y Canal. 
        /// Ver si queremos desnormalizar eso.
        /// </summary>
        [Required]
        public int PrecioId { get; set; }
        public virtual Precio PrecioDeLista { get; set; }

        public List<Promocion> Promociones { get; set; }

        [Required]
        public DateTime FechaTransaccionUTC { get; set; }

        [Required]
        public int UnidadesVendidas { get; set; }

        /// <summary>
        /// Precio que efectivamente paga el cliente, 
        /// si tiene promoción o descuento, está contemplado en este campo
        /// </summary>
        [Required]
        public decimal PrecioUnitario {  get; set; }

        /// <summary>
        /// Efectivamente cuánta plata se descontó, el MONTO. El porcentaje
        /// viene dado por las promociones que se hayan aplicado. 
        /// Puede ser 0 si no hubo descuento.
        /// </summary>
        [Required]
        public decimal DescuentoValor { get; set; }

        /// <summary>
        /// El costo de la unidad de producto que se está vendiendo para tener el margen de ganancia.
        /// </summary>
        [Required]
        public decimal CostoProducto { get; set; }

        /// <summary>
        /// Puede tener o no, un indicador de temporada especial (ej, BlackFriday, Navidad, Pascuas, etc).
        /// Probablemente terminemos haciendo un enum.
        /// Si no tiene, es null.
        /// </summary>
        [Column(TypeName = "varchar(255)")]
        public string? TemporadaEspecial {  get; set; }
    }
}
