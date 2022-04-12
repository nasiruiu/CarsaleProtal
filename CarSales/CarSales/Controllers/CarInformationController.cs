using CarSales.Models;
using CarSales.Services;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using System.Drawing;

namespace CarSales.Controllers
{
    public class CarInformationController : Controller
    {
        private readonly IDapper _dapper;
        protected readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _hostingEnvironment;

        string SpName = "SP_SET_CAR_INFORMATION";
        string GetSpName = "SP_GET_CAR_INFORMATION";
        public CarInformationController(IDapper dapper, Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment)
        {
            _dapper = dapper;
            _hostingEnvironment = hostingEnvironment;
        }
        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Sale()
        {
            return View();
        }

        public IActionResult Details()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("QryOption", 3, DbType.Int32);

            var result = Task.FromResult(_dapper.GetAll<CarInformationDBModel>(SpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result });
        }
        [HttpGet]
        public IActionResult GetInterestedPersonAllData()
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("QryOption", 9, DbType.Int32);

            var result = Task.FromResult(_dapper.GetAll<CarInformationDBModel>(SpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result });
        }

        [HttpPost]
        public IActionResult SaveUpdate([FromBody] CarInformationDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            if (string.IsNullOrEmpty(_dbModel.CarID.ToString()) || _dbModel.CarID == 0)
                _dbModel.QryOption = 1;
            else
                _dbModel.QryOption = 2;

            dbparams.Add("QryOption", _dbModel.QryOption, DbType.Int32);
            dbparams.Add("CarID", _dbModel.CarID, DbType.Int32);
            dbparams.Add("Make", _dbModel.Make, DbType.String);
            dbparams.Add("Model", _dbModel.Model, DbType.String);
            dbparams.Add("YearOFManufacture", _dbModel.YearOFManufacture, DbType.Int32);
            dbparams.Add("Color", _dbModel.Color, DbType.String);
            dbparams.Add("CarType", _dbModel.CarType, DbType.String);
            dbparams.Add("Extras", _dbModel.Extras, DbType.String);
            dbparams.Add("PublishStatus", _dbModel.PublishStatus, DbType.String);
            dbparams.Add("Price", _dbModel.Price, DbType.Decimal);

            var _result = Task.FromResult(_dapper.Save<int>(SpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { success = _result.IsCompleted });

        }

        [HttpPost]
        public IActionResult GetEditData([FromBody] CarInformationDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("QryOption", 4, DbType.Int32);
            dbparams.Add("CarID", _dbModel.CarID, DbType.Int32);

            var result = Task.FromResult(_dapper.GetAll<CarInformationDBModel>(SpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result });
        }

        [HttpPost]
        public IActionResult DeleteData([FromBody] CarInformationDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            _dbModel.QryOption = 5;

            dbparams.Add("QryOption", _dbModel.QryOption, DbType.Int32);
            dbparams.Add("CarID", _dbModel.CarID, DbType.Int32);

            var _result = Task.FromResult(_dapper.Execute(SpName, dbparams, commandType: CommandType.StoredProcedure));

            return Json(new { success = _result.IsCompleted });

        }

        [HttpPost]
        public async Task<IActionResult> ImageUpload([FromForm] IFormCollection data, [FromForm] IList<IFormFile> files)
        {
            try
            {
                var CarID = data["CarID"].ToString();

                foreach (IFormFile source in files)
                {
                    string filename = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');

                    filename = CarID + "_" + this.EnsureCorrectFilename(filename);

                    string extension = Path.GetExtension(filename);
                    filename = String.Concat(CarID, '_', Convert.ToString(Guid.NewGuid()), extension);
                    using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
                        await source.CopyToAsync(output);

                    CarInformationDBModel _dbModel = new CarInformationDBModel();
                    var dbparams = new DynamicParameters();
                    dbparams.Add("QryOption", 6, DbType.Int32);
                    dbparams.Add("CarID", Convert.ToInt32(CarID), DbType.Int32);
                    dbparams.Add("ImageName", filename, DbType.String);

                    var _result = Task.FromResult(_dapper.Save<int>(SpName, dbparams, commandType: CommandType.StoredProcedure));

                }
                return Json(new { Success = true });
            }
            catch (Exception ex)
            {
                return Json(new { Success = false });
            }
        }
        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }
        private string GetPathAndFilename(string filename)
        {
            return this._hostingEnvironment.WebRootPath + "\\Uploads\\" + filename;
        }

        [HttpPost]
        public IActionResult GetAllCarImageData([FromBody] CarInformationDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("QryOption", 7, DbType.Int32);
            dbparams.Add("CarID", Convert.ToInt32(_dbModel.CarID), DbType.Int32);

            if (string.IsNullOrWhiteSpace(_hostingEnvironment.WebRootPath))
            {
                _hostingEnvironment.WebRootPath = System.IO.Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            }

            var result = Task.FromResult(_dapper.GetAll<CarInformationDBModel>(SpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result, ImagePath = _hostingEnvironment.WebRootPath });
        }
        [HttpPost]
        public IActionResult DeleteImageData([FromBody] CarInformationDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            _dbModel.QryOption = 8;

            dbparams.Add("QryOption", _dbModel.QryOption, DbType.Int32);
            dbparams.Add("ImageID", _dbModel.ImageID, DbType.Int32);

            var _result = Task.FromResult(_dapper.Execute(SpName, dbparams, commandType: CommandType.StoredProcedure));

            return Json(new { success = _result.IsCompleted });

        }
        [HttpGet]
        public IActionResult GetAllCarInformation()
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("QryOption", 1, DbType.Int32);

            var result = Task.FromResult(_dapper.GetAll<CarInformationDBModel>(GetSpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result });
        }

        [HttpPost]
        public IActionResult GetSelectedCarDetails([FromBody] CarInformationDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("CarID", _dbModel.CarID, DbType.Int32);
            dbparams.Add("QryOption", 2, DbType.Int32);

            var result = Task.FromResult(_dapper.GetAll<CarInformationDBModel>(GetSpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result });
        }
        [HttpPost]
        public IActionResult GetFilterCarInformation([FromBody] CarInformationDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("QryOption", 3, DbType.Int32);
            dbparams.Add("Make", _dbModel.Make, DbType.String);
            dbparams.Add("Min", _dbModel.Min, DbType.Int32);
            dbparams.Add("Max", _dbModel.Max, DbType.Int32);

            var result = Task.FromResult(_dapper.GetAll<CarInformationDBModel>(GetSpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result });
        }
    }
}
