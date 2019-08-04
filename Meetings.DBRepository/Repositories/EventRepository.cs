using Meetings.DBRepository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Meetings.Models;
using Microsoft.EntityFrameworkCore;

namespace Meetings.DBRepository.Repositories
{
    public class EventRepository : BaseRepository, IEventRepository
    {
        public EventRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory)
        {

        }

        public async Task<IEnumerable<Arrangement>> GetEvents()
        {
            IEnumerable<Arrangement> result;
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                result = await context.Events.ToListAsync();
            }

            return result;
        }
    }
}
