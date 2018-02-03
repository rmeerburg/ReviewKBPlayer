using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Season
    {
        public Guid SeasonId { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}