using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
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
        public async Task<IActionResult> Get()
        {
            var allUsers = _userManager.Users;
            var results = new List<object>();

            foreach (var user in allUsers)
                results.Add(new User { Name = user.UserName, Email = user.Email, Roles = await _userManager.GetRolesAsync(user), });
            return Ok(results);
        }

        [HttpGet("api/users/{email}")]
        public async Task<IActionResult> Get(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new User { Name = user.UserName, Email = user.Email, Roles = roles, CanChange = user.Email != "root@talenttrack", });
        }

        [HttpPut("api/users/{email}")]
        public async Task<IActionResult> Patch(string email, [FromBody] User updatedUser)
        {
            if (email == "root@talenttrack")
                return BadRequest("the root user cannot be changed");

            var currentUser = await _userManager.FindByEmailAsync(email);
            currentUser.UserName = updatedUser.Name;

            var updateResult = await _userManager.UpdateAsync(currentUser);
            if (!updateResult.Succeeded)
                return BadRequest(updateResult.Errors);

            var currentRoles = await _userManager.GetRolesAsync(currentUser);
            await _userManager.AddToRolesAsync(currentUser, updatedUser.Roles.Except(currentRoles));
            await _userManager.RemoveFromRolesAsync(currentUser, currentRoles.Except(updatedUser.Roles));

            return Ok();
        }

        [HttpPost("api/users/{email}")]
        public async Task<IActionResult> Post(string email, [FromBody] User user)
        {
            if (string.IsNullOrWhiteSpace(email) || user.Roles.Any(r => r == "root"))
                return BadRequest();
            var newUser = new ApplicationUser { Email = email, UserName = user.Name ?? user.Email };
            var creationResult = await _userManager.CreateAsync(newUser, "root");
            if (!creationResult.Succeeded)
                return BadRequest(creationResult.Errors);
            return Ok(newUser);
        }
    }

    public class User
    {
        public bool CanChange { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
