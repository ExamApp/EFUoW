using log4net;
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
        public static string WebLogText { get; } = "WebLog - ";
        protected static readonly ILog RepoLogger = LogHelper.GetLogger();

        public InventoryInitializer() {
            RepoLogger.Info("Entering InventoryInitializer");
        }
        protected new void Seed(InventoryContext context)
        {
            RepoLogger.Info("Entering Seed, initialization");
        }
    }
}
