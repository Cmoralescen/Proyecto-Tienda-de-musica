using System;

namespace DTO
{
    public class Product : BaseDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public string Category { get; set; }

        public double Price { get; set; }
    }
}
