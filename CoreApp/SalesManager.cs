using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess.CRUDs;
using DTO;

namespace CoreApp
{
    public class SalesManager
    {
        private SalesCrudFactory _salesCrudFactory;

        public SalesManager()
        {
            _salesCrudFactory = new SalesCrudFactory();
        }

        public void CreateSale(Sale sale)
        {
            ValidateSale(sale);
            _salesCrudFactory.Create(sale);
        }

        public List<Sale> GetAllSales()
        {
            return _salesCrudFactory.RetrieveAll<Sale>();
        }

        private void ValidateSale(Sale sale)
        {
            if (sale.ClientId <= 0)
                throw new Exception("Debe seleccionar un cliente válido.");

            if (sale.EmployeeId <= 0)
                throw new Exception("Debe seleccionar un empleado válido.");

            if (sale.Products == null || !sale.Products.Any())
                throw new Exception("Debe seleccionar al menos un producto para la venta.");

            foreach (var product in sale.Products)
            {
                if (product.ProductId <= 0)
                    throw new Exception("El producto seleccionado no es válido.");

                if (product.Quantity <= 0)
                    throw new Exception("La cantidad del producto debe ser mayor a cero.");

                if (product.Price < 0)
                    throw new Exception("El precio del producto no puede ser negativo.");
            }
        }
    }
}
