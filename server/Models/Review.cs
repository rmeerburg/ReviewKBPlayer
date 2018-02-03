using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Review
    {
        public Review()
        {
            RatedAt = DateTime.Now;
        }

        public Guid ReviewId { get; set; }

        public Guid ParticipationId { get; set; }
        public Participation Participation { get; set; }

        public DateTime RatedAt { get; set; }
        public ICollection<Rating> Ratings { get; set; }

        public string Notes { get; set; }
    }
}