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
                results.Add(new User { Name = user.DisplayName, Email = user.Email, Roles = await _userManager.GetRolesAsync(user), });
            return Ok(results);
        }

        [HttpGet("api/users/{email}")]
        public async Task<IActionResult> Get(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var roles = await _userManager.GetRolesAsync(user);
            var coaches = _context.TeamCoaches.Where(tc => tc.UserId == user.Id && tc.EndDate == null || tc.EndDate > DateTime.Now);

            return Ok(new User { Name = user.DisplayName, Email = user.Email, Roles = roles, CanChange = user.Email != "root@talenttrack", Teams = coaches.Select(tc => tc.TeamId), IsActive = user.IsActive });
        }

        [HttpPut("api/users/{email}")]
        public async Task<IActionResult> Put(string email, [FromBody] User updatedUser)
        {
            if (email == "root@talenttrack")
                return BadRequest("the root user cannot be changed");

            var currentUser = await _userManager.FindByEmailAsync(email);
            currentUser.DisplayName = updatedUser.Name;
            currentUser.IsActive = updatedUser.IsActive;

            var updateResult = await _userManager.UpdateAsync(currentUser);
            if (!updateResult.Succeeded)
                return BadRequest(updateResult.Errors);

            var currentRoles = await _userManager.GetRolesAsync(currentUser);
            await _userManager.AddToRolesAsync(currentUser, updatedUser.Roles.Except(currentRoles));
            await _userManager.RemoveFromRolesAsync(currentUser, currentRoles.Except(updatedUser.Roles));

            var currentTeams = _context.TeamCoaches.Where(tc => tc.UserId == currentUser.Id);
            var newTeams = updatedUser.Teams.Except(currentTeams.Select(t => t.TeamId));
            var removedTeams = currentTeams.Select(t => t.TeamId).Except(updatedUser.Teams);

            foreach (var team in newTeams)
                _context.TeamCoaches.Add(new TeamCoach { UserId = currentUser.Id, TeamId = team, });

            foreach (var team in removedTeams)
            {
                var removedTeamCoach = await _context.TeamCoaches.FirstOrDefaultAsync(tc => tc.TeamId == team);
                removedTeamCoach.EndDate = DateTime.Now;
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("api/users/{email}")]
        public async Task<IActionResult> Post(string email, [FromBody] User user)
        {
            if (string.IsNullOrWhiteSpace(email) || user.Roles.Any(r => r == "root"))
                return BadRequest();
            var newUser = new ApplicationUser { Email = email, UserName = user.Name ?? user.Email, DisplayName = user.Name, };
            var creationResult = await _userManager.CreateAsync(newUser, "root");
            if (!creationResult.Succeeded)
                return BadRequest(creationResult.Errors);
            return Ok(newUser);
        }
    }

    public class User
    {
        public User()
        {
            this.Roles = Enumerable.Empty<string>();
            this.Teams = Enumerable.Empty<Guid>();
            this.Scouts = Enumerable.Empty<string>();
        }

        public bool CanChange { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public IEnumerable<Guid> Teams { get; set; }
        public IEnumerable<string> Scouts { get; set; }
    }
}
