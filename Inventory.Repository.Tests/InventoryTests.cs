using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace Inventory.Repository.Tests
{
    [TestClass]
    public class InventoryTests
    {
        [TestMethod]
        public void TestMethod1()
        {
            UnitOfWork uof = new UnitOfWork();
            var cars = uof.CarRepository.Get();
        }

        [TestMethod]
        public void TestMethodUsers()
        {
            UnitOfWork uof = new UnitOfWork();
            var users = uof.UserRepository.Get();
        }

        [TestMethod]
        public void RegistrationTest()
        {
            UnitOfWork uof = new UnitOfWork();
            uof.UserRepository.Insert(
                new Model.User()
                { UserName = "User1", Password = "Password123" }
                );

            uof.Save();
            var users = uof.UserRepository.Get();

        }

        [TestMethod]
        public void UserLoginTest()
        {
            var userName = "User1";
            var userPassword = "Password123";

            UnitOfWork uof = new UnitOfWork();
            var users = uof.UserRepository.GetAll();
            var found = users.ToList().Any(u => u.UserName == userName && u.Password == userPassword);

            Assert.AreEqual(true, found, "User Not found in the system, error");

        }

        [TestMethod]
        public void AddMyCarTests()
        {
            UnitOfWork uof = new UnitOfWork();
            uof.CarRepository.Insert(
                new Model.Car()
                {  Brand = "Lancer", Model = "GLXI 2002", OwnerId =  1 }
            );

            uof.Save();
            var userCar = uof.CarRepository.Get();

        }

        //[TestMethod]
        //public void UserCarMappingTest()
        //{
        //    UnitOfWork uof = new UnitOfWork();
        //    uof.UserCarRepository.Insert(
        //        new Model.UserCar()
        //        { UserId = 1, CarId = 1 }
        //        );

        //    uof.Save();
        //    var userCar = uof.UserCarRepository.Get();

        //}

    }

}
