$(function () {
    LoadGridData();
    $(document).delegate('#btnAddNew', 'click', function (e) {
        e.preventDefault();
        ClearForm();
        $("#modalCarInformation").modal("toggle");
    });

    $(document).delegate("#btnSave", "click", function (e) {
        e.preventDefault();
        SaveFormValue();
    });
});

function LoadGridData() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/CarInformation/GetAllData",
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
        "<center><a class='btn btn-info' href='javascript:void(0)' onclick=GetUploadImages(" + "'" + result.carID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>Upload</a>",
        "<center><a class='btn btn-danger' href='javascript:void(0)' onclick=GetEditData(" + "'" + result.carID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>Edit</a> &nbsp;&nbsp; <a class='btn btn-danger' href='javascript:void(0)' onclick=DeleteGridData(" + "'" + result.carID + "'" + ")><i class='fa fa-pencil fa-fw fa-lg'></i>Delete</a></center>"])
    }
    $('#tblCarInfo').DataTable({
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
            { 'sTitle': 'Upload' },
            { 'sTitle': 'Action', 'class': 'text-center', "width": "15%" }
        ]
    });
}

function SaveFormValue() {
    var _isError = 0;
    var CarID = $("#hdCarID").val();
    var Make = $("#txtMake").val();
    var Model = $("#txtModel").val();
    var YearOFManufacture = $("#txtYearOFManufacture").val();
    var Color = $("#txtColor").val();
    var CarType = $("input[name='rbType']:checked").val();
    var Extras = $("#txtExtras").val();
    var PublishStatus = $("input[name='rbStatus']:checked").val();
    var Price = $("#txtPrice").val();

    if (CarID == "") {
        CarID = 0;
    }

    if (Make == "") {
        $("#txtMake").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtMake").removeClass("customError");
    }

    if (Model == "") {
        $("#txtModel").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtModel").removeClass("customError");
    }

    if (YearOFManufacture == "") {
        $("#txtYearOFManufacture").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtYearOFManufacture").removeClass("customError");
    }

    if (Color == "") {
        $("#txtColor").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtColor").removeClass("customError");
    }

    if (Price == "") {
        $("#txtPrice").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtPrice").removeClass("customError");
    }
    

    if (_isError == 1) {
        return false;
    }

    var _dbModel = {
        CarID: parseInt(CarID), Make: Make, Model: Model, YearOFManufacture: parseInt(YearOFManufacture),
        Color: Color, CarType: CarType, Extras: Extras, PublishStatus: PublishStatus, Price: parseFloat(Price)
    };

    //var _dbModel = { CarID: parseInt(CarID), Make: Make, Model: Model, YearOFManufacture: parseInt(YearOFManufacture), Color: Color, CarType: CarType };
    $.ajax({
        type: "POST",
        url: "/CarInformation/SaveUpdate",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            if (data.success == true) {
                LoadGridData();
                $("#modalCarInformation").modal("toggle");
                if (CarID === 0) {
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
function GetEditData(CarID) {
    var _dbModel = { 'CarID': parseInt(CarID) };
    $.ajax({
        type: "POST",
        url: "/CarInformation/GetEditData",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            $("#rbPublishStatus").prop("checked", false);
            $("#rbCarType").prop("checked", false);
            $.each(data.list.result, function (i, item) {
                $("#hdCarID").val(item.carID);
                $("#txtMake").val(item.make);
                $("#txtModel").val(item.model);
                $("#txtYearOFManufacture").val(item.yearOFManufacture);
                $("#txtColor").val(item.color);
                $("#txtExtras").val(item.extras);
                $("#txtPrice").val(item.price);

                if (item.carType === true)
                    $("#rbCarType").prop("checked", true);

                if (item.publishStatus === true)
                    $("#rbPublishStatus").prop("checked", true);

            });
            $("#modalCarInformation").modal("toggle");
        },
        error: function (err) {
            console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
        }
    });
}
function DeleteGridData(CarID) {
    var ans = confirm("Are you sure to delete a record?");
    if (ans == true) {
        var _dbModel = { 'CarID': CarID };
        $.ajax({
            type: "POST",
            url: "/CarInformation/DeleteData",
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
function GetUploadImages(CarID) {
    GetCarImages(CarID);
    $("#UPCarID").val(CarID);
    $("#modalUploadImages").modal("toggle");
}
function uploadFiles(inputId) {
    var input = document.getElementById(inputId);
    var files = input.files;
    var formData = new FormData();

    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
    }
    formData.append('CarID', $("#UPCarID").val());

    $.ajax(
        {
            url: "/CarInformation/ImageUpload",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                if (data.success === true) {
                    //alert("Files Uploaded!");
                    GetCarImages($("#UPCarID").val());
                }
            }
        }
    );
}
function GetCarImages(CarID) {
    var _dbModel = { 'CarID': CarID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/CarInformation/GetAllCarImageData",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: "json",
        success: function (data) {
            $("#divCarImages").empty();
            var _ImageList = "";
            var _ImagePath = "/Uploads/";
            $.each(data.list.result, function (i, item) {
                _ImageList += "<div class='col-4 pb-2'><div><img style='width: 100%;' src=" + _ImagePath + item.imageName + "></div>" +
                    "               <div class='pt-2'><center><a class='btn btn-success' href='javascript:void(0)' onclick=DeleteImageData(" + "'" + item.imageID + "'" + ")>Delete</a></center></div>" +
                    "           </div>";
            });
            $("#divCarImages").append(_ImageList);
        }
    });
}
function DeleteImageData(ImageID) {
    var ans = confirm("Are you sure to delete a record?");
    if (ans == true) {
        var _dbModel = { 'ImageID': ImageID };
        $.ajax({
            type: "POST",
            url: "/CarInformation/DeleteImageData",
            data: JSON.stringify(_dbModel),
            contentType: "application/json",
            datatype: "json",
            success: function (data) {
                if (data.success == true) {
                    GetCarImages($("#UPCarID").val());
                    $.growl.notice({ title: "Delete", message: "Image Deleted Successfully.." });
                }
                else {
                    $.growl.notice({ title: "Delete", message: "Image Deleted Failed.." });
                }
            }
        });
    }
}
function ClearForm() {
    $(".txt").val("");
}