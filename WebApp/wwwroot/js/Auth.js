$(document).ready(function () {
    var controlActions = new ControlActions();

    // Manejar formulario de inicio de sesión
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        var loginData = {
            Email: $('#loginEmail').val(),
            Password: $('#loginPassword').val()
        };

        controlActions.PostToAPI('Login/Login', loginData, function (response) {
            // Establecer estado de autenticación y tipo de usuario en localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userType', response.UserType);
            localStorage.setItem('userId', response.UserId);
            $('#logoutLink').show();
            // Forzar redirección a /Index
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Inicio de sesión exitoso.',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '/Index';
            });
        }, function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.Message || 'Correo o contraseña incorrectos.'
            });
        });
    });

    // Manejar formulario de registro
    $('#registerForm').submit(function (event) {
        event.preventDefault();

        var clientData = {
            Name: $('#registerName').val(),
            Lastname: $('#registerLastname').val(),
            Email: $('#registerEmail').val(),
            Password: $('#registerPassword').val(),
            PhoneNumber: parseInt($('#registerPhoneNumber').val()) || 0,
            Address: $('#registerAddress').val(),
            BirthDate: $('#registerBirthDate').val()
        };

        controlActions.PostToAPI('Login/Register', clientData, function (response) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Cuenta creada exitosamente.',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Cambiar a la pestaña de login
                $('#login-tab').tab('show');
                // Limpiar formulario de registro
                $('#registerForm')[0].reset();
            });
        }, function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.Message || 'Error al crear la cuenta.'
            });
        });
    });
});