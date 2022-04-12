using CarSales.DataRepository.Models;
//susing CarSales.Models;
using CarSales.Services;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System;
using System.Collections.Generic;


namespace CarSales.Controllers
{

    public class CustomerController : Controller
    {
        
        private readonly IDapper _dapper;
        string SpName = "SP_SET_CUSTOMER";
        public CustomerController(IDapper dapper)
        {
            _dapper = dapper;
        }
        public IActionResult AddCustomer()
        {
            return View();
        }

        //[HttpGet]
        //public IActionResult GetAllData()
        //{
        //    var dbparams = new DynamicParameters();
        //    dbparams.Add("QryOption", 3, DbType.Int32);

        //    var result = Task.FromResult(_dapper.GetAll<CustomerDBModel>(SpName, dbparams, commandType: CommandType.StoredProcedure));
        //    return Json(new { list = result });
        //}

        [HttpPost]
        public IActionResult SaveUpdate([FromBody] CustomerDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            if (string.IsNullOrEmpty(_dbModel.CustomerID.ToString()) || _dbModel.CustomerID == 0)
                _dbModel.QryOption = 1;
            else
                _dbModel.QryOption = 2;
            dbparams.Add("QryOption", _dbModel.QryOption, DbType.Int32);
            dbparams.Add("CustomerID", _dbModel.CustomerID, DbType.Int32);
            dbparams.Add("CarID", _dbModel.CarID, DbType.Int32);
            dbparams.Add("Name", _dbModel.Name, DbType.String);
            dbparams.Add("Email", _dbModel.Email, DbType.String);
            dbparams.Add("PhoneNumber", _dbModel.PhoneNumber, DbType.String);

            var _result = Task.FromResult(_dapper.Save<int>(SpName, dbparams, commandType: CommandType.StoredProcedure));

            return Json(new { success = _result.IsCompleted });

        }

        //[HttpPost]
        //public IActionResult GetEditData([FromBody] CustomerDBModel _dbModel)
        //{
        //    var dbparams = new DynamicParameters();
        //    dbparams.Add("QryOption", 4, DbType.Int32);
        //    dbparams.Add("CustomerID", _dbModel.CustomerID, DbType.Int32);

        //    var result = Task.FromResult(_dapper.GetAll<CustomerDBModel>(SpName, dbparams, commandType: CommandType.StoredProcedure));
        //    return Json(new { list = result });
        //}

        //[HttpPost]
        //public IActionResult DeleteData([FromBody] CustomerDBModel _dbModel)
        //{
        //    var dbparams = new DynamicParameters();
        //    _dbModel.QryOption = 5;

        //    dbparams.Add("QryOption", _dbModel.QryOption, DbType.Int32);
        //    dbparams.Add("CustomerID", _dbModel.CustomerID, DbType.Int32);

        //    var _result = Task.FromResult(_dapper.Execute(SpName, dbparams, commandType: CommandType.StoredProcedure));

        //    return Json(new { success = _result.IsCompleted });

        //}

        [HttpPost]
        public IActionResult GetCarWiseInterestedCustomer([FromBody] CustomerDBModel _dbModel)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("QryOption", 6, DbType.Int32);
            dbparams.Add("CarID", _dbModel.CarID, DbType.Int32);

            var result = Task.FromResult(_dapper.GetAll<CustomerDBModel>(SpName, dbparams, commandType: CommandType.StoredProcedure));
            return Json(new { list = result });
        }
    }
}
