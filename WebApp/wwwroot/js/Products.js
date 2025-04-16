$(document).ready(function () {
    var controlActions = new ControlActions();
    var categoriesList = [];

    loadProducts();
    loadCategoriesForDropdown();

    function loadCategoriesForDropdown() {
        $.ajax({
            url: controlActions.GetUrlApiService('Categories/GetAll'),
            type: 'GET',
            success: function (data) {
                categoriesList = data;
            },
            error: function (err) {
                console.error("Error al cargar categorías:", err);
            }
        });
    }

    function loadProducts() {
        $.ajax({
            url: controlActions.GetUrlApiService('Products/GetAll'),
            type: 'GET',
            success: function (data) {
                let rows = '';
                data.forEach(prod => {
                    rows += `<tr data-id="${prod.id}">
                        <td>${prod.id}</td>
                        <td>${prod.name}</td>
                        <td>${prod.price}</td>
                        <td>${prod.category?.name || ''}</td>
                        <td>${prod.description}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btn-edit"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm btn-delete"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>`;
                });
                $('tbody').html(rows);
            },
            error: function (err) {
                console.error("Error al cargar productos:", err);
            }
        });
    }

    $('#btnRegister').click(function () {
        let categoryOptions = '';
        categoriesList.forEach(cat => {
            categoryOptions += `<option value="${cat.id}">${cat.name}</option>`;
        });

        Swal.fire({
            title: 'Registrar Producto',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Precio" type="number">' +
                '<input id="swal-input3" class="swal2-input" placeholder="Descripción">' +
                '<select id="swal-input4" class="swal2-input">' + categoryOptions + '</select>',
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value;
                const price = parseFloat(document.getElementById('swal-input2').value);
                const description = document.getElementById('swal-input3').value;
                const categoryId = parseInt(document.getElementById('swal-input4').value);

                const category = categoriesList.find(cat => cat.id === categoryId)?.name || '';

                console.log("Datos enviados para crear producto:", {
                    id: 0,
                    name: name,
                    description: description,
                    price: price,
                    categoryId: categoryId,
                    category: category
                });

                return {
                    id: 0,
                    name: name,
                    description: description,
                    price: price,
                    categoryId: categoryId,
                    category: category
                };
            }

        }).then((result) => {
            if (result.isConfirmed) {
                var productData = result.value;

                controlActions.PostToAPI('Products/Create', productData, function (response) {
                    // Verificamos la respuesta
                    console.log("Respuesta del servidor para el registro de producto:", response);
                    if (response.success) {
                        Swal.fire('Éxito!', 'Producto registrado correctamente', 'success');
                        loadProducts();
                    } else {
                        Swal.fire('Error', 'Hubo un problema al registrar el producto.', 'error');
                    }
                });
            }
        });
    });

    $(document).on('click', '.btn-edit', function () {
        var row = $(this).closest('tr');
        var id = row.data('id');
        var name = row.find('td:nth-child(2)').text();
        var price = row.find('td:nth-child(3)').text();
        var categoryName = row.find('td:nth-child(4)').text();
        var description = row.find('td:nth-child(5)').text();

        var categoryFound = categoriesList.find(cat => cat.name === categoryName);
        var categoryId = categoryFound ? categoryFound.id : 0;

        let categoryOptions = '';
        categoriesList.forEach(cat => {
            categoryOptions += `<option value="${cat.id}" ${cat.id === categoryId ? 'selected' : ''}>${cat.name}</option>`;
        });

        Swal.fire({
            title: 'Actualizar Producto',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="${name}">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Precio" type="number" value="${price}">` +
                `<input id="swal-input3" class="swal2-input" placeholder="Descripción" value="${description}">` +
                `<select id="swal-input4" class="swal2-input">${categoryOptions}</select>`,
            focusConfirm: false,
            preConfirm: () => {
                const updatedName = document.getElementById('swal-input1').value;
                const updatedPrice = parseFloat(document.getElementById('swal-input2').value);
                const updatedDescription = document.getElementById('swal-input3').value;
                const updatedCategoryId = parseInt(document.getElementById('swal-input4').value);

                const updatedCategory = categoriesList.find(cat => cat.id === updatedCategoryId)?.name || '';

                return {
                    id: id,
                    name: updatedName,
                    price: updatedPrice,
                    description: updatedDescription,
                    categoryId: updatedCategoryId,
                    category: updatedCategory
                };
            }

        }).then((result) => {
            if (result.isConfirmed) {
                var updatedProduct = result.value;
                $.ajax({
                    url: controlActions.GetUrlApiService('Products/Update'),
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedProduct),
                    success: function () {
                        Swal.fire('Éxito!', 'Producto actualizado correctamente', 'success');
                        loadProducts();
                    },
                    error: function (err) {
                        console.error("Error al actualizar producto:", err);
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
                    url: controlActions.GetUrlApiService('Products/Delete/' + id),
                    type: 'DELETE',
                    success: function () {
                        Swal.fire('Eliminado!', 'El producto ha sido eliminado', 'success');
                        loadProducts();
                    },
                    error: function (err) {
                        console.error("Error al eliminar producto:", err);
                    }
                });
            }
        });
    });
});
