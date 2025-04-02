using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreApp
{
    public class BaseManager
    {

        protected void ManageException(Exception exception)
        {
            //Implementar el manejo de excepciones
            throw new Exception("Ha ocurrido un error: " + exception.ToString());
        }
    }
}
