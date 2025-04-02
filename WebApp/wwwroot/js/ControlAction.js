function ControlActions() {
    // Ruta base del API con el puerto correcto
    this.URL_API = "https://localhost:7020/api/";

    this.GetUrlApiService = function (service) {
        return this.URL_API + service;
    };

    /* ACCIONES VIA AJAX*/
    this.PostToAPI = function (service, data, callBackFunction) {


        $.ajax({
            type: "POST",
            url: this.GetUrlApiService(service),
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (callBackFunction) {
                    Swal.fire(
                        'Good job!',
                        'Transaction completed!',
                        'success'
                    )
                    callBackFunction(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error AJAX:", textStatus, errorThrown);
                console.log("Código de estado:", jqXHR.status);
                console.log("Respuesta del servidor:", jqXHR.responseText);
                var responseJson = jqXHR.responseJSON;
                var message = jqXHR.responseText;

                if (responseJson) {
                    var errors = responseJson.errors;
                    var errorMessages = Object.values(errors).flat();
                    message = errorMessages.join("<br/> ");
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: message,
                    footer: 'UCenfotec'
                });
            }
        });
    };


}

// Custom jQuery actions
$.put = function (url, data, callback) {
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
};

$.ajaxDelete = function (url, data, callback) {
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
};

