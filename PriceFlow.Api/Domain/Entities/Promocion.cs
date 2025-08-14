using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PriceFlow.Api.Domain.Entities
{
    [Table("promociones")]
    public class Promocion
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int ProductoId { get; set; }
        public virtual Producto Producto { get; set; }
        
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Descripcion { get; set; }

        [Required]
        public decimal PorcentajeDescuento { get; set; }
        
        [Required]
        public DateTime FechaInicioVigenciaUTC { get; set; }
        
        [Required]
        public DateTime FechaFinVigenciaUTC { get; set; }
    }
}
