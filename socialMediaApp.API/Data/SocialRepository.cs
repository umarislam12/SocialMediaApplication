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
//removed TolistAsync and await to defer the execution so we removed it from here to deffer the execution
            var users = _context.Users.Include(p => p.Photos).OrderByDescending(u=>u.LastActive).AsQueryable();
            users = users.Where(u =>u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);
            //Min and max age fulter
            if(userParams.MinAge !=18 || userParams.MaxAge!= 100)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }
            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
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