$(function () {
    LoadAllCarData();
    $(document).delegate("#btnSearch", "click", function (e) {
        e.preventDefault();
        SearchCarData();
    });
});
function LoadAllCarData() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/CarInformation/GetAllCarInformation",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            PopulateGridData(data.list.result);
        }
    });
}
//style='width: 100%;'
function PopulateGridData(data) {
    $("#ddlMake").empty();
    var _Make = [];
    $("#divCarImages").empty();
    var _ImageList = "";
    var _ImagePath = "/Uploads/";
    $.each(data, function (i, item) {
        _Make.push(item.make);
        _ImageList += "<div class='col-3 pt-2'>" +
            "                   <div style='border: 1px solid #eee;'><a href='/CarInformation/Details?CarID=" + item.carID + "'><img style='width: 100%; height: 230px;' src=" + _ImagePath + item.imageName + "></a></div>" +
            "                   <div class='pt-2'><center><a href='/CarInformation/Details?CarID=" + item.carID + "'>" + item.make + "</a></center></div>" +
            "                   <div class=''><center><a href='/CarInformation/Details?CarID=" + item.carID + "'>Price: " + item.price + "</a></center></div>" +
            "           </div>";
    });
    $("#divCarImages").append(_ImageList);

    _Make = _Make.filter((v, i, a) => a.indexOf(v) === i);

    $("#ddlMake").append($("<option></option>").val("-1").html("Select Make"));
    _Make.forEach(function (item, index) {
        $("#ddlMake").append($("<option></option>").val(item).html(item));
    });
}
function SearchCarData() {
    var Make = $("#ddlMake").val() == "-1" ? "" : $("#ddlMake").val();
    var Min = $("#txtMin").val() == "" ? 0 : $("#txtMin").val();
    var Max = $("#txtMax").val() == "" ? 0 : $("#txtMax").val();

    var _dbModel = { 'Make': Make, 'Min': Min, 'Max': Max };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/CarInformation/GetFilterCarInformation",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: "json",
        success: function (data) {
            PopulateGridData(data.list.result);
        }
    });
}