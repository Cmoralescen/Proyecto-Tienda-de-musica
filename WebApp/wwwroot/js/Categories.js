$(document).ready(function () {
    var controlActions = new ControlActions();
    var allCategories = []; // Almacenar todas las categorías para filtrar

    loadCategories();

    function loadCategories(searchTerm = '') {
        $.ajax({
            url: controlActions.GetUrlApiService('Categories/GetAll'),
            type: 'GET',
            success: function (data) {
                allCategories = data; // Guardar todas las categorías
                let filteredCategories = searchTerm
                    ? data.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    : data;

                let rows = '';
                filteredCategories.forEach(cat => {
                    rows += `<tr data-id="${cat.id}">
                        <td>${cat.id}</td>
                        <td>${cat.name}</td>
                        <td>${cat.description}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btn-edit"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm btn-delete"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>`;
                });
                $('tbody').html(rows);
            },
            error: function (err) {
                console.error("Error al cargar categorías:", err);
                Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error');
            }
        });
    }

    $('#btnSearch').click(function () {
        var searchTerm = $('#searchInput').val();
        loadCategories(searchTerm);
    });

    $('#btnRegister').click(function () {
        Swal.fire({
            title: 'Registrar Categoría',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Descripción">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    Name: document.getElementById('swal-input1').value,
                    Description: document.getElementById('swal-input2').value
                };
            }
        }).then((result) => {
            if (result.value) {
                var categoryData = result.value;
                $.ajax({
                    url: controlActions.GetUrlApiService('Categories/Create'),
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(categoryData),
                    success: function () {
                        Swal.fire('Éxito!', 'Categoría registrada correctamente', 'success');
                        loadCategories();
                    },
                    error: function (err) {
                        console.error("Error al registrar categoría:", err);
                        Swal.fire('Error', 'No se pudo registrar la categoría.', 'error');
                    }
                });
            }
        });
    });


    $(document).on('click', '.btn-edit', function () {
        var row = $(this).closest('tr');
        var id = row.data('id');
        var name = row.find('td:nth-child(2)').text();
        var description = row.find('td:nth-child(3)').text();

        Swal.fire({
            title: 'Actualizar Categoría',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + name + '">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Descripción" value="' + description + '">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    Id: id,
                    Name: document.getElementById('swal-input1').value,
                    Description: document.getElementById('swal-input2').value
                };
            }
        }).then((result) => {
            if (result.value) {
                var updatedCategory = result.value;
                $.ajax({
                    url: controlActions.GetUrlApiService('Categories/Update'),
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedCategory),
                    success: function () {
                        Swal.fire('Éxito!', 'Categoría actualizada correctamente', 'success');
                        loadCategories();
                    },
                    error: function (err) {
                        console.error("Error al actualizar categoría:", err);
                        Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
                        loadCategories();
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
                    url: controlActions.GetUrlApiService('Categories/Delete/' + id),
                    type: 'DELETE',
                    success: function () {
                        Swal.fire('Eliminado!', 'La categoría ha sido eliminada', 'success');
                        loadCategories();
                    },
                    error: function (err) {
                        console.error("Error al eliminar categoría:", err);
                        Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
                    }
                });
            }
        });
    });
});