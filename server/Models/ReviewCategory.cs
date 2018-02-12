using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class ReviewCategory
    {
        public Guid ReviewCategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}