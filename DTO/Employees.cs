using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Employees : BaseDTO
    {
        public string Name { get; set; }

        public string Lastname { get; set; }

        public string Email { get; set; }

        public int PhoneNumber { get; set; }

        public string Cargo { get; set; }

        public int Salary { get; set; }

        public string Schedule { get; set; }

        public string Password { get; set; } // Nuevo campo

    }
}
