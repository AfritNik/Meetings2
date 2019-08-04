using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Meetings.Models
{
    public class Arrangement
    {
        public Arrangement() { }

        public Arrangement(int id, string caption, DateTime time, User user)
        {
            Id = id;
            Caption = caption;
            Time = time;
            Author = user;
        }


        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Caption { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        
        public DateTime Time { get; set; }

        [ForeignKey("AuthorId")]
        public User Author { get; set; }

        public int AuthorId { get; set; }

        //public List<Member> Members = new List<Member>();
        
    }
}
