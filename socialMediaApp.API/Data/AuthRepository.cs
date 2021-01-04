using System;
using System.Threading.Tasks;
using socialMedia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace socialMedia.API.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;
    public AuthRepository(DataContext context)
    {
      _context = context;

    }
    public async Task<User> Login(string username, string password)
    {
      var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == username);
      if (user == null)
        return null;
      //signin manager of ms identity will verify the pass
      //if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
      //  return null;
      return user;
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
      {

        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
          if (computedHash[i] != passwordHash[i])
            return false;
        }
      }
      return true;
    }

    public async Task<User> Register(User user, string password)
    {
      //passed in user object which only has only username assigned
      byte[] passwordHash, passwordSalt;
      //to calculate hash and salt in user object
      CreatePasswordHash(password, out passwordHash, out passwordSalt);
      //user.PasswordHash = passwordHash;
      //user.PasswordSalt = passwordSalt;
      await _context.Users.AddAsync(user);
      await _context.SaveChangesAsync();
      return user;
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }

    public async Task<bool> UserExist(string username)
    {
      if (await _context.Users.AnyAsync(x => x.UserName == username))
        return true;
      return false;


    }
  }
}