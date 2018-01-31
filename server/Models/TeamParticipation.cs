using System;

namespace Server.Models
{
    public class TeamParticipation
    {
        public Guid TeamParticipationId { get; set; }
        public Guid PlayerId { get; set; }
        public Player Player { get; set; }
        public Guid TeamId { get; set; }
        public Team Team { get; set; }
    }
}