
$(function () {
    LoadGridData();
    $(document).delegate('#btnAddNew', 'click', function (e) {
        e.preventDefault();
        $("#modalCustomerInformation").modal("toggle");
    });

    $(document).delegate("#btnSaveCustomer", "click", function (e) {
        e.preventDefault();
        SaveCustomerInformation();
    });
});

function LoadGridData() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/CarInformation/GetInterestedPersonAllData",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            PopulateGridData(data.list.result);
        }
    });
}
function PopulateGridData(data) {
    var arrayReturn = [];
    var results = data;

    for (var i = 0, len = results.length; i < len; i++) {
        var result = results[i];
        arrayReturn.push([result.carID, result.make, result.model, result.yearOFManufacture, result.color, result.carType, result.extras, result.publishStatus, result.price,
            "<center><a class='btn btn-info' href='javascript:void(0)' onclick=GetCarWiseInterestedPersons(" + "'" + result.carID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>" + result.personInterested+"</a>"])
        //"<center><a class='btn btn-danger' href='javascript:void(0)' onclick=GetEditData(" + "'" + result.carID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>Edit</a> &nbsp;&nbsp; <a class='btn btn-danger' href='javascript:void(0)' onclick=DeleteGridData(" + "'" + result.carID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>Delete</a></center>"])
    }
    $('#tblCustomerInfo').DataTable({
        destroy: true,
        data: arrayReturn,
        columns: [
            { 'sTitle': 'Car ID' },
            { 'sTitle': 'Make' },
            { 'sTitle': 'Model' },
            { 'sTitle': 'Make Year' },
            { 'sTitle': 'Color' },
            { 'sTitle': 'Car Type' },
            { 'sTitle': 'Extras' },
            { 'sTitle': 'Publish Status' },
            { 'sTitle': 'Price' },
            { 'sTitle': 'InterestedPerson' }
            //{ 'sTitle': 'Action', 'class': 'text-center', "width": "15%" }
        ]
    });
}
function GetCarWiseInterestedPersons(CarID) {
    GetCarImages(CarID);
    //$("#UPCarID").val(CarID);
    $("#modalCarWiseInterestedPersonInfo").modal("toggle");
}

function GetCarImages(CarID) {
    var _dbModel = { 'CarID': CarID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/Customer/GetCarWiseInterestedCustomer",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: "json",
        success: function (data) {
            PopulateCustomerGridData(data.list.result);
        }
    });
}

function PopulateCustomerGridData(data) {

    var arrayReturn = [];
    var results = data;

    for (var i = 0, len = results.length; i < len; i++) {
        var result = results[i];
        arrayReturn.push([result.customerID, result.name, result.email, result.phoneNumber])    }
    $('#tblInterestedCustomerInfo').DataTable({
        destroy: true,
        data: arrayReturn,
        columns: [
            { 'sTitle': 'ID' },
            { 'sTitle': 'Name' },
            { 'sTitle': 'Email' },
            { 'sTitle': 'PhoneNumber' }
        ]
    });
}

//function LoadGridData() {
//    $.ajax({
//        type: "GET",
//        contentType: "application/json; charset=utf-8",
//        url: "/Customer/GetAllData",
//        data: {},
//        async: false,
//        dataType: "json",
//        success: function (data) {
//            PopulateGridData(data.list.result);
//        }
//    });
//}

//function PopulateGridData(data) {
   
//    var arrayReturn = [];
//    var results = data;

//    for (var i = 0, len = results.length; i < len; i++) {
//        var result = results[i];
//        arrayReturn.push([result.customerID, result.name, result.email, result.phoneNumber,
//        "<center><a class='btn btn-danger' href='javascript:void(0)' onclick=GetEditData(" + "'" + result.customerID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>Edit</a> &nbsp;&nbsp; <a class='btn btn-danger' href='javascript:void(0)' onclick=DeleteGridData(" + "'" + result.customerID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>Delete</a></center>"])
//    }
//    $('#tblCustomerInfo').DataTable({
//        destroy: true,
//        data: arrayReturn,
//        columns: [
//            { 'sTitle': 'CustomerID' },
//            { 'sTitle': 'Name' },
//            { 'sTitle': 'Email' },
//            { 'sTitle': 'PhoneNumber' },
//            { 'sTitle': 'Action', 'class': 'text-center', "width": "15%" }
//        ]
//    });
//}





function SaveCustomerInformation() {
    var _isError = 0;
    var CustomerID = $("#hdCustomerID").val();
    var Name = $("#txtName").val();
    var Email = $("#txtEmail").val();
    var PhoneNumber = $("#txtPhoneNumber").val();

    if (CustomerID == "") {
        CustomerID = 0;
    }

    if (Name == "") {
        $("#txtName").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtName").removeClass("customError");
    }

    if (Email == "") {
        $("#txtEmail").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtEmail").removeClass("customError");
    }

    

    if (PhoneNumber == "") {
        $("#txtPhoneNumber").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtPhoneNumber").removeClass("customError");
    }


    if (_isError == 1) {
        return false;
    }
   
    var _dbModelCustomer = {
        'CustomerID': parseInt(CustomerID), 'Name': Name, 'Email': Email, 'PhoneNumber': PhoneNumber
    };

    $.ajax({
        type: "POST",
        url: "/Customer/SaveUpdate",
        data: JSON.stringify(_dbModelCustomer),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            if (data.success == true) {
                LoadGridData();
                $("#modalCustomerInformation").modal("toggle");
                if (CustomerID === 0) {
                    $.growl.notice({ title: "Save", message: "Data Save Successfully.." });
                }
                else {
                    $.growl.notice({ title: "Update", message: "Data Updated Successfully.." });
                }
                ClearForm();
            }
            else {
                $.growl.error({ title: "Save/Update", message: "Data Process Failed.." });
            }
        }
    });
}
function GetEditData(CustomerID) {
    var _dbModel = { 'CustomerID': parseInt(CustomerID) };
    $.ajax({
        type: "POST",
        url: "/Customer/GetEditData",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            $.each(data.list.result, function (i, item) {
                $("#hdCustomerID").val(item.CustomerID);
                $("#txtName").val(item.Name);
                $("#txtEmail").val(item.Email);
                $("#txtPhoneNumber").val(item.PhoneNumber);
            });
            $("#modalCarInformation").modal("toggle");
        },
        error: function (err) {
            console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
        }
    });
}
function DeleteGridData(CustomerID) {
    var ans = confirm("Are you sure to delete a record?");
    if (ans == true) {
        var _dbModel = { 'CustomerID': CustomerID };
        $.ajax({
            type: "POST",
            url: "/Customer/DeleteData",
            data: JSON.stringify(_dbModel),
            contentType: "application/json",
            datatype: "json",
            success: function (data) {
                if (data.success == true) {
                    LoadGridData();
                    $.growl.notice({ title: "Delete", message: "Data Deleted Successfully.." });
                }
                else {
                    $.growl.notice({ title: "Delete", message: "Data Deleted Failed.." });
                }
            }
        });
    }
}

function ClearForm() {
    $(".txt").val("");
    $("#rbPublishStatus").prop("checked", false);
    $("#rbCarType").prop("checked", false);
}