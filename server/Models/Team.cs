using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Team
    {
        public Guid TeamId { get; set; }
        public string Name { get; set; }
        public ICollection<Participation> Participants { get; set; }
    }
}