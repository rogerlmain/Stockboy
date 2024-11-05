global using static Stockboy.Classes.Globals;

using Microsoft.EntityFrameworkCore;
using Stockboy.Classes;


const string exchange_url = "https://financialmodelingprep.com/api/v3/";


WebApplicationBuilder builder = WebApplication.CreateBuilder (args);


builder.Services.AddControllers ().AddNewtonsoftJson ();
builder.Services.AddEndpointsApiExplorer ();
builder.Services.AddSwaggerGen ();

builder.Services.AddDbContext<DataContext> (options => options.UseMySQL (builder.Configuration.GetConnectionString ("MySqlConnection")!));

builder.Services.AddHttpClient<StockAPIClient> (client => {
	client.BaseAddress = new Uri (exchange_url);
	client.DefaultRequestHeaders.Add ("Accept", "application/json");
});

WebApplication app = builder.Build ();

app.UseDefaultFiles ();
app.UseStaticFiles ();

if (app.Environment.IsDevelopment ()) {
	app.UseSwagger ();
	app.UseSwaggerUI ();
}

app.UseHttpsRedirection ();
app.UseCors (builder => builder.AllowAnyHeader ().AllowAnyMethod ().AllowAnyOrigin ());
app.UseAuthorization ();
app.MapControllers ();

app.Run ();
