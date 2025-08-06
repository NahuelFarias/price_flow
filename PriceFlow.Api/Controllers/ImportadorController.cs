using Microsoft.AspNetCore.Mvc;
using PriceFlow.Api.Application.Data.Contracts;

namespace PriceFlow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImportadorController : ControllerBase
    {
        private readonly ICsvImportService _csvImportService;

        public ImportadorController(ICsvImportService service)
        {
            _csvImportService = service;
        }

        [HttpPost("importarCsv")]
        public async Task<ActionResult> ImportarCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Archivo no válido");
            }

            using var stream = file.OpenReadStream();
            await _csvImportService.ImportarProductosDesdeCsv(stream);

            return Ok("Se importaron los productos");
        }
    }
}
