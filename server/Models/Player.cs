using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Player
    {
        public Guid PlayerId { get; set; }

        public string RegistrationId { get; set; }
        public string Name { get; set; }
        public DateTime Dob { get; set; }
        public Gender Gender { get; set; }

        public ICollection<TeamParticipation> Participations { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}