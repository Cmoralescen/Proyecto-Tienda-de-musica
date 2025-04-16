using System;
using System.Collections.Generic;

namespace DTO
{
    public class Sale : BaseDTO
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal Total { get; set; }

        public List<SaleProduct> Products { get; set; }

        public string ClientName { get; set; }
        public string EmployeeName { get; set; }
    }
}
