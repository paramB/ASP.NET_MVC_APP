using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MVCAPP.Models
{
    [MetadataType(typeof(ProductMetaData))]
    public partial class Product
    {
        
        public class ProductMetaData
        {
            [DisplayAttribute(Name = "Product Name")]
            public string Name { get; set; }
            
        }

    }
}