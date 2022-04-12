using CarSales.DataRepository;
using CarSales.Services;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IDapper, Dapperr>();

builder.Services.AddMvc(options =>
{
    options.MaxModelBindingCollectionSize = 100000;
});
builder.Services.Configure<FormOptions>(options => options.ValueCountLimit = 100000);
//builder.Services.Configure<FormOptions>(options =>
//{
//    options.ValueCountLimit = int.MaxValue;
//    options.ValueLengthLimit = int.MaxValue;
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
///CarInformation/Sale
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=CarInformation}/{action=Sale}/{id?}");

app.Run();
