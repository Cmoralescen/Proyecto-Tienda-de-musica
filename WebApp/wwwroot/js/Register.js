$(document).ready(function () {
    var controlActions = new ControlActions();

    $('#registerForm').submit(function (event) {
        event.preventDefault();

        var clientData = {
            Name: $('#name').val(),
            Lastname: $('#lastname').val(),
            Email: $('#email').val(),
            Password: $('#password').val(),
            PhoneNumber: parseInt($('#phoneNumber').val()) || 0,
            Address: $('#address').val(),
            BirthDate: $('#birthDate').val()
        };

        controlActions.PostToAPI('Login/Register', clientData, function (response) {
            Swal.fire('Éxito!', 'Cuenta creada exitosamente', 'success').then(() => {
                window.location.href = '/Login'; // Redirige al login
            });
        });
    });
});