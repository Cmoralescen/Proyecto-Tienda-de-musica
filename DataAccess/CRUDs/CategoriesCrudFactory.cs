using System;
using System.Collections.Generic;
using DataAccess.DAOs;
using DTO;

namespace DataAccess.CRUDs
{
    public class CategoriesCrudFactory : CrudFactory
    {
        public CategoriesCrudFactory()
        {
            _sqlDao = SqlDAO.GetInstance();
        }

        public override void Create(BaseDTO dto)
        {
            var category = dto as Categories;

            var sqlOperation = new SqlOperation() { ProcedureName = "CRE_CAT_PR" };

            sqlOperation.AddStringParameter("P_CNAME", category.Name);
            sqlOperation.AddStringParameter("P_CDESCRIPTION", category.Description);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Update(BaseDTO dto)
        {
            var category = dto as Categories;

            var sqlOperation = new SqlOperation() { ProcedureName = "UPD_CAT_PR" };

            sqlOperation.AddIntParam("P_ID", category.Id);
            sqlOperation.AddStringParameter("P_CNAME", category.Name);
            sqlOperation.AddStringParameter("P_CDESCRIPTION", category.Description);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseDTO dto)
        {
            var category = dto as Categories;

            var sqlOperation = new SqlOperation() { ProcedureName = "DEL_CAT_PR" };
            sqlOperation.AddIntParam("P_ID", category.Id);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "GET_CAT_ALL" };
            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);

            var categories = new List<T>();
            foreach (var row in results)
            {
                var category = new Categories()
                {
                    Id = Convert.ToInt32(row["Id"]),
                    Name = row["Name"].ToString(),
                    Description = row["Description"].ToString()
                };
                categories.Add((T)(object)category);
            }

            return categories;
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "GET_CAT_BY_ID" };
            sqlOperation.AddIntParam("P_ID", id);

            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);
            if (results.Count == 0) return default;

            var row = results[0];
            var category = new Categories()
            {
                Id = Convert.ToInt32(row["Id"]),
                Name = row["Name"].ToString(),
                Description = row["Description"].ToString()
            };

            return (T)(object)category;
        }

        public override T Retrive<T>()
        {
            throw new NotImplementedException();
        }
    }
}
