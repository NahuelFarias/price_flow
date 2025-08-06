using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PriceFlow.Api.Domain.Entities
{
    [Table("clientes")]
    public class Cliente
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string NombreCliente { get; set; }
    }
}
