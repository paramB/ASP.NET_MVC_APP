using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace OnBoardingTaskVersion2.Models
{
        public class CustomerVM
        {
            
            [DisplayAttribute(Name = "Customer Name")]
            public string Name { get; set; }
           
            public int Id { get; set; }
            public Nullable<int> Age { get; set; }
            public string Address { get; set; }
        }
    
}