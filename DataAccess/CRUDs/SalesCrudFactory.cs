using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess.DAOs;
using DTO;
using Newtonsoft.Json;

namespace DataAccess.CRUDs
{
    public class SalesCrudFactory : CrudFactory
    {
        public SalesCrudFactory()
        {
            _sqlDao = SqlDAO.GetInstance();
        }

        public override void Create(BaseDTO dto)
        {
            var sale = dto as Sale;

            var sqlOperation = new SqlOperation() { ProcedureName = "CreateSale" };

            sqlOperation.AddIntParam("ClientId", sale.ClientId);
            sqlOperation.AddIntParam("EmployeeId", sale.EmployeeId);

            // Serializar lista de productos a JSON
            var productsJson = Newtonsoft.Json.JsonConvert.SerializeObject(sale.Products);
            sqlOperation.AddJsonParam("Products", productsJson); 

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "GetAllSales" };
            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);

            var sales = new List<T>();

            foreach (var row in results)
            {
                var sale = new Sale
                {
                    Id = Convert.ToInt32(row["SaleId"]),
                    ClientName = row["Client"].ToString(),
                    EmployeeName = row["Employee"].ToString(),
                    SaleDate = Convert.ToDateTime(row["SaleDate"]),
                    Total = Convert.ToDecimal(row["Total"])
                };

                sales.Add((T)(object)sale);
            }

            return sales;
        }


        public override T RetrieveById<T>(int id)
        {
            throw new NotImplementedException("Este método no se requiere para ventas.");
        }

        public override void Update(BaseDTO dto)
        {
            throw new NotImplementedException("No se permite actualizar ventas.");
        }

        public override void Delete(BaseDTO dto)
        {
            throw new NotImplementedException("No se permite eliminar ventas.");
        }

        public override T Retrive<T>()
        {
            throw new NotImplementedException();
        }
    }
}
