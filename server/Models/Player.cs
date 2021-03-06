using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Player
    {
        public Player()
        {
            Participations = new HashSet<Participation>();
        }

        public Guid PlayerId { get; set; }

        public string RegistrationId { get; set; }
        public string Name { get; set; }
        public DateTime Dob { get; set; }
        public Gender Gender { get; set; }

        public ICollection<Participation> Participations { get; set; }
    }
}