using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    public class ReviewsController : Controller
    {
        private readonly KbContext _context;

        public ReviewsController(KbContext context)
        {
            _context = context;
        }

        [HttpGet("api/players/{id}/reviews")]
        public IEnumerable<Review> GetReviews(Guid id) => _context.Reviews;

        [HttpGet("api/levels")]
        public IEnumerable<Level> GetLevels() => _context.Levels;

        [HttpPost("api/participations/{id}/reviews")]
        public async Task Post(string id, [FromBody] Review review)
        {
            foreach (var rating in review.Ratings)
            {
                rating.LevelId = rating.Level.LevelId;
                rating.Level = null;
            }
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
        }
    }
}
