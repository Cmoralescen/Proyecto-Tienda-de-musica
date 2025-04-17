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

        // Capturar los valores del formulario
        var employeeData = {
            id: 0, // Incluimos id como 0 para coincidir con el JSON esperado
            Name: $('#registerName').val().trim(),
            Lastname: $('#registerLastname').val().trim(),
            Email: $('#registerEmail').val().trim(),
            Password: $('#registerPassword').val(),
            PhoneNumber: parseInt($('#registerPhoneNumber').val()) || 0,
            Cargo: $('#registerCargo').val().trim(),
            Salary: parseFloat($('#registerSalary').val()) || 0,
            Schedule: $('#registerSchedule').val().trim()
        };

        // Depuración: Mostrar los datos que se enviarán
        console.log('Datos enviados al backend:', employeeData);

        // Validar que los campos requeridos no estén vacíos
        if (!employeeData.Name || !employeeData.Lastname || !employeeData.Email || !employeeData.Password ||
            !employeeData.Cargo || !employeeData.Schedule || employeeData.Salary <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos obligatorios y asegúrese de que el salario sea mayor a 0.'
            });
            return;
        }

        controlActions.PostToAPI('Login/Register', employeeData, function (response) {
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
            console.error('Error en la solicitud:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.Message || 'Error al crear la cuenta.'
            });
        });
    });
});