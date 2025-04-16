using DTO;
using System;
using DataAccess.DAOs;

namespace CoreApp
{
    public class LoginManager : BaseManager
    {
        private readonly SqlDAO _sqlDao;

        public LoginManager()
        {
            _sqlDao = SqlDAO.GetInstance();
        }

        public (bool IsValid, string UserType, int? UserId) ValidateLogin(LoginDTO login)
        {
            try
            {
                var sqlOperation = new SqlOperation { ProcedureName = "VALIDATE_LOGIN_PR" };
                sqlOperation.AddStringParameter("P_EMAIL", login.Email);
                sqlOperation.AddStringParameter("P_PASSWORD", login.Password);

                var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);

                if (results.Count > 0)
                {
                    var row = results[0];
                    var id = row["Id"] != DBNull.Value ? (int?)Convert.ToInt32(row["Id"]) : null;
                    var userType = row["UserType"] != DBNull.Value ? row["UserType"].ToString() : null;

                    if (id.HasValue && !string.IsNullOrEmpty(userType))
                    {
                        return (true, userType, id);
                    }
                }
                return (false, null, null);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al validar login: " + ex.Message);
            }
        }
    }
}