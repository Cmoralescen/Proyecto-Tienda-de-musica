using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace DataAccess.DAOs
{
    public class SqlDAO
    {
        /*
         * Clase u objeto se encarga de la comunicacion con la base de datos*
         * Solo ejecutar store procedures
         * 
         * Esta clase implementa un patron conocido como SIGLETON,, para asegurar la existencia
         * de una unica instancia del SQL DAO.
         */

        //Paso 1: Crear una instancia privada de la misma clase.

        private static SqlDAO _instance;

        private string _connectionString;
        //Paso 2: Redefinir el constructor default y convertirlo en privado 
        private SqlDAO()
        {
            //_connectionString = @"Data Source=CAMI\SQLEXPRESS02;Initial Catalog=ProyectoMusica;Integrated Security=True;Trust Server Certificate=True";
            _connectionString = @"Data Source=LAPTOP-UHBA6LQ5\SQLEXPRESS;Initial Catalog=ProyectoMusica;Integrated Security=True;Encrypt=True;Trust Server Certificate=True";

        }

        //Paso 3: Definir el metodo que expone la unica instancia de sqlDate

        public static SqlDAO GetInstance()
        {
            if (_instance == null)
            {

                _instance = new SqlDAO();
            }
            return _instance;
        }

        // Método que permite ejecutar un stored procedure en la base de datos.
        // No genera retorno, solo en caso de excepciones retorna una excepción.
        public void ExecuteProcedure(SqlOperation sqlOperation)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand(sqlOperation.ProcedureName, conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Set de los parámetros
                    foreach (var param in sqlOperation.Parameters)
                    {
                        command.Parameters.Add(param);
                    }

                    // Ejecutar el SP
                    conn.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        //Procedimiento para ejecutar el SP que retornan un set de datos
        public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation sqlOperation)
        {
            var lstReults = new List<Dictionary<string, object>>();

            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = new SqlCommand(sqlOperation.ProcedureName, conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Set de los parámetros
                    foreach (var param in sqlOperation.Parameters)
                    {
                        command.Parameters.Add(param);
                    }

                    // Ejecutar el SP
                    conn.Open();
                    //De aca en adelante la impementacion es distinta con respecto al procedure anterior
                    //Setencia que ejecuta el SP y captura el resultado
                    var reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {

                            var rowDict = new Dictionary<string, object>();

                            for (var index = 0; index < reader.FieldCount; index++)
                            {
                                var key = reader.GetName(index);
                                var value = reader.GetValue(index);
                                //Aca agregamos los valores al diccionario de esta fila
                                rowDict[key] = value;

                            }
                            lstReults.Add(rowDict);
                        }
                    }
                }
                return lstReults;
            }
        }

    }

}