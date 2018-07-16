$(document).ready(function () {
    //call Load Index Data on document ready
    loadIndex();
});

//Load Index Data
function loadIndex() {
    $.ajax({
        method: "GET",
        url: "/Product/GetProductList",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ProductName + '</td>';
                html += '<td>' + item.Price + '</td>';
                html += '<td><button class="btn btn-warning" onclick="getProductById(' + item.Id + ')"><span class="glyphicon glyphicon-edit"></span></button>' + ' | ' +
                    '<button class="btn btn-danger" onclick="deleteProduct(' + item.Id + ')"><span class="glyphicon glyphicon-trash"></span></button></td >';
                html += '</tr>';
            });
            $('#setProductList').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Add New Product
function addProduct() {
    var data = $('#createProductForm').serialize();
    $.ajax({
        method: "POST",
        url: "/Product/AddProduct",
        data: data,
        success: function (result) {
            $('#productModal').modal('hide');
            // call Load Index Data to fetch product list from db and show it on index page
            loadIndex();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

// get product record based on ID to edit
function getProductById(ProductId) {
    $.ajax({
        method: "GET",
        url: "/Product/GetProductById/" + ProductId,
        dataType: "json",
        success: function (result) {
            $('#productModal').modal('show');
            $('#modalTitle').html('Edit Product');

            $('#productId').val(result.Id);
            $('#productName').val(result.Name);
            $('#productPrice').val(result.Price);
            
            $('#updateBtn').show();
            $('#createBtn').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

//update product record
function updateProduct() {
    var data = {
        "Id": $('#productId').val(),
        "Name": $('#productName').val(),
        "Price": $('#productPrice').val(),
    };
    
    $.ajax({
        type: "POST",
        url: "/Product/UpdateProduct",
        data: JSON.stringify(data),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //call Load Index function to fetch product list from db and show it on index page
            loadIndex();
            $('#productModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function deleteProduct(PId) {
    var ans = confirm("Are you sure you want to delete this record?");
    if (ans) {
        $.ajax({
            type: "POST",
            url: "/Product/DeleteProduct/" + PId,
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

//reset add product form
function resetModal() {
    $("form").trigger("reset");
    $("#modalTitle").html('Add Product');
    $('#updateBtn').hide();
    $('#createBtn').show();
}