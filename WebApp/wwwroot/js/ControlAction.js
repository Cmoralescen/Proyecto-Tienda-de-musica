function ControlActions() {
    // Ruta base del API con el puerto correcto
    this.URL_API = "https://localhost:7020/api/";

    this.GetUrlApiService = function (service) {
        return this.URL_API + service;
    };

    /* ACCIONES VIA AJAX */
    this.GetToApi = function (service, callBackFunction, errorCallBack) {
        $.ajax({
            type: "GET",
            url: this.GetUrlApiService(service),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (callBackFunction) {
                    callBackFunction(response);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let message = 'Ocurrió un error al obtener los datos.';
                try {
                    const responseJson = JSON.parse(jqXHR.responseText);
                    message = responseJson.Message || responseJson.message || message;
                } catch (e) {
                    message = jqXHR.responseText || message;
                }
                if (errorCallBack) {
                    errorCallBack({ Message: message });
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

    this.PostToAPI = function (service, data, callBackFunction) {
        $.ajax({
            type: "POST",
            url: this.GetUrlApiService(service),
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (callBackFunction) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: response.Message || 'Transacción completada!',
                        footer: 'UCenfotec'
                    });
                    callBackFunction(response);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error AJAX:", textStatus, errorThrown);
                console.log("Código de estado:", jqXHR.status);
                console.log("Respuesta del servidor:", jqXHR.responseText);

                let message = 'Ocurrió un error desconocido.';
                try {
                    const responseJson = JSON.parse(jqXHR.responseText);
                    message = responseJson.Message || responseJson.message || message;
                } catch (e) {
                    message = jqXHR.responseText || message;
                }

                if (jqXHR.status === 400) {
                    message = message || 'Solicitud inválida.';
                } else if (jqXHR.status === 401) {
                    message = message || 'No autorizado.';
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

    this.PutToAPI = function (service, data, callBackFunction, errorCallBack) {
        $.ajax({
            type: "PUT",
            url: this.GetUrlApiService(service),
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (callBackFunction) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: response.Message || 'Transacción completada!',
                        footer: 'UCenfotec'
                    });
                    callBackFunction(response);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let message = 'Ocurrió un error al actualizar los datos.';
                try {
                    const responseJson = JSON.parse(jqXHR.responseText);
                    message = responseJson.Message || responseJson.message || message;
                } catch (e) {
                    message = jqXHR.responseText || message;
                }
                if (errorCallBack) {
                    errorCallBack({ Message: message });
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

    this.DeleteToAPI = function (service, callBackFunction, errorCallBack) {
        $.ajax({
            type: "DELETE",
            url: this.GetUrlApiService(service),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (callBackFunction) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: response.Message || 'Transacción completada!',
                        footer: 'UCenfotec'
                    });
                    callBackFunction(response);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let message = 'Ocurrió un error al eliminar los datos.';
                try {
                    const responseJson = JSON.parse(jqXHR.responseText);
                    message = responseJson.Message || responseJson.message || message;
                } catch (e) {
                    message = jqXHR.responseText || message;
                }
                if (errorCallBack) {
                    errorCallBack({ Message: message });
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