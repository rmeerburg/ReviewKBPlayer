using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class TeamCoach
    {
        public TeamCoach()
        {
            StartDate = DateTime.Now;
        }

        public Guid TeamCoachId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}