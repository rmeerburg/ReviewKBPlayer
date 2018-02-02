using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Level
    {
        public Guid LevelId { get; set; }

        public Category Category { get; set; }

        public string ShortDescription { get; set; }
        public string Description { get; set; } // detailed text

        public int Score { get; set; } // 1 - 15
    }
}