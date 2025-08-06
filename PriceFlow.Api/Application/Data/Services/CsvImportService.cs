using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Mvc;
using PriceFlow.Api.Application.Data.Contracts;
using PriceFlow.Api.Domain.Entities;
using PriceFlow.Api.Infraestructure.Database;
using System.Globalization;

namespace PriceFlow.Api.Application.Data.Services
{
    public class CsvImportService : ICsvImportService
    {
        private readonly AppDBContext _context;

        public CsvImportService(AppDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task ImportarProductosDesdeCsv(Stream csvStream)
        {
            using var reader = new StreamReader(csvStream);
            using var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HeaderValidated = null,
                MissingFieldFound = null
            });

            var productos = csv.GetRecords<Producto>().ToList();

            _context.Productos.AddRange(productos);
            await _context.SaveChangesAsync();
        }
    }
}
