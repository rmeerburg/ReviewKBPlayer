﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace server.Controllers
{
    public class PlayersController : Controller
    {
        private readonly KbContext _context;

        public PlayersController(KbContext context)
        {
            _context = context;
        }

        // GET api/values
        [HttpGet("api/players")]
        public IEnumerable<object> Get()
        {
            return _context.Players.Include(p => p.Participations).ThenInclude(p => p.Team);// .Select(p => new { p, participations = p.Participations.Select(pt => new { pt.Team.Name, pt.StartDate }), });
        } 

        // GET api/values/5
        [HttpGet("api/players/{id}")]
        public Player Get(string id) =>  _context.Players.Include(p => p.Participations).ThenInclude(p => p.Team).FirstOrDefault(p => p.RegistrationId == id);
    }
}
