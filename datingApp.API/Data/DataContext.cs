
using datingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace datingApp.API.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    { }
    public DbSet<values> Values { get; set; }
    public DbSet<User> Users { get; set; }
    //photos will be the name of table in DB
    public DbSet<Photo> Photos { get; set; }

  }
}