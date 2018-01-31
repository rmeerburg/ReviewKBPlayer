using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Rating
    {
        public Guid RatingId { get; set; }

        public Guid LevelId { get; set; }
        public Level Level { get; set; }

        public Guid ReviewId { get; set; }
        public Review Review { get; set; }
    }
}