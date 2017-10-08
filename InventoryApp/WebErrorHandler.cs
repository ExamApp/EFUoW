using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using log4net;
using Inventory.Repository;

namespace InventoryApp.Logger
{
    public class WebErrHandler : HandleErrorAttribute
    {
        public static string WebLogText { get; } = "WebLog - ";
        protected static readonly ILog WebLogger = LogHelper.GetLogger();

        public override void OnException(ExceptionContext filterContext)
        {
            var ex = filterContext.Exception;

            //Log Error
            var urlRequested = ((System.Web.HttpRequestWrapper)filterContext.HttpContext.Request).Url;
            var urlReferrer = ((System.Web.HttpRequestWrapper) filterContext.HttpContext.Request).UrlReferrer;

           
            WebLogger.Error($"{WebLogText} - Global Error Catched: {System.Environment.NewLine} urlRequested - {urlRequested}," +
                                                                            $"{System.Environment.NewLine} urlReferrer - {urlReferrer} " +
                                                                            $"{System.Environment.NewLine}" +
                                                                            $"{ex}");

            //If the request is AJAX return JSON else redirect user to Error view.
            if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                    filterContext.Result = new JsonResult
                    {
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                        Data = new { error = true, message = "Sorry, an error occurred while processing your request." }
                    };
            }
            else
            {
                filterContext.ExceptionHandled = true;
                var model = new HandleErrorInfo(filterContext.Exception, "Error", "GenericError");

                filterContext.Result = new ViewResult()
                {
                    ViewName = "AppGenericError",
                    ViewData = new ViewDataDictionary(model)
                };
            }
        }
    }
}
