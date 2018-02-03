using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Participation
    {
        public Guid ParticipationId { get; set; }

        public Guid PlayerId { get; set; }
        public Player Player { get; set; }

        public Guid TeamId { get; set; }
        public Team Team { get; set; }

        public Guid SeasonId { get; set; }
        public Season Season { get; set; }

        public ICollection<Review> Reviews { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}