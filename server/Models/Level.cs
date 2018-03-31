using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Level
    {
        public Guid LevelId { get; set; }

        public Guid ReviewCategoryId { get; set; }
        public ReviewCategory Category { get; set; }

        public string ShortDescription { get; set; }
        public string Description { get; set; }

        public int Score { get; set; }

        public string TeamCategory { get; set; }
    }
}