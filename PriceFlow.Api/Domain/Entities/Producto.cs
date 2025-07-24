namespace PriceFlow.Api.Domain.Entities
{
    public class Producto
    {
        public int Id { get; set; }
        public string Sku { get; set; }
        public string Marca {  get; set; }
        public bool Activo { get; set; }
    }
}
