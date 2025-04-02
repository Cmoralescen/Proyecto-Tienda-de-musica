using System.Collections.Generic;
using DataAccess.CRUDs;
using DTO;

namespace CoreApp
{
    public class EmployeesManager : BaseManager
    {
        private EmployeesCrudFactory _crudFactory;

        public EmployeesManager()
        {
            _crudFactory = new EmployeesCrudFactory();
        }

        public void Create(Employees employee)
        {
            _crudFactory.Create(employee);
        }

        public List<Employees> RetrieveAll()
        {
            return _crudFactory.RetrieveAll<Employees>();
        }

        public Employees RetrieveById(int id)
        {
            return _crudFactory.RetrieveById<Employees>(id);
        }

        public void Update(Employees employee)
        {
            _crudFactory.Update(employee);
        }

        public void Delete(int id)
        {
            var employee = new Employees() { Id = id };
            _crudFactory.Delete(employee);
        }
    }
}
