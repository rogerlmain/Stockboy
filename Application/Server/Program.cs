global using static Stockboy.Classes.Globals;

using Microsoft.EntityFrameworkCore;
using Stockboy.Classes;


const string exchange_url = "https://financialmodelingprep.com/api/v3/";


WebApplicationBuilder builder = WebApplication.CreateBuilder (args);


builder.Services.AddDbContext<DataContext> (options => options.UseMySQL (builder.Configuration.GetConnectionString ("MySqlConnection")!));
builder.Services.AddControllers (options => options.ModelBinderProviders.Insert (0, new BinderProvider ())).AddNewtonsoftJson ();
builder.Services.AddEndpointsApiExplorer ();
builder.Services.AddSwaggerGen ();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddHttpContextAccessor ();


builder.Services.AddHttpClient<StockAPIClient> (client => {
	client.BaseAddress = new Uri (exchange_url);
	client.DefaultRequestHeaders.Add ("Accept", "application/json");
});

builder.Services.AddSession (options => {
    options.IdleTimeout = TimeSpan.FromSeconds (1800);
    options.Cookie.HttpOnly = false;
    options.Cookie.IsEssential = true;
	options.Cookie.SameSite = SameSiteMode.None;
	options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddCors (options => {
	options.AddPolicy (name: "CorsPolicy", policy => {
		policy.WithOrigins ("http://localhost:9000", "https://localhost:9000", "https://stockboy.rogerlmain.com");
		policy.WithMethods ("GET", "POST");
		policy.AllowCredentials ();
		policy.AllowAnyHeader ();
	});
});

builder.Services.ConfigureApplicationCookie (options => options.Cookie.Expiration = TimeSpan.FromDays (1));

WebApplication app = builder.Build ();

app.UseDefaultFiles ();
app.UseStaticFiles ();
app.UseHttpsRedirection ();
app.UseCors ();
app.UseSession ();
app.UseAuthorization ();

app.MapControllers ();

if (app.Environment.IsDevelopment ()) {
	app.UseSwagger ();
	app.UseSwaggerUI ();
}// if;

app.Run ();
