using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    public class PlayersController : Controller
    {
        private readonly KbContext _context;

        public PlayersController(KbContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Player> Get() => _context.Players;

        // GET api/values/5
        [HttpGet("{id}")]
        public Player Get(Guid id) =>  _context.Players.FirstOrDefault(p => p.PlayerId == id);
    }
}
