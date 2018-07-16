using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnBoardingTaskVersion2.Models;

namespace OnBoardingTaskVersion2.Controllers
{
    public class CustomerController : Controller
    {
        StoreManagementEntities StoreManagementEntitiesdb = new StoreManagementEntities();
        
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }
        
        public JsonResult GetCustomerList()
        {
            // using LAMBDA syntax
            var customers = StoreManagementEntitiesdb.Customers.Select(x => new
            {
                Id = x.Id,
                CustomerName = x.Name,
                Age = x.Age,
                Address = x.Address,              
            }).ToList();
            return Json(customers, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomerById(int Id)
        {
            StoreManagementEntitiesdb.Configuration.ProxyCreationEnabled = false;
            // using Query syntax
            var customer = (from cust in StoreManagementEntitiesdb.Customers
                           where cust.Id == Id
                           select cust).FirstOrDefault();
            return Json(customer, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddCustomer(Customer customer)
        {
            //StoreManagementEntitiesdb.Customers.Add(customer);
            StoreManagementEntitiesdb.Entry(customer).State = EntityState.Added;
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }

        public JsonResult UpdateCustomer(Customer customer)
        {
            StoreManagementEntitiesdb.Entry(customer).State = EntityState.Modified;
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }

        public JsonResult DeleteCustomer(int Id)
        {           
            Customer customer = StoreManagementEntitiesdb.Customers.Find(Id);
            StoreManagementEntitiesdb.Customers.Remove(customer);
            return Json(StoreManagementEntitiesdb.SaveChanges());
        }
    }
}