$(document).ready(function () {
    var controlActions = new ControlActions();
    var clients = [];
    var employees = [];
    var products = [];

    function loadSales() {
        $.ajax({
            url: controlActions.GetUrlApiService('Sales/GetAll'),
            type: 'GET',
            success: function (data) {
                let rows = '';
                data.forEach(sale => {
                    rows += `<tr data-id="${sale.id}">
                                <td>${sale.id}</td>
                                <td>${sale.clientName}</td>
                                <td>${sale.employeeName}</td>
                                <td>${new Date(sale.saleDate).toLocaleDateString()}</td>
                                <td>${(sale.total || 0).toFixed(2)}</td>
                             </tr>`;
                });
                $('tbody').html(rows);
            },
            error: function (err) {
                console.error("Error al cargar ventas:", err);
            }
        });
    }

    function loadDropdowns(callback) {
        $.when(
            $.ajax({
                url: controlActions.GetUrlApiService('Clients/RetrieveAll'),
                type: 'GET',
                success: function (data) {
                    clients = data;
                }
            }),
            $.ajax({
                url: controlActions.GetUrlApiService('Employees/GetAll'),
                type: 'GET',
                success: function (data) {
                    employees = data;
                }
            }),
            $.ajax({
                url: controlActions.GetUrlApiService('Products/GetAll'),
                type: 'GET',
                success: function (data) {
                    products = data;
                }
            })
        ).then(callback);
    }

    $('#btnRegisterSale').click(function () {
        loadDropdowns(function () {
            let clientOptions = clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
            let employeeOptions = employees.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
            let productOptions = products.map(p => `<option value="${p.id}">${p.name} - $${p.price}</option>`).join('');

            Swal.fire({
                title: 'Registrar Venta',
                html:
                    `<select id="swal-client" class="swal2-input">
                        <option value="">Seleccione Cliente</option>
                        ${clientOptions}
                    </select>` +
                    `<select id="swal-employee" class="swal2-input">
                        <option value="">Seleccione Empleado</option>
                        ${employeeOptions}
                    </select>` +
                    `<input id="swal-date" class="swal2-input" type="date" value="${new Date().toISOString().split('T')[0]}">` +
                    `<select id="swal-products" class="swal2-input" multiple style="height:100px;">${productOptions}</select>` +
                    `<input id="swal-quantities" class="swal2-input" placeholder="Cantidades (separadas por comas)">`,
                focusConfirm: false,
                preConfirm: () => {
                    let clientId = parseInt(document.getElementById('swal-client').value);
                    let employeeId = parseInt(document.getElementById('swal-employee').value);
                    let saleDate = document.getElementById('swal-date').value;
                    let selectedOptions = document.getElementById('swal-products').selectedOptions;
                    let selectedProducts = Array.from(selectedOptions).map(opt => parseInt(opt.value));
                    let quantitiesStr = document.getElementById('swal-quantities').value;
                    let quantities = quantitiesStr.split(',').map(q => parseInt(q.trim()));

                    if (selectedProducts.length !== quantities.length) {
                        Swal.showValidationMessage('La cantidad de productos seleccionados y la cantidad de valores ingresados deben coincidir.');
                        return;
                    }

                    let client = clients.find(c => c.id === clientId);
                    let employee = employees.find(e => e.id === employeeId);

                    let saleProducts = selectedProducts.map((pId, index) => {
                        let product = products.find(p => p.id === pId);
                        return {
                            ProductId: pId,
                            ProductName: product ? product.name : '',
                            Quantity: quantities[index],
                            Price: product ? product.price : 0
                        };
                    });

                    return {
                        ClientId: clientId,
                        ClientName: client ? client.name : '',
                        EmployeeId: employeeId,
                        EmployeeName: employee ? employee.name : '',
                        SaleDate: saleDate,
                        Products: saleProducts
                    };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    var saleData = result.value;

                    if (!saleData.ClientId || !saleData.EmployeeId || !saleData.SaleDate || saleData.Products.length === 0) {
                        Swal.fire('Error', 'Todos los campos son obligatorios y deben tener valores válidos.', 'error');
                        return;
                    }

                    controlActions.PostToAPI('Sales/Create', saleData, function (response) {
                        if (response.success) {
                            Swal.fire('Éxito!', 'Venta registrada correctamente', 'success');
                            loadSales();
                        } else {
                            Swal.fire('Error', 'Error al registrar la venta.', 'error');
                        }
                    });
                }
            });
        });
    });

    loadSales();
});
