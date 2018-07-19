$(document).ready(function () {
    //call Load Index function on document ready
    loadIndex();
});

//Load Index Data
function loadIndex() {
    $.ajax({
        method: "GET",
        url: "/Customer/GetCustomerList",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CustomerName + '</td>';
                html += '<td>' + item.Age + '</td>';
                html += '<td>' + item.Address + '</td>';
                html += '<td><button class="btn btn-warning" title="Edit Customer" data-toggle="tooltip" onclick="getCustomerById(' + item.Id +')"><span class="glyphicon glyphicon-edit"></span></button>' + ' | ' +
                    '<button class="btn btn-danger" title="Delete Customer" data-toggle="tooltip" onclick="deleteCustomer(' + item.Id +')"><span class="glyphicon glyphicon-trash"></span></button></td >';                
                html += '</tr>';
            });
            $('#setCustomerList').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Add New Customer
function addCustomer() {   
        var data = $('#createCustomerForm').serialize();
        $.ajax({
            method: "POST",
            url: "/Customer/AddCustomer",
            data: data,
            success: function (result) {
                $('#modalAddCustmer').modal('hide');
                // call Load Index Data to fetch customerList from db and show it on index page
                loadIndex();             
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
         });
}

// get customer record based on ID to edit
function getCustomerById(CustId) {
    $.ajax({
        method: "GET",
        url: "/Customer/GetCustomerById/" + CustId,
        success: function (result) {
            $('#modalAddCustmer').modal('show');
            $('#modalTitle').html('Edit Customer');
            $('#custId').val(result.Id);
            $('#custName').val(result.Name);
            $('#custAge').val(result.Age);
            $('#custAddress').val(result.Address);            
            $('#updateBtn').show();
            $('#createBtn').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });    
}

//update customer record
function updateCustomer() {
    //var data = $('#createCustomerForm').serialize();
    var data = {
        "Id": $('#custId').val(),
        "Name": $('#custName').val(),
        "Age": $('#custAge').val(),
        "Address": $('#custAddress').val(),
    };    
     $.ajax({
         type: "POST",
        url: "/Customer/UpdateCustomer",
        data: JSON.stringify(data),
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        success: function (result) {
            //call Load Index Data to fetch customerList from db and show it on index page
            loadIndex();  
            $('#modalAddCustmer').modal('hide');                         
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function deleteCustomer(custId) {
    var ans = confirm("Are you sure you want to delete this record?");
    if (ans) {
        $.ajax({
            type: "POST",
            url: "/Customer/DeleteCustomer/" + custId,
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

//reset add customer modal
function resetModal() {
    $("form").trigger("reset");
    $("#modalTitle").html('Add Customer');
    $('#updateBtn').hide();
    $('#createBtn').show();
}