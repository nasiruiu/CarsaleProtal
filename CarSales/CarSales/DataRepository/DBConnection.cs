﻿using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace CarSales.DataRepository
{
    public class DBConnection : DbContext
    {
        private IConfigurationRoot _config;
        public DBConnection(IConfigurationRoot config, DbContextOptions options) : base(options)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_config["ConnectionStrings:DefaultConnection"]);
        }
    }
}
