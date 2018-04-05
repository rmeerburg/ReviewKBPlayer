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
    public class UsersController : Controller
    {
        private readonly TalentTrackContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersController(TalentTrackContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet("api/users")]
        public async Task<IActionResult> Get(string id)
        {
            var allUsers = _userManager.Users;
            var results = new List<object>();

            foreach(var user in allUsers)
                results.Add(new { Name = user.UserName, user.Email, Roles = await _userManager.GetRolesAsync(user), } );
            return Ok(results);
        }
    }
}
