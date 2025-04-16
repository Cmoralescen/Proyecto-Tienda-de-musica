using System;
using System.Collections.Generic;
using DataAccess.DAOs;
using DTO;

namespace DataAccess.CRUDs
{
    public class LoginCrudFactory : CrudFactory
    {
        public LoginCrudFactory()
        {
            _sqlDao = SqlDAO.GetInstance();
        }

        public bool ValidateLogin(LoginDTO login)
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "VALIDATE_LOGIN_PR" };
            sqlOperation.AddStringParameter("P_EMAIL", login.Email);
            sqlOperation.AddStringParameter("P_PASSWORD", login.Password);

            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);
            return results.Count > 0; // Retorna true si hay un resultado (credenciales válidas)
        }

        // Métodos no implementados, ya que solo necesitamos validar login
        public override void Create(BaseDTO dto) => throw new NotImplementedException();
        public override void Update(BaseDTO dto) => throw new NotImplementedException();
        public override void Delete(BaseDTO dto) => throw new NotImplementedException();
        public override T RetrieveById<T>(int id) => throw new NotImplementedException();
        public override List<T> RetrieveAll<T>() => throw new NotImplementedException();
        public override T Retrive<T>() => throw new NotImplementedException();
    }
}