using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnBoardingTaskVersion2.Models;

namespace OnBoardingTaskVersion2.Controllers
{
    public class ProductController : Controller
    {
        StoreManagementEntities StoreManagementEntitiesdb = new StoreManagementEntities();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetProductList()
        {
            // using LAMBDA syntax
            var products = StoreManagementEntitiesdb.Products.Select(x => new
            {
                Id = x.Id,
                ProductName = x.Name,
                Price = x.Price,               
            }).ToList();
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddProduct(Product product)
        {
            
            StoreManagementEntitiesdb.Entry(product).State = EntityState.Added;
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }

        public JsonResult GetProductById(int Id)
        {
            StoreManagementEntitiesdb.Configuration.ProxyCreationEnabled = false;
            // using Query syntax
            var product = (from prod in StoreManagementEntitiesdb.Products
                            where prod.Id == Id
                            select prod).FirstOrDefault();
            return Json(product, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateProduct(Product product)
        {
            StoreManagementEntitiesdb.Entry(product).State = EntityState.Modified;
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }

        public JsonResult DeleteProduct(int Id)
        {
            Product product = StoreManagementEntitiesdb.Products.Find(Id);
            StoreManagementEntitiesdb.Products.Remove(product);
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }
    }
}