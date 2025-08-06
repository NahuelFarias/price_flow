using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PriceFlow.Api.Domain.Entities
{
    [Table("ventas")]
    public class Venta
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string IdentificadorVenta { get; set; }

        /// <summary>
        /// Precio incluye referencias a Producto, Cliente y Canal. 
        /// Ver si queremos desnormalizar eso.
        /// </summary>
        [Required]
        public int PrecioId { get; set; }
        public virtual Precio Precio { get; set; }

        public List<Promocion> Promociones { get; set; }

        [Required]
        public DateTime FechaTransaccionUTC { get; set; }
    }
}
