using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAOs;
using DTO;

namespace DataAccess.CRUDs
{
    public  class EmployeesCrudFactory : CrudFactory
    {
        public EmployeesCrudFactory()
        {
            _sqlDao = SqlDAO.GetInstance();
        }
        public override void Create(BaseDTO dto)
        {
            // Convertir el dto en Employee
            var employee = dto as Employees;

            // Crear el instructivo de ejecución
            var sqlOperation = new SqlOperation() { ProcedureName = "CRE_EMP_PR" };

            // Agregar los parámetros igual al SP
            sqlOperation.AddStringParameter("P_ENAME", employee.Name);
            sqlOperation.AddStringParameter("P_ELASTNAME", employee.Lastname);
            sqlOperation.AddStringParameter("P_EEMAIL", employee.Email);
            sqlOperation.AddIntParam("P_EPHONENUMBER", employee.PhoneNumber);
            sqlOperation.AddStringParameter("P_ECARGO", employee.Cargo);
            sqlOperation.AddIntParam("P_ESALARY", employee.Salary);
            sqlOperation.AddStringParameter("P_ESCHEDULE", employee.Schedule);

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
