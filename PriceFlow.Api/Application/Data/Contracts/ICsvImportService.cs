namespace PriceFlow.Api.Application.Data.Contracts
{
    public interface ICsvImportService
    {
        Task ImportarProductosDesdeCsv(Stream csvStream);
    }
}
