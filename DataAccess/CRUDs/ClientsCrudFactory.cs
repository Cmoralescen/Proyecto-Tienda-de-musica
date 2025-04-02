using System;
using System.Collections.Generic;
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
            var client = dto as Clients;
            var sqlOperation = new SqlOperation() { ProcedureName = "CRE_CLI_PR" };
            sqlOperation.AddStringParameter("P_CNAME", client.Name);
            sqlOperation.AddStringParameter("P_CLASTNAME", client.Lastname);
            sqlOperation.AddStringParameter("P_CEMAIL", client.Email);
            sqlOperation.AddStringParameter("P_CADDRESS", client.Address);
            sqlOperation.AddIntParam("P_CPHONENUMBER", client.PhoneNumber);
            sqlOperation.AddDateTimeParam("P_CBIRTHDATE", client.BirthDate);
            sqlOperation.AddStringParameter("P_CPASSWORD", client.Password);
            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Update(BaseDTO dto)
        {
            var client = dto as Clients;
            var sqlOperation = new SqlOperation() { ProcedureName = "UPD_CLI_PR" };
            sqlOperation.AddIntParam("P_CID", client.Id);
            sqlOperation.AddStringParameter("P_CNAME", client.Name);
            sqlOperation.AddStringParameter("P_CLASTNAME", client.Lastname);
            sqlOperation.AddStringParameter("P_CEMAIL", client.Email);
            sqlOperation.AddStringParameter("P_CADDRESS", client.Address);
            sqlOperation.AddIntParam("P_CPHONENUMBER", client.PhoneNumber);
            sqlOperation.AddDateTimeParam("P_CBIRTHDATE", client.BirthDate);
            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseDTO dto)
        {
            var client = dto as Clients;
            var sqlOperation = new SqlOperation() { ProcedureName = "DEL_CLI_PR" };
            sqlOperation.AddIntParam("P_CID", client.Id);
            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "RET_CLI_BY_ID_PR" };
            sqlOperation.AddIntParam("P_CID", id);
            var resultSet = _sqlDao.ExecuteQueryProcedure(sqlOperation);
            if (resultSet.Count > 0)
            {
                return (T)Convert.ChangeType(BuildClient(resultSet[0]), typeof(T));
            }
            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "RET_ALL_CLI_PR" };
            var resultSet = _sqlDao.ExecuteQueryProcedure(sqlOperation);
            var clientsList = new List<T>();
            foreach (var row in resultSet)
            {
                clientsList.Add((T)Convert.ChangeType(BuildClient(row), typeof(T)));
            }
            return clientsList;
        }

        public override T Retrive<T>()
        {
            throw new NotImplementedException();
        }

        private Clients BuildClient(Dictionary<string, object> row)
        {
            return new Clients
            {
                Id = Convert.ToInt32(row["Id"]),
                Name = row["Name"].ToString(),
                Lastname = row["Lastname"].ToString(),
                Email = row["Email"].ToString(),
                Address = row["Address"].ToString(),
                PhoneNumber = Convert.ToInt32(row["PhoneNumber"]),
                BirthDate = Convert.ToDateTime(row["BirthDate"])
            };
        }
    }
}
