using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Review
    {
        public Review()
        {
            RatedAt = DateTime.Now;
            Ratings = new HashSet<Rating>();
        }

        public Guid ReviewId { get; set; }

        public Guid ParticipationId { get; set; }
        public Participation Participation { get; set; }

        public DateTime RatedAt { get; set; }
        public ICollection<Rating> Ratings { get; set; }

        public string ApplicationUserId { get; set; }
        public ApplicationUser SubmittedBy { get; set; }

        public string Notes { get; set; }
    }
}