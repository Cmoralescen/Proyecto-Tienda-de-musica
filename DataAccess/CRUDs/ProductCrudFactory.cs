using System;
using System.Collections.Generic;
using DataAccess.DAOs;
using DTO;

namespace DataAccess.CRUDs
{
    public class ProductCrudFactory : CrudFactory
    {
        public ProductCrudFactory()
        {
            _sqlDao = SqlDAO.GetInstance();
        }

        public override void Create(BaseDTO dto)
        {
            var product = dto as Product;

            var sqlOperation = new SqlOperation() { ProcedureName = "CRE_PROD_PR" };

            // Se pasan los parámetros definidos en el stored procedure
            sqlOperation.AddStringParameter("P_NAME", product.Name);
            sqlOperation.AddStringParameter("P_DESCRIPTION", product.Description);
            sqlOperation.AddIntParameter("P_CATEGORYID", product.CategoryId);
            // Usamos double en lugar de decimal
            sqlOperation.AddDoubleParam("P_PRICE", product.Price);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Update(BaseDTO dto)
        {
            var product = dto as Product;

            var sqlOperation = new SqlOperation() { ProcedureName = "UPD_PROD_PR" };

            sqlOperation.AddIntParam("P_ID", product.Id);
            sqlOperation.AddStringParameter("P_NAME", product.Name);
            sqlOperation.AddStringParameter("P_DESCRIPTION", product.Description);
            sqlOperation.AddIntParameter("P_CATEGORYID", product.CategoryId);
            sqlOperation.AddDoubleParam("P_PRICE", product.Price);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseDTO dto)
        {
            var product = dto as Product;

            var sqlOperation = new SqlOperation() { ProcedureName = "DEL_PROD_PR" };

            sqlOperation.AddIntParam("P_ID", product.Id);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "GET_PROD_ALL" };
            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);

            var products = new List<T>();
            foreach (var row in results)
            {
                var product = new Product()
                {
                    Id = Convert.ToInt32(row["Id"]),
                    Name = row["Name"].ToString(),
                    Description = row["Description"].ToString(),
                    Category = row["Category"].ToString(),
                    // Convertimos al tipo double
                    Price = Convert.ToDouble(row["Price"])
                };
                products.Add((T)(object)product);
            }

            return products;
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "GET_PROD_BY_ID" };
            sqlOperation.AddIntParam("P_ID", id);

            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);
            if (results.Count == 0) return default;

            var row = results[0];
            var product = new Product()
            {
                Id = Convert.ToInt32(row["Id"]),
                Name = row["Name"].ToString(),
                Description = row["Description"].ToString(),
                Category = row["Category"].ToString(),
                Price = Convert.ToDouble(row["Price"])
            };

            return (T)(object)product;
        }

        public override T Retrive<T>()
        {
            throw new NotImplementedException();
        }
    }
}
