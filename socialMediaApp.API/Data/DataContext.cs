
using socialMedia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace socialMedia.API.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    { }
    public DbSet<values> Values { get; set; }
    public DbSet<User> Users { get; set; }
    //photos will be the name of table in DB
    public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            //since Like table has two Ids(LikerId & LikeeId) so there is no way for it to know about Primary key
            builder.Entity<Like>()
                .HasKey(k =>new { k.LikerId, k.LikeeId});
            //fluent APi to define properties for the relationship
            builder.Entity<Like>()
                .HasOne(u => u.Likee)
                .WithMany(u => u.Likers)
                .HasForeignKey(u => u.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);
           
            builder.Entity<Like>()
               .HasOne(u => u.Liker)
               .WithMany(u => u.Likees)
               .HasForeignKey(u => u.LikerId)
               .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Message>()
               .HasOne(u => u.Recipient)
               .WithMany(m => m.MessagesReceived)
               .OnDelete(DeleteBehavior.Restrict);
        }

    }
}