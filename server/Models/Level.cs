using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Level
    {
        public Guid LevelId { get; set; }
        public string Description { get; set; }
        public int Score { get; set; } // 1 - 15
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}