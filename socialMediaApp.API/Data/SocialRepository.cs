using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using socialMedia.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using socialMedia.API.Helpers;

namespace socialMedia.API.Data
{
  public class SocialRepository : ISocialRepository
  {
    private readonly DataContext _context;
    public SocialRepository(DataContext context)
    {
      _context = context;

    }
    public void Add<T>(T entity) where T : class
    {
      _context.Add(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
      _context.Remove(entity);
    }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo =await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
    {
      //dattabase operation needs async programming
      var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
      return user;
    }

    public async Task<PagedList<User>> GetUsers(UserParams userParams)
    {

            var users = _context.Users.Include(p => p.Photos);
            //we used created createAsync in pagedList class
            //createAsync is executed before pagedList<User> is returned
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
    }

       

        public async Task<bool> SaveAll()
    {
      return await _context.SaveChangesAsync() > 0;
    }
  }
}