using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using OnBoardingTaskVersion2.Models;

namespace OnBoardingTaskVersion2.Controllers
{
   
    public class ProductSoldController : Controller
    {
        StoreManagementEntities StoreManagementEntitiesdb = new StoreManagementEntities();

        // GET: ProductSold
        public ActionResult Index()
        {
            var psold = new ProductSold();
            ViewBag.CustomerId = new SelectList(StoreManagementEntitiesdb.Customers, "Id", "Name", psold.CustomerId);
            ViewBag.ProductId = new SelectList(StoreManagementEntitiesdb.Products, "Id", "Name", psold.ProductId);
            ViewBag.StoreId = new SelectList(StoreManagementEntitiesdb.Stores, "Id", "Name", psold.StoreId);
            return View();
        }

        public JsonResult GetSalesList()
        {
            //using Lambda syntax
            var productsold = StoreManagementEntitiesdb.ProductSolds.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store).Select(x => new
            {
                Id = x.Id,
                PName = x.Product.Name,
                CName = x.Customer.Name,
                SName = x.Store.Name,
                DateSold = x.DateSold,
            }).ToList();

            return Json(productsold, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddSale(ProductSold ps)
        {
            StoreManagementEntitiesdb.ProductSolds.Add(ps);
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }

        public JsonResult GetSaleById(int Id)
        {
            StoreManagementEntitiesdb.Configuration.ProxyCreationEnabled = false;
            // using Query syntax
            var sale = (from s in StoreManagementEntitiesdb.ProductSolds
                         where s.Id == Id
                         select s).FirstOrDefault();
            return Json(sale, JsonRequestBehavior.AllowGet);            
        }

        public JsonResult UpdateSale(ProductSold psold)
        {
            StoreManagementEntitiesdb.Entry(psold).State = EntityState.Modified;
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }

        public JsonResult DeleteSale(int Id)
        {
            var psold = StoreManagementEntitiesdb.ProductSolds.Find(Id);
            StoreManagementEntitiesdb.ProductSolds.Remove(psold);
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }
    }
}