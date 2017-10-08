using InventoryApp.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InventoryApp.Controllers
{
    [WebErrHandler]
    [OutputCache(VaryByParam = "*", Duration = 0, NoStore = true)]
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult Index()
        {
            return View("~/Views/Error/InventoryGenericError.cshtml");
        }

        public ActionResult Page404()
        {
            return View();
        }

        public ActionResult GenericError()
        {
            return View("~/Views/Error/InventoryGenericError.cshtml");
        }
      
    }
}