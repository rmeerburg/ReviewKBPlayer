using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Authorize(Roles = "admin")]
    public class TeamsController : Controller
    {
        private readonly TalentTrackContext _context;

        public TeamsController(TalentTrackContext context)
        {
            _context = context;
        }

        [HttpGet("api/teams")]
        public IActionResult Get() => Ok(_context.Teams.OrderBy(t => t.Name));
    }
}
