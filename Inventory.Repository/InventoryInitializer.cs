using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Repository
{
    public class InventoryInitializer: DropCreateDatabaseIfModelChanges<InventoryContext>
    {
        protected new void Seed(InventoryContext context)
        {
            
        }
    }
}
