using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    public class PlayersController : Controller
    {
        private readonly KbContext _context;

        public PlayersController(KbContext context)
        {
            _context = context;
        }

        [HttpGet("api/players")]
        public IEnumerable<object> Get()
        {
            return _context.Players.Include(p => p.Participations).ThenInclude(p => p.Team);
        } 

        [HttpGet("api/players/{id}")]
        public Player Get(string id) =>  _context.Players.Include(p => p.Participations).ThenInclude(p => p.Team).Include(p => p.Participations).ThenInclude(p => p.Reviews).FirstOrDefault(p => p.RegistrationId == id);
    }
}
