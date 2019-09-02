$(document).ready(function () {
    //call Load Index Data on document ready
    loadIndex();
});

//Load Index Data
function loadIndex() {
    $.ajax({
        method: "GET",
        url: "/Store/GetStoreList",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.StoreName + '</td>';
                html += '<td>' + item.Address + '</td>';
                html += '<td><button class="btn btn-warning" title="Edit Store" data-toggle="tooltip" onclick="getStoreById(' + item.Id + ')"><span class="glyphicon glyphicon-edit"></span></button>' + ' | ' +
                    '<button class="btn btn-danger" title="Delete Store" data-toggle="tooltip" onclick="deleteStore(' + item.Id + ')"><span class="glyphicon glyphicon-trash"></span></button></td >';
                html += '</tr>';
            });
            $('#setStoreList').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Add New Store
function addStore() {
    var data = $('#createStoreForm').serialize();
    $.ajax({
        method: "POST",
        url: "/Store/AddStore",
        data: data,
        success: function (result) {
            $('#storeModal').modal('hide');
            // call Load Index Data to fetch product list from db and show it on index page
            loadIndex();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// get store record based on ID to edit
function getStoreById(SId) {
    $.ajax({
        method: "GET",
        url: "/Store/GetStoreById/" + SId,
        dataType: "json",
        success: function (result) {
            $('#storeModal').modal('show');
            $('#modalTitle').html('Edit Store');

            $('#storeId').val(result.Id);
            $('#storeName').val(result.Name);
            $('#storeAddress').val(result.Address);

            $('#updateBtn').show();
            $('#createBtn').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

//update store record
function updateStore() {
    var data = {
        "Id": $('#storeId').val(),
        "Name": $('#storeName').val(),
        "Address": $('#storeAddress').val(),
    };

    $.ajax({
        type: "POST",
        url: "/Store/UpdateStore",
        data: JSON.stringify(data),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //call Load Index function to fetch store list from db and show it on index page
            loadIndex();
            $('#storeModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function deleteStore(SId) {
    var ans = confirm("Are you sure you want to delete this record?");
    if (ans) {
        $.ajax({
            type: "POST",
            url: "/Store/DeleteStore/" + SId,
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

//reset add store form
function resetModal() {
    $("form").trigger("reset");
    $("#modalTitle").html('Add Store');
    $('#updateBtn').hide();
    $('#createBtn').show();
}