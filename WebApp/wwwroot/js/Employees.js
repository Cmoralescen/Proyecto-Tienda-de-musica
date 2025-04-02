$(document).ready(function () {
    var controlActions = new ControlActions();

    loadEmployees();

    function loadEmployees() {
        $.ajax({
            url: controlActions.GetUrlApiService('Employees/GetAll'),
            type: 'GET',
            success: function (data) {
                console.log(data);
                let rows = '';
                data.forEach(emp => {
                    rows += `<tr data-id="${emp.id}"> 
            <td class="employee-name">${emp.name}</td>
            <td class="employee-lastname">${emp.lastname}</td> 
            <td class="employee-email">${emp.email}</td>
            <td class="employee-phone">${emp.phoneNumber}</td>
            <td class="employee-cargo">${emp.cargo}</td>
            <td class="employee-salary">₡${emp.salary}</td>
            <td class="employee-schedule">${emp.schedule}</td>
            <td>
                <button class="btn btn-warning btn-sm btn-edit"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-danger btn-sm btn-delete"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
                });
                $('tbody').html(rows);
            }


        });
    }

    $('#btnRegister').click(function () {
        Swal.fire({
            title: 'Registrar Empleado',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' + 
                '<input id="swal-input3" class="swal2-input" placeholder="Email">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Teléfono">' +
                '<input id="swal-input5" class="swal2-input" placeholder="Cargo">' +
                '<input id="swal-input6" class="swal2-input" placeholder="Salario">' +
                '<input id="swal-input7" class="swal2-input" placeholder="Horario">',

            focusConfirm: false,
            preConfirm: () => {
                return {
                    Name: document.getElementById('swal-input1').value,
                    Lastname: document.getElementById('swal-input2').value,
                    Email: document.getElementById('swal-input3').value,
                    PhoneNumber: parseInt(document.getElementById('swal-input4').value) || 0,
                    Cargo: document.getElementById('swal-input5').value,
                    Salary: parseFloat(document.getElementById('swal-input6').value) || 0,
                    Schedule: document.getElementById('swal-input7').value
                };
            }

        }).then((result) => {
            if (result.value) {
                var employeeData = result.value;
                controlActions.PostToAPI('Employees/Create', employeeData, function () {
                    Swal.fire('Éxito!', 'Empleado registrado correctamente', 'success');
                    loadEmployees();
                });
            }
        });
    });

    $(document).on('click', '.btn-edit', function () {
        var row = $(this).closest('tr');
        var id = row.data('id');
        var name = row.find('.employee-name').text();
        var lastname = row.find('.employee-lastname').text();
        var email = row.find('.employee-email').text();
        var phone = row.find('.employee-phone').text();
        var cargo = row.find('.employee-cargo').text();
        var salary = row.find('.employee-salary').text().replace('₡', '');
        var schedule = row.find('.employee-schedule').text();

        
        Swal.fire({
            title: 'Actualizar Empleado',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + name + '">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value="' + lastname + '">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + email + '">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Teléfono" value="' + phone + '">' +
                '<input id="swal-input5" class="swal2-input" placeholder="Cargo" value="' + cargo + '">' +
                '<input id="swal-input6" class="swal2-input" placeholder="Salario" value="' + salary + '">' +
                '<input id="swal-input7" class="swal2-input" placeholder="Horario" value="' + schedule + '">',

            focusConfirm: false,
            preConfirm: () => {
                return {
                    Id: id,  
                    Name: document.getElementById('swal-input1').value,
                    Lastname: document.getElementById('swal-input2').value,
                    Email: document.getElementById('swal-input3').value,
                    PhoneNumber: parseInt(document.getElementById('swal-input4').value) || 0,
                    Cargo: document.getElementById('swal-input5').value,
                    Salary: parseFloat(document.getElementById('swal-input6').value) || 0,
                    Schedule: document.getElementById('swal-input7').value
                };
            }

        }).then((result) => {
            if (result.value) {
                var updatedEmployee = result.value;
                $.ajax({
                    url: controlActions.GetUrlApiService('Employees/Update'),
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedEmployee),
                    success: function () {
                        Swal.fire('Éxito!', 'Empleado actualizado correctamente', 'success');
                        loadEmployees();  
                    },
                    error: function (xhr, status, error) {
                        console.error("Error al actualizar el empleado: ", status, error);
                    }
                });
            }
        });
    });


    $(document).on('click', '.btn-delete', function () {
        var row = $(this).closest('tr');
        var id = row.data('id');

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede revertir.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: controlActions.GetUrlApiService('Employees/Delete/') + id,
                    type: 'DELETE',
                    success: function () {
                        Swal.fire('Eliminado!', 'El empleado ha sido eliminado.', 'success');
                        loadEmployees();
                    }
                });
            }
        });
    });
});