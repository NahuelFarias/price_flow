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
        [Column(TypeName = "varchar(255)")]
        public string Nombre { get; set; }

        /// <summary>
        /// Probablemente un enum. No creo que valga la pena hacer una tabla para esto
        /// </summary>
        [Required]
        [Column(TypeName = "varchar(255)")]
        public string Categoria { get; set; }

        [Required]
        public bool Activo { get; set; }
    }
}
