using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnBoardingTaskVersion2.Models;

namespace OnBoardingTaskVersion2.Controllers
{
    public class StoreController : Controller
    {
        StoreManagementEntities StoreManagementEntitiesdb = new StoreManagementEntities();

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetStoreList()
        {
            // using LAMBDA syntax
            var stores = StoreManagementEntitiesdb.Stores.Select(x => new
            {
                Id = x.Id,
                StoreName = x.Name,
                Address = x.Address,
            }).ToList();
            return Json(stores, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddStore(Store store)
        {
            
            StoreManagementEntitiesdb.Entry(store).State = EntityState.Added;
            return Json(StoreManagementEntitiesdb.SaveChanges());

        }

        public JsonResult GetStoreById(int Id)
        {
            StoreManagementEntitiesdb.Configuration.ProxyCreationEnabled = false;

            // using Query syntax
            var store = (from s in StoreManagementEntitiesdb.Stores
                           where s.Id == Id
                           select s).FirstOrDefault();

            return Json(store, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateStore(Store store) { 
            StoreManagementEntitiesdb.Entry(store).State = EntityState.Modified;
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }

        public JsonResult DeleteStore(int Id)
        {
            
            Store store = StoreManagementEntitiesdb.Stores.Find(Id);
            StoreManagementEntitiesdb.Stores.Remove(store);
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }
    }
}