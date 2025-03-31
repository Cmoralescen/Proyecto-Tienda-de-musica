using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAOs;
using DTO;

namespace DataAccess.CRUDs
{
    public class ClientsCrudFactory : CrudFactory
    {
        public ClientsCrudFactory()
        {
            _sqlDao = SqlDAO.GetInstance();
        }
        public override void Create(BaseDTO dto)
        {
            // Convertir el dto en Client
            var client = dto as Clients;

            // Crear el instructivo de ejecución
            var sqlOperation = new SqlOperation() { ProcedureName = "CRE_CLI_PR" };

            // Agregar los parámetros igual al SP
            sqlOperation.AddStringParameter("P_CNAME", client.Name);
            sqlOperation.AddStringParameter("P_CLASTNAME", client.Lastname);
            sqlOperation.AddStringParameter("P_CEMAIL", client.Email);
            sqlOperation.AddStringParameter("P_CADDRESS", client.Address);
            sqlOperation.AddIntParam("P_CPHONENUMBER", client.PhoneNumber);
            sqlOperation.AddDateTimeParam("P_CBIRTHDATE", client.BirthDate);
            sqlOperation.AddStringParameter("P_CPASSWORD", client.Password);

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
