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
    public class UserInventoryController : ApiController
    {
        [HttpGet]
        [Route("api/UserInventory/GetUserCar")]
        public IEnumerable<Car> GetUserCar(string userName)
        {
            UnitOfWork uof = new UnitOfWork();
            var users = uof.UserRepository.GetAll();
            var userId = 0;
            if (users != null)
                userId = users.FirstOrDefault(u => u.UserName == userName).Id;

            var cars = uof.CarRepository.GetAll();
            if (cars == null) return null;

            var carList = cars.ToList().Where(u => u.OwnerId == userId);


            return carList;
        }

        [HttpPost]
        [Route("api/UserInventory/EditUserCar")]
        public bool EditUserCar(string userId, string carId, string model, string brand, string price, string year)
        {
            UnitOfWork uof = new UnitOfWork();
            //var car = new Car() { Id = int.Parse(carId) };
            //uof.CarRepository.Delete(car);

            uof.CarRepository.Update(
              new Car()
              { Id = int.Parse(carId), Brand = brand, Model = model, OwnerId = int.Parse(userId), Price = decimal.Parse(price), Year = int.Parse(year) }
            );

            uof.Save();

            return true;
        }

        [HttpPost]
        [Route("api/UserInventory/AddUserCar")]
        public bool AddUserCar(string userName, string model, string brand, string price, string year)
        {
            UnitOfWork uof = new UnitOfWork();
            var allUsers = uof.UserRepository.GetAll();
            var userId = 0;
            if (allUsers != null)
            {
                var data = allUsers.FirstOrDefault(u => u.UserName == userName);
                if (data != null)
                {
                    userId = data.Id;
                    uof.CarRepository.Insert(
                         new Car()
                         { Brand = brand, Model = model, OwnerId = userId, Price = decimal.Parse(price), Year = int.Parse(year) }
                       );

                    uof.Save();
                    return true;

                }
            }

            return false;
        }
    }
}
