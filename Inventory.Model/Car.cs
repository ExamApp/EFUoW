using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Model
{
    public class Car
    {
        //1. Brand(Text field)
        //2. Model(Text field)
        //3. Year(Int)
        //4. Price(Decimal)
        //5. New(Bool)

        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public bool New { get; set; }
        public int OwnerId { get; set; }

    }

}
