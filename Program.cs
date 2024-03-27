using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Stockboy.Classes.Data;

var builder = WebApplication.CreateBuilder (args);

builder.Services.AddRazorPages ();
builder.Services.AddControllers ();
builder.Services.AddSession ();
builder.Services.AddDistributedMemoryCache ();

builder.Services.Configure<RazorViewEngineOptions> (option => option.ViewLocationFormats.Add ("/Views/{0}" + RazorViewEngine.ViewExtension));

builder.Services.AddDbContext<StockContext> (options => options.UseSqlServer (builder.Configuration.GetConnectionString ("SQLServerConnection")));

WebApplication app = builder.Build ();

if (!app.Environment.IsDevelopment ()) {
	app.UseExceptionHandler ("/Error");
	app.UseHsts ();
}

app.UseHttpsRedirection ();
app.UseStaticFiles ();
app.UseRouting ();
app.UseSession ();
app.UseAuthorization ();

app.MapRazorPages ();
app.MapControllers ();

app.Run ();
