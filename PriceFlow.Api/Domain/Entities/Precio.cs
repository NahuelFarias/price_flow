using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PriceFlow.Api.Domain.Entities
{
    [Table("precios")]
    public class Precio
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public int ProductoId { get; set; }
        public virtual Producto Producto { get; set; }

        [Required]
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; }

        [Required]
        public int CanalId { get; set; }
        public virtual Canal Canal { get; set; }
    }
}
