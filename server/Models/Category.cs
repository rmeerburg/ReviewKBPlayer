using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string Description { get; set; } // attack, defense...
    }
}