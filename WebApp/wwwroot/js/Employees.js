$(document).ready(function () {
    var controlActions = new ControlActions();

    loadEmployees();

    function loadEmployees() {
        controlActions.GetToApi('Employees/GetAll', function (data) {
            console.log(data);
            let rows = '';
            if (data && Array.isArray(data)) {
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
            }
            $('tbody').html(rows);
        }, function (error) {
            Swal.fire('Error', error.Message || 'No se pudieron cargar los empleados.', 'error');
        });
    }

    $('#btnRegister').click(function () {
        Swal.fire({
            title: 'Registrar Empleado',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre" required>' +
                '<input id="swal-input2" class="swal2-input" placeholder="Apellido" required>' +
                '<input id="swal-input3" class="swal2-input" placeholder="Email" type="email" required>' +
                '<input id="swal-input4" class="swal2-input" placeholder="Teléfono" type="number" required>' +
                '<input id="swal-input5" class="swal2-input" placeholder="Cargo" required>' +
                '<input id="swal-input6" class="swal2-input" placeholder="Salario" type="number" required>' +
                '<input id="swal-input7" class="swal2-input" placeholder="Horario" required>' +
                '<input id="swal-input8" class="swal2-input" placeholder="Contraseña" type="password" required>',
            focusConfirm: false,
            preConfirm: () => {
                const employeeData = {
                    Name: document.getElementById('swal-input1').value.trim(),
                    Lastname: document.getElementById('swal-input2').value.trim(),
                    Email: document.getElementById('swal-input3').value.trim(),
                    PhoneNumber: parseInt(document.getElementById('swal-input4').value) || 0,
                    Cargo: document.getElementById('swal-input5').value.trim(),
                    Salary: parseFloat(document.getElementById('swal-input6').value) || 0,
                    Schedule: document.getElementById('swal-input7').value.trim(),
                    Password: document.getElementById('swal-input8').value.trim()
                };

                // Validar campos
                if (!employeeData.Name || !employeeData.Lastname || !employeeData.Email ||
                    employeeData.PhoneNumber <= 0 || !employeeData.Cargo || employeeData.Salary <= 0 ||
                    !employeeData.Schedule || !employeeData.Password) {
                    Swal.showValidationMessage('Todos los campos son obligatorios y deben ser válidos.');
                    return false;
                }

                // Validar formato de email básico
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(employeeData.Email)) {
                    Swal.showValidationMessage('El correo electrónico no es válido.');
                    return false;
                }

                return employeeData;
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                var employeeData = result.value;
                controlActions.PostToAPI('Employees/Create', employeeData, function () {
                    Swal.fire('Éxito!', 'Empleado registrado correctamente', 'success');
                    loadEmployees();
                }, function (error) {
                    var message = error.Message || error.errors?.Password?.[0] || 'No se pudo registrar el empleado.';
                    Swal.fire('Error', message, 'error');
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
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + name + '" required>' +
                '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value="' + lastname + '" required>' +
                '<input id="swal-input3" class="swal2-input" placeholder="Email" type="email" value="' + email + '" required>' +
                '<input id="swal-input4" class="swal2-input" placeholder="Teléfono" type="number" value="' + phone + '" required>' +
                '<input id="swal-input5" class="swal2-input" placeholder="Cargo" value="' + cargo + '" required>' +
                '<input id="swal-input6" class="swal2-input" placeholder="Salario" type="number" value="' + salary + '" required>' +
                '<input id="swal-input7" class="swal2-input" placeholder="Horario" value="' + schedule + '" required>' +
                '<input id="swal-input8" class="swal2-input" placeholder="Nueva contraseña " type="password">',
            focusConfirm: false,
            preConfirm: () => {
                const updatedEmployee = {
                    Id: id,
                    Name: document.getElementById('swal-input1').value.trim(),
                    Lastname: document.getElementById('swal-input2').value.trim(),
                    Email: document.getElementById('swal-input3').value.trim(),
                    PhoneNumber: parseInt(document.getElementById('swal-input4').value) || 0,
                    Cargo: document.getElementById('swal-input5').value.trim(),
                    Salary: parseFloat(document.getElementById('swal-input6').value) || 0,
                    Schedule: document.getElementById('swal-input7').value.trim(),
                    Password: document.getElementById('swal-input8').value.trim() || null
                };

                // Validar campos (excluyendo contraseña)
                if (!updatedEmployee.Name || !updatedEmployee.Lastname || !updatedEmployee.Email ||
                    updatedEmployee.PhoneNumber <= 0 || !updatedEmployee.Cargo || updatedEmployee.Salary <= 0 ||
                    !updatedEmployee.Schedule) {
                    Swal.showValidationMessage('Todos los campos son obligatorios y deben ser válidos.');
                    return false;
                }

                // Validar formato de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(updatedEmployee.Email)) {
                    Swal.showValidationMessage('El correo electrónico no es válido.');
                    return false;
                }

                return updatedEmployee;
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                var updatedEmployee = result.value;
                controlActions.PutToAPI('Employees/Update', updatedEmployee, function () {
                    Swal.fire('Éxito!', 'Empleado actualizado correctamente', 'success');
                    loadEmployees();
                }, function (error) {
                    var message = error.Message || error.errors?.Password?.[0] || 'No se pudo actualizar el empleado.';
                    Swal.fire('Error', message, 'error');
                });
            }
        });
    });

    $('#btnSearch').click(function () {
        var searchValue = $('#searchInput').val().trim().toLowerCase();
        controlActions.GetToApi('Employees/GetAll', function (data) {
            $('tbody').empty();
            if (data && Array.isArray(data)) {
                var filteredData = data.filter(emp =>
                    (emp.name?.toLowerCase() || '').includes(searchValue) ||
                    (emp.lastname?.toLowerCase() || '').includes(searchValue) ||
                    (emp.email?.toLowerCase() || '').includes(searchValue) ||
                    (emp.cargo?.toLowerCase() || '').includes(searchValue)
                );

                if (filteredData.length > 0) {
                    let rows = '';
                    filteredData.forEach(emp => {
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
                } else {
                    Swal.fire('Información', 'No se encontraron empleados.', 'info');
                }
            } else {
                Swal.fire('Información', 'No hay empleados registrados.', 'info');
            }
        }, function (error) {
            Swal.fire('Error', error.Message || 'No se pudo realizar la búsqueda.', 'error');
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
                controlActions.DeleteToAPI('Employees/Delete?id=' + id, function () {
                    Swal.fire('Eliminado!', 'El empleado ha sido eliminado.', 'success');
                    loadEmployees();
                }, function (error) {
                    var message = error.Message || 'No se pudo eliminar el empleado.';
                    Swal.fire('Error', message, 'error');
                });
            }
        });
    });
});