using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers
{
    public class ReviewsController : Controller
    {
        private readonly TalentTrackContext _context;

        public ReviewsController(TalentTrackContext context)
        {
            _context = context;
        }

        [HttpGet("api/players/{id}/reviews")]
        public IEnumerable<Review> GetReviews(Guid id) => _context.Reviews;

        [HttpGet("api/levels")]
        public IEnumerable<Level> GetLevels() => _context.Levels;

        [HttpGet("api/reviewcategories")]
        public IEnumerable<ReviewCategoryConfiguration> GetReviewCategories()
        {
            var levels = _context.Levels.Include(l => l.Category);

            foreach (var levelGroup in levels.GroupBy(l => l.Category))
            {
                yield return new ReviewCategoryConfiguration
                {
                    Id = levelGroup.Key.ReviewCategoryId,
                    CategoryName = levelGroup.Key.Name,
                    Levels = levelGroup.Select(l => new CategoryLevel { LevelId = l.LevelId, ReviewCategoryId = l.ReviewCategoryId, Score = l.Score, Description = l.Description, ShortDescription = l.ShortDescription, TeamCategory = l.TeamCategory, })
                };
            }
        }

        [HttpPost("api/participations/{id}/reviews")]
        public async Task Post(string id, [FromBody] ReviewViewModel reviewModel)
        {
            var review = new Review();
            review.ApplicationUserId = User.Claims.First(claim => claim.Type == "id").Value;
            review.ParticipationId = reviewModel.ParticipationId;
            review.Notes = reviewModel.Notes;

            foreach (var rating in reviewModel.Ratings)
                review.Ratings.Add(new Rating { LevelId = rating.LevelId, });
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
        }
    }

    public class ReviewViewModel
    {
        public IEnumerable<RatingModel> Ratings { get; set;}
        public string Notes { get; set; }
        public Guid ParticipationId { get; set; }
    }

    public class RatingModel
    {
        public Guid LevelId { get; set; }
        public Guid CategoryId { get; set; }
    }

    public class ReviewCategoryConfiguration
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public IEnumerable<CategoryLevel> Levels { get; set; }
    }

    public class CategoryLevel
    {
        public Guid LevelId { get; set; }
        public Guid ReviewCategoryId { get; set; }
        public int Score { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string TeamCategory { get; set; }
    }
}
