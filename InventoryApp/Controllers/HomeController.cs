using InventoryApp.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InventoryApp.Controllers
{
    [WebErrHandler]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Index1()
        {
            ViewBag.Title = "Index1 Page";

            return View();
        }

        [HttpGet]
        public string LogTest()
        {
            throw new Exception("My custom error");
        }
    }
}
