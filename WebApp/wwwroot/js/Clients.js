$(document).ready(function () {
    var controlActions = new ControlActions();
    var allClients = []; // Almacenar todos los clientes para filtrar

    loadClients();

    function loadClients(searchTerm = '') {
        $.ajax({
            url: controlActions.GetUrlApiService('Clients/RetrieveAll'),
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                allClients = data;
                var filteredClients = searchTerm
                    ? data.filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        client.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        client.email.toLowerCase().includes(searchTerm.toLowerCase()))
                    : data;
                var tbody = '';
                $.each(filteredClients, function (i, client) {
                    tbody += '<tr data-id="' + client.id + '">';
                    tbody += '<td class="client-name">' + client.name + '</td>';
                    tbody += '<td class="client-lastname">' + client.lastname + '</td>';
                    tbody += '<td class="client-email">' + client.email + '</td>';
                    tbody += '<td class="client-phone">' + client.phoneNumber + '</td>';
                    tbody += '<td class="client-address">' + client.address + '</td>';
                    tbody += '<td>' +
                        '<button class="btn btn-warning btn-sm btn-update"><i class="bi bi-pencil"></i></button> ' +
                        '<button class="btn btn-danger btn-sm btn-delete"><i class="bi bi-trash"></i></button>' +
                        '</td>';
                    tbody += '</tr>';
                });
                $("#clientsTable tbody").html(tbody);
            },
            error: function (err) {
                console.error("Error al cargar clientes:", err);
                Swal.fire('Error', 'No se pudieron cargar los clientes.', 'error');
            }
        });
    }

    $('#btnSearch').click(function () {
        var searchTerm = $('#searchInput').val();
        loadClients(searchTerm);
    });

    $("#btnRegister").click(function () {
        Swal.fire({
            title: 'Registrar Cliente',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Apellido">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Email">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Dirección">' +
                '<input id="swal-input5" class="swal2-input" placeholder="Teléfono">' +
                '<input id="swal-input6" type="date" class="swal2-input" placeholder="Fecha de nacimiento">' +
                '<input id="swal-input7" class="swal2-input" placeholder="Contraseña">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    Name: document.getElementById('swal-input1').value,
                    Lastname: document.getElementById('swal-input2').value,
                    Email: document.getElementById('swal-input3').value,
                    Address: document.getElementById('swal-input4').value,
                    PhoneNumber: parseInt(document.getElementById('swal-input5').value) || 0,
                    BirthDate: document.getElementById('swal-input6').value,
                    Password: document.getElementById('swal-input7').value
                };
            }
        }).then((result) => {
            if (result.value) {
                var clientData = result.value;
                controlActions.PostToAPI('Clients/Create', clientData, function () {
                    Swal.fire('Good job!', 'Cliente creado exitosamente', 'success');
                    loadClients();
                });
            }
        });
    });

    $("#clientsTable").on("click", ".btn-update", function () {
        var row = $(this).closest("tr");
        var clientId = row.data("id");
        var name = row.find(".client-name").text();
        var lastname = row.find(".client-lastname").text();
        var email = row.find(".client-email").text();
        var address = row.find(".client-address").text();
        var phone = row.find(".client-phone").text();

        Swal.fire({
            title: 'Actualizar Cliente',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + name + '">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value="' + lastname + '">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + email + '">' +
                '<input id="swal-input4" class="swal2-input" placeholder="Dirección" value="' + address + '">' +
                '<input id="swal-input5" class="swal2-input" placeholder="Teléfono" value="' + phone + '">' +
                '<input id="swal-input6" type="date" class="swal2-input" placeholder="Fecha de nacimiento">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    Id: clientId,
                    Name: document.getElementById('swal-input1').value,
                    Lastname: document.getElementById('swal-input2').value,
                    Email: document.getElementById('swal-input3').value,
                    Address: document.getElementById('swal-input4').value,
                    PhoneNumber: parseInt(document.getElementById('swal-input5').value) || 0,
                    BirthDate: document.getElementById('swal-input6').value
                };
            }
        }).then((result) => {
            if (result.value) {
                var updatedClient = result.value;
                $.put(controlActions.GetUrlApiService('Clients/Update'), updatedClient, function () {
                    Swal.fire('Good job!', 'Cliente actualizado exitosamente', 'success');
                    loadClients();
                });
            }
        });
    });

    $("#clientsTable").on("click", ".btn-delete", function () {
        var row = $(this).closest("tr");
        var clientId = row.data("id");

        if (!clientId) {
            Swal.fire("Error", "No se pudo obtener el ID del cliente.", "error");
            return;
        }

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: controlActions.GetUrlApiService('Clients/Delete/') + clientId,
                    type: "DELETE",
                    contentType: "application/json",
                    success: function () {
                        Swal.fire("Eliminado!", "El cliente ha sido eliminado.", "success");
                        loadClients();
                    },
                    error: function (xhr, status, error) {
                        console.error("Error al eliminar:", xhr.responseText);
                        Swal.fire("Error", "No se pudo eliminar el cliente.", "error");
                    }
                });
            }
        });
    });
});