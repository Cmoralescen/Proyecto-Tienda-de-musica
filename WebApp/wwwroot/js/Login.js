$(document).ready(function () {
    var controlActions = new ControlActions();

    $('#loginForm').submit(function (event) {
        event.preventDefault();

        var loginData = {
            Email: $('#email').val(),
            Password: $('#password').val()
        };

        controlActions.PostToAPI('Login/Login', loginData, function (response) {
            // Establecer estado de autenticación
            isAuthenticated = true;
            $('#authLinks').hide();
            $('#logoutLink').show();
            Swal.fire('Éxito!', 'Inicio de sesión exitoso', 'success').then(() => {
                window.location.href = '/Index'; // Redirige al inicio
            });
        });
    });
});