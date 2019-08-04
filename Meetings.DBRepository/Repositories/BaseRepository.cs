using System;
using System.Collections.Generic;
using System.Text;
using Meetings.DBRepository.Interfaces;

namespace Meetings.DBRepository.Repositories
{
    public abstract class BaseRepository
    {
        protected string ConnectionString { get; }
        protected IRepositoryContextFactory ContextFactory { get; }

        public BaseRepository(string connectionString, IRepositoryContextFactory contextFactory)
        {
            ConnectionString = connectionString;
            ContextFactory = contextFactory;
        }
    }
}
