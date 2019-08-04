using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Meetings.Models;

namespace Meetings.DBRepository.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Arrangement>> GetEvents();
    }
}
