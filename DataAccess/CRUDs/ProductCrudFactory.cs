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
            // Convertir el dto en Product
            var product = dto as Product;

            // Crear el instructivo de ejecución
            var sqlOperation = new SqlOperation() { ProcedureName = "CRE_PROD_PR" };

            // Agregar los parámetros igual al SP
            sqlOperation.AddStringParameter("P_PNAME", product.Name);
            sqlOperation.AddStringParameter("P_PDESCRIPTION", product.Description);
            sqlOperation.AddStringParameter("P_PCATEGORY", product.Category);
            sqlOperation.AddStringParameter("P_PPRICE", product.Price);

            // Ir al DAO y ejecutar
            _sqlDao.ExecuteProcedure(sqlOperation);
        }


        public override void Update(BaseDTO dto)
        {
            // Implementación del método Update
            throw new NotImplementedException();
        }

        public override void Delete(BaseDTO dto)
        {
            // Implementación del método Delete
            throw new NotImplementedException();
        }

        public override T Retrive<T>()
        {
            // Implementación del método Retrieve
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(int id)
        {
            // Implementación del método RetrieveById
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            // Implementación del método RetrieveAll
            throw new NotImplementedException();
        }
    }
}
