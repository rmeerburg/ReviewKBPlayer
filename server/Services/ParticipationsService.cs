using System;
using System.Linq;
using System.Threading.Tasks;
using Server.Data;
using Server.Models;

namespace Server.Services
{
    public class ParticipationsService : IParticipationsService
    {
        private readonly TalentTrackContext _context;

        public ParticipationsService(TalentTrackContext context)
        {
            _context = context;
        }

        public async Task AddParticipation(Guid playerId, Guid teamId, Guid seasonId)
        {
            // foreach (var currentParticipation in _context.Participations.Where(part => part.PlayerId == playerId && part.EndDate == null))
            //     currentParticipation.EndDate = DateTime.Now;

            _context.Participations.Add(new Participation { PlayerId = playerId, TeamId = teamId, StartDate = DateTime.Today, SeasonId = seasonId, });

            await _context.SaveChangesAsync();
        }
    }

    public interface IParticipationsService
    {
        Task AddParticipation(Guid playerId, Guid teamId, Guid seasonId);
    }
}