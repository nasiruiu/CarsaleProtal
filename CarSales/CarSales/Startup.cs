using CarSales.DataRepository;
using CarSales.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace CarSales
{
    public class Startup
    {
        private IConfigurationRoot _config;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var ConfigBuilder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath)
                         .AddJsonFile("appsettings.json");
            _config = ConfigBuilder.Build();
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment environment;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(_config);
            services.AddDbContext<DBConnection>();
            services.AddControllersWithViews();
        }
    }
}
