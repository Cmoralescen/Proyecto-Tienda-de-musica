using System;
using System.Collections.Generic;
using DataAccess.DAOs;
using DTO;

namespace DataAccess.CRUDs
{
    public class EmployeesCrudFactory : CrudFactory
    {
        public EmployeesCrudFactory()
        {
            _sqlDao = SqlDAO.GetInstance();
        }

        public override void Create(BaseDTO dto)
        {
            var employee = dto as Employees;

            var sqlOperation = new SqlOperation() { ProcedureName = "CRE_EMP_PR" };

            sqlOperation.AddStringParameter("P_ENAME", employee.Name);
            sqlOperation.AddStringParameter("P_ELASTNAME", employee.Lastname);
            sqlOperation.AddStringParameter("P_EEMAIL", employee.Email);
            sqlOperation.AddIntParam("P_EPHONENUMBER", employee.PhoneNumber);
            sqlOperation.AddStringParameter("P_ECARGO", employee.Cargo);
            sqlOperation.AddIntParam("P_ESALARY", employee.Salary);
            sqlOperation.AddStringParameter("P_ESCHEDULE", employee.Schedule);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Update(BaseDTO dto)
        {
            var employee = dto as Employees;

            var sqlOperation = new SqlOperation() { ProcedureName = "UPD_EMP_PR" };

            sqlOperation.AddIntParam("P_EID", employee.Id);
            sqlOperation.AddStringParameter("P_ENAME", employee.Name);
            sqlOperation.AddStringParameter("P_ELASTNAME", employee.Lastname);
            sqlOperation.AddStringParameter("P_EEMAIL", employee.Email);
            sqlOperation.AddIntParam("P_EPHONENUMBER", employee.PhoneNumber);
            sqlOperation.AddStringParameter("P_ECARGO", employee.Cargo);
            sqlOperation.AddIntParam("P_ESALARY", employee.Salary);
            sqlOperation.AddStringParameter("P_ESCHEDULE", employee.Schedule);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseDTO dto)
        {
            var employee = dto as Employees;

            var sqlOperation = new SqlOperation() { ProcedureName = "DEL_EMP_PR" };
            sqlOperation.AddIntParam("P_EID", employee.Id);

            _sqlDao.ExecuteProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "RET_ALL_EMP_PR" };
            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);

            var employees = new List<T>();
            foreach (var row in results)
            {
                var employee = new Employees()
                {
                    Id = Convert.ToInt32(row["EID"]),
                    Name = row["ENAME"].ToString(),
                    Lastname = row["ELASTNAME"].ToString(),
                    Email = row["EEMAIL"].ToString(),
                    PhoneNumber = Convert.ToInt32(row["EPHONENUMBER"]),
                    Cargo = row["ECARGO"].ToString(),
                    Salary = Convert.ToInt32(row["ESALARY"]),
                    Schedule = row["ESCHEDULE"].ToString()
                };
                employees.Add((T)(object)employee);
            }
            return employees;
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "RET_EMP_BY_ID_PR" };
            sqlOperation.AddIntParam("P_EID", id);

            var results = _sqlDao.ExecuteQueryProcedure(sqlOperation);
            if (results.Count == 0) return default;

            var row = results[0];
            var employee = new Employees()
            {
                Id = Convert.ToInt32(row["EID"]),
                Name = row["ENAME"].ToString(),
                Lastname = row["ELASTNAME"].ToString(),
                Email = row["EEMAIL"].ToString(),
                PhoneNumber = Convert.ToInt32(row["EPHONENUMBER"]),
                Cargo = row["ECARGO"].ToString(),
                Salary = Convert.ToInt32(row["ESALARY"]),
                Schedule = row["ESCHEDULE"].ToString()
            };

            return (T)(object)employee;
        }

        public override T Retrive<T>()
        {
            throw new NotImplementedException();
        }
    }
}
