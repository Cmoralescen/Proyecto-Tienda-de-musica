$(document).ready(function () {
    var controlActions = new ControlActions();

    loadCategories();

    function loadCategories() {
        $.ajax({
            url: controlActions.GetUrlApiService('Categories/GetAll'),
            type: 'GET',
            success: function (data) {
                console.log(data);
                let rows = '';
                data.forEach(cat => {
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
            }
        });
    }

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
                controlActions.PostToAPI('Categories/Create', categoryData, function () {
                    Swal.fire('Éxito!', 'Categoría registrada correctamente', 'success');
                    loadCategories();
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
                    }
                });
            }
        });
    });
});
