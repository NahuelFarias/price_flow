using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PriceFlow.Api.Domain.Entities
{
    [Table("canales")]
    public class Canal
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string NombreCanal { get; set; }
    }
}
