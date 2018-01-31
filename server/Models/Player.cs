using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Player
    {
        public Guid PlayerId { get; set; }

        public ICollection<TeamParticipation> Participations { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}