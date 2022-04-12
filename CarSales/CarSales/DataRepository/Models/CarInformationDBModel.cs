namespace CarSales.Models
{
    public class CarInformationDBModel
    {
        public int QryOption { get; set; }
        public int CarID { get; set; }
        public int ImageID { get; set; }
        public string? Make { get; set; }
        public string? Model { get; set; }
        public int YearOFManufacture { get; set; }
        public string? Color { get; set; }
        public string? CarType { get; set; }
        public string? Extras { get; set; }
        public string? PublishStatus { get; set; }
        public decimal Price { get; set; }
        public string? ImageName { get; set; }
        public int PersonInterested { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
    }
}
