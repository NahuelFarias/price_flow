using Microsoft.EntityFrameworkCore;
using PriceFlow.Api.Application.Data.Contracts;
using PriceFlow.Api.Application.Data.Services;
using PriceFlow.Api.Infraestructure.Database;

var builder = WebApplication.CreateSlimBuilder(args);

//builder.Services.ConfigureHttpJsonOptions(options =>
//{
//    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
//});

// Dar de alta DB
builder.Services.AddDbContext<AppDBContext>(options =>
{
    options.UseMySQL(builder.Configuration.GetConnectionString("PriceflowApiDB"));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ----------------- SERVICES ----------------- //

builder.Services.AddScoped<ICsvImportService, CsvImportService>();

// ------------------------------------------- //

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
