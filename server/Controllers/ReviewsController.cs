using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;

namespace server.Controllers
{
    public class ReviewsController : Controller
    {
        private readonly KbContext _context;

        public ReviewsController(KbContext context)
        {
            _context = context;
        }

        [HttpGet("api/players/{id}/reviews")]
        public IEnumerable<Review> Get(Guid id) =>  _context.Reviews;

        [HttpPost("api/players/{id}/reviews")]
        public async Task Post(Guid id, [FromBody] Review review)
        {
            review.PlayerId = id;
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
        }
    }
}
