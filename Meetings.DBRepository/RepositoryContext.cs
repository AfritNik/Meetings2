using System;
using System.Collections.Generic;
using System.Text;
using Meetings.Models;
using Microsoft.EntityFrameworkCore;

namespace Meetings.DBRepository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {

        }

        //public DbSet<Post> Posts { get; set; }
        //public DbSet<Comment> Comments { get; set; }
        //public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Arrangement> Events { get; set; }
    }
}
