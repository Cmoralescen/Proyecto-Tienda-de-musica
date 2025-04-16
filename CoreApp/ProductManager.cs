using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using DataAccess.CRUDs;
using DTO;

namespace CoreApp
{
    public class ProductManager
    {
        private ProductCrudFactory _productCrudFactory;

        public ProductManager()
        {
            _productCrudFactory = new ProductCrudFactory();
        }

        public void CreateProduct(Product product)
        {
            ValidateProduct(product);
            _productCrudFactory.Create(product);
        }

        public void UpdateProduct(Product product)
        {
            ValidateProduct(product);
            _productCrudFactory.Update(product);
        }

        public void DeleteProduct(Product product)
        {
            _productCrudFactory.Delete(product);
        }

        public List<Product> GetAllProducts()
        {
            return _productCrudFactory.RetrieveAll<Product>();
        }

        public Product GetProductById(int id)
        {
            return _productCrudFactory.RetrieveById<Product>(id);
        }

        private void ValidateProduct(Product product)
        {
            if (!Regex.IsMatch(product.Name, @"^[A-Za-z\s]+$"))
                throw new Exception("El nombre debe contener solo letras y espacios.");

            if (product.Price <= 0)
                throw new Exception("El precio debe ser mayor que cero.");

            if (product.CategoryId <= 0)
                throw new Exception("Debe seleccionar una categoría válida.");
        }
    }
}
