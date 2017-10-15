using Inventory.Model;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Repository
{
    public class InventoryContext : DbContext
    {
        protected static readonly ILog ServiceLogger = LogHelper.GetLogger();

        public InventoryContext() : base("name=InventoryConnectionString")
        {
            ServiceLogger.Info("Initializing DB");
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserCar> UserCar { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            //Database.SetInitializer<InventoryContext>(null);
            //base.OnModelCreating(modelBuilder);
        }
    }
}
