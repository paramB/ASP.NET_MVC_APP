$(document).ready(function () {
    //call Load Index Data on document ready
    loadIndex();
    
       $('input[type=datetime]').datepicker({
            dateFormat: "dd/M/yy",
            changeMonth: true,
            changeYear: true,
            yearRange: "-60:+0",
            maxDate: new Date()
        });
});

//Load Index Data
function loadIndex() {
    $.ajax({
        method: "GET",
        url: "/ProductSold/GetSalesList",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          
            var html = '';
            $.each(result, function (key, item) {
                var date = new Date(parseInt(item.DateSold.substr(6)));                
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var year = date.getFullYear();
                var newDate = day + "/" + month + "/" + year;
                
                html += '<tr>';
                html += '<td>' + item.CName + '</td>';
                html += '<td>' + item.PName + '</td>';
                html += '<td>' + item.SName + '</td>';
                html += '<td>' + newDate + '</td>';
                html += '<td><button class="btn btn-warning" onclick="getSaleById(' + item.Id + ')"><span class="glyphicon glyphicon-edit"></span></button>' + ' | ' +
                    '<button class="btn btn-danger" onclick="deleteSale(' + item.Id + ')"><span class="glyphicon glyphicon-trash"></span></button></td >';
                html += '</tr>';
            });
            $('#setSalesList').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Add New Sale
function addSale() {
    var data = $('#createSaleForm').serialize();
    $.ajax({
        method: "POST",
        url: "/ProductSold/AddSale",
        data: data,
        success: function (result) {
            $('#saleModal').modal('hide');
            //call Load Index Data to fetch sales list from db and show it on index page
            loadIndex();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

// Get sale record based on ID to edit
function getSaleById(SId) {
    $.ajax({
        method: "GET",
        url: "/ProductSold/GetSaleById/" + SId,
        dataType: "json",
        success: function (result) {
            //console.log(JSON.stringify(result));
            var date = new Date(parseInt(result.DateSold.substr(6)));
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            var newDate = day + "/" + month + "/" + year;
            
            $('#saleModal').modal('show');
            $('#modalTitle').html('Edit Sale');

            $('#Id').val(result.Id);
            $('#CustomerId').val(result.CustomerId);
            $('#ProductId').val(result.ProductId);
            $('#StoreId').val(result.StoreId);
            $('#dateSold').val(newDate);

            $('#updateBtn').show();
            $('#createBtn').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

//update sale record
function updateSale() {
    var data = {
        "Id": $('#Id').val(),
        "CustomerId": $('#CustomerId').val(),
        "ProductId": $('#ProductId').val(),
        "StoreId": $('#StoreId').val(),
        "DateSold": $('#dateSold').val()
    };

    $.ajax({
        type: "POST",
        url: "/ProductSold/UpdateSale",
        data: JSON.stringify(data),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //call Load Index function to fetch sales list from db and show it on index page
            loadIndex();
            $('#saleModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function deleteSale(SId) {
    var ans = confirm("Are you sure you want to delete this record?");
    if (ans) {
        $.ajax({
            type: "POST",
            url: "/ProductSold/DeleteSale/" + SId,
            dataType: "json",
            success: function (result) {
                //call Load Index Data to fetch customerList from db and show it on index page
                loadIndex();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//reset add sale form
function resetModal() {
    $("form").trigger("reset");
    $("#modalTitle").html('Add Sale');
    $('#updateBtn').hide();
    $('#createBtn').show();
}