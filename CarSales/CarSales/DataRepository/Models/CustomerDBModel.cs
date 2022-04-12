using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarSales.DataRepository.Models
{
    public class CustomerDBModel
    {
        private string name="";

        public int QryOption { get; set; }
        public int CustomerID { get; set; }
        public string Name { get => name; set => name = value; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
       public int CarID { get; set; }

    }
}
