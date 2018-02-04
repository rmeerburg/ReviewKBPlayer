using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Team
    {
        public Team()
        {
            Participants = new HashSet<Participation>();
        }

        public Guid TeamId { get; set; }
        public string Name { get; set; }
        public ICollection<Participation> Participants { get; set; }
    }
}