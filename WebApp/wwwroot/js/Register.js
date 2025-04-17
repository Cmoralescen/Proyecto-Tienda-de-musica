$(document).ready(function () {
    var controlActions = new ControlActions();

    $('#registerForm').submit(function (event) {
        event.preventDefault();

        var employeeData = {
            Name: $('#name').val(),
            Lastname: $('#lastname').val(),
            Email: $('#email').val(),
            Password: $('#password').val(),
            PhoneNumber: parseInt($('#phoneNumber').val()) || 0,
            Cargo: $('#cargo').val(),
            Salary: parseFloat($('#salary').val()) || 0,
            Schedule: $('#schedule').val()
        };

        controlActions.PostToAPI('Login/Register', employeeData, function (response) {
            Swal.fire('Éxito!', 'Cuenta creada exitosamente', 'success').then(() => {
                window.location.href = '/Login'; // Redirige al login
            });
        });
    });
});