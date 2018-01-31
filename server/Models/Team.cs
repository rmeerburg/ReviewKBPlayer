using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Team
    {
        public Guid TeamId { get; set; }
        public Guid SeasonId { get; set; }
        public Season Season { get; set; }
        public string Name { get; set; }
        public ICollection<TeamParticipation> Participants { get; set; }
    }
}