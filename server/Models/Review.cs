using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Review
    {
        public Guid ReviewId { get; set; }

        public Guid PlayerId { get; set; }
        public Player Player { get; set; }

        public DateTime RatedAt { get; set; }
        public ICollection<Level> Levels { get; set; }
    }
}