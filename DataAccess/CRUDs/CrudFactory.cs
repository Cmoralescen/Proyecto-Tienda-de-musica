using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAOs;
using DTO;

namespace DataAccess.CRUDs
{
    //Clase padre/madre abstracta de los crud.
    //Quien define como se hacen cruds en la arquitectura
    public abstract class CrudFactory
    {
        protected SqlDAO _sqlDao;

        //Definimos los metodos que forman parte del contrato
        // C -> Create
        // R -> Retrieve
        // U -> Update
        // D -> Delete

        public abstract void Create(BaseDTO dto);

        public abstract void Update(BaseDTO dto);

        public abstract void Delete(BaseDTO dto);

        public abstract T Retrive<T>();

        public abstract T RetrieveById<T>(int id);

        public abstract List<T> RetrieveAll<T>();

    }
}
