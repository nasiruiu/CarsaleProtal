$(function () {
    var url = window.location.href;
    var pieces = url.split("?");
    if (pieces.length > 1) {
        var CarID = pieces[1].split("=");
        LoadSelectedCarData(CarID[1]);
    }

    $(document).delegate('#btnAddNew', 'click', function (e) {
        e.preventDefault();
        $("#modalCustomerInformation").modal("toggle");
    });

    $(document).delegate("#btnSaveCustomer", "click", function (e) {
        e.preventDefault();
        SaveCustomerInformation();
    });

});
function LoadSelectedCarData(CarID) {
    var _dbModel = { 'CarID': CarID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/CarInformation/GetSelectedCarDetails",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: "json",
        success: function (data) {
            PopulateGridData(data.list.result);
        }
    });
}
function PopulateGridData(data) {
    $("#divCarImages").empty();
    $("#divCarDetails").empty();
    var _ImageList = "";
    var _DetailList = "";
    var _ImagePath = "/Uploads/";
    $.each(data, function (i, item) {
        //_ImageList += "<div class='col-3 pt-2'>" +
        //    //"               <div class='col-12 divBorder'>" +
        //    "                   <div><a><img style='width: 100%;' src=" + _ImagePath + item.imageName + "></a></div>" +
        //    //"                   <div class='pt-2'><center><a>" + item.make + "</a></center></div>" +
        //    //"               </div>";
        //    "           </div>";
        _ImageList += "<div class='col-4 item' style='border: 1px solid #ddd;'><a href=" + _ImagePath + item.imageName + " data-lightbox='photos'><img class='img-fluid' src=" + _ImagePath + item.imageName + "></a></div>";
    });
    _DetailList += "<div class='row pt-2'><div class='col-4 clsInfo'><span>Make</span></div><div class='col-8 clsInfo'>" + data[0].make + "</div></div>" +
        "<div class='row pt-2'><div class='col-4 clsInfo'><span>Model</span></div><div class='col-8 clsInfo'>" + data[0].model + "</div></div>" +
        "<div class='row pt-2'><div class='col-4 clsInfo'><span>Year</span></div><div class='col-8 clsInfo'>" + data[0].yearOFManufacture + "</div></div>" +
        "<div class='row pt-2'><div class='col-4 clsInfo'><span>Color</span></div><div class='col-8 clsInfo'>" + data[0].color + "</div></div>" +
        "<div class='row pt-2'><div class='col-4 clsInfo'><span>Price</span></div><div class='col-8 clsInfo'>" + data[0].price + "</div></div>" +
        "<div class='row pt-2'><div class='col-12 clsInfo'><span>Details Information</span></div><div class='col-12 clsInfo'>" + data[0].extras + "</div></div>";

    $("#hdCarID").val(data[0].carID);

    $("#divCarImages").append(_ImageList);
    $("#divCarDetails").append(_DetailList);
}




function SaveCustomerInformation() {

    var _isError = 0;
    var CustomerID = $("#hdCustomerID").val();
    var Name = $("#txtName").val();
    var Email = $("#txtEmail").val();
    var PhoneNumber = $("#txtPhoneNumber").val();
    var CarID = $("#hdCarID").val();

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
        'CustomerID': parseInt(CustomerID), 'Name': Name, 'Email': Email, 'PhoneNumber': PhoneNumber, 'CarID': CarID
    };

    $.ajax({
        type: "POST",
        url: "/Customer/SaveUpdate",
        data: JSON.stringify(_dbModelCustomer),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            if (data.success == true) {
                //LoadGridData();
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

function ClearForm() {
    $(".txt").val("");
    $("#rbPublishStatus").prop("checked", false);
    $("#rbCarType").prop("checked", false);
}