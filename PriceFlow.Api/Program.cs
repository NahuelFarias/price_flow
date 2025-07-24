using Microsoft.EntityFrameworkCore;
using PriceFlow.Api.Infraestructure.Database;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

//builder.Services.ConfigureHttpJsonOptions(options =>
//{
//    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
//});

builder.Services.AddDbContext<AppDBContext>(options =>
{
    options.UseMySQL(builder.Configuration.GetConnectionString("PriceflowApiDB"));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
