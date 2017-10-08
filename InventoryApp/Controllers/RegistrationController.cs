using Inventory.Model;
using Inventory.Repository;
using InventoryApp.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InventoryApp.Controllers
{
    [WebErrHandler]
    public class RegistrationController : ApiController
    {
        [HttpGet]
        [Route("api/Registration/Foo")]
        public string Foo()
        {
            return "Foo Worked...";
        }

        [HttpPost]
        [Route("api/Registration/Register")]
        public bool Register(string userName, string password)
        {
            UnitOfWork uof = new UnitOfWork();
            uof.UserRepository.Insert(
                new User()
                { UserName = userName, Password = password }
            );

            uof.Save();

            return true;
        }

        [HttpGet]
        [Route("api/Registration/Login")]
        public bool Login(string userName, string password)
        {
            UnitOfWork uof = new UnitOfWork();
            var users = uof.UserRepository.GetAll();
            var found = users.ToList().Any(u => u.UserName == userName && u.Password == password);


            return found;
        }
    }
}
