global using static Stockboy.Server.Classes.Globals;

using Microsoft.EntityFrameworkCore;
using Stockboy.Server.Classes;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers ().AddNewtonsoftJson ();
builder.Services.AddEndpointsApiExplorer ();
builder.Services.AddSwaggerGen ();

builder.Services.AddDbContext<DataContext> (options => options.UseMySQL (builder.Configuration.GetConnectionString ("MySqlConnection")));

var app = builder.Build ();

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
