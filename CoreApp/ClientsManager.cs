using System;
using System.Collections.Generic;
using DataAccess.CRUDs;
using DTO;

namespace CoreApp
{
    public class ClientsManager : BaseManager
    {
        private ClientsCrudFactory _crudFactory;

        public ClientsManager()
        {
            _crudFactory = new ClientsCrudFactory();
        }

        public void Create(Clients client)
        {
            if (IsOver18(client))
            {
                _crudFactory.Create(client);
                
            }
            else
            {
                ManageException(new Exception("El cliente debe ser mayor de edad"));
            }
        }

        public void Update(Clients client)
        {
            _crudFactory.Update(client);
        }

        public void Delete(int clientId)
        {
            var client = new Clients { Id = clientId };
            _crudFactory.Delete(client);
        }

        public Clients RetrieveById(int clientId)
        {
            return _crudFactory.RetrieveById<Clients>(clientId);
        }

        public List<Clients> RetrieveAll()
        {
            return _crudFactory.RetrieveAll<Clients>();
        }

        private bool IsOver18(Clients client)
        {
            var currentDate = DateTime.Now;
            int age = currentDate.Year - client.BirthDate.Year;
            if (client.BirthDate.Date > currentDate.AddYears(-age).Date)
            {
                age--;
            }
            return age >= 18;
        }
    }
}
