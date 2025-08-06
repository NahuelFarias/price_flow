using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PriceFlow.Api.Domain.Entities
{
    [Table("productos")]
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [Column(TypeName = "varchar(20)")]
        public string Sku { get; set; }
        
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Marca {  get; set; }
        
        [Required]
        public bool Activo { get; set; }
    }
}
