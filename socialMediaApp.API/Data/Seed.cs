using System;
using System.Collections.Generic;
using System.Linq;
using socialMedia.API.Models;
using Newtonsoft.Json;

namespace socialMedia.API.Data
{
  public class Seed
  {
    public static void SeedUsers(DataContext context)
    {
      if (!context.Users.Any())
      {
        var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
        var users = JsonConvert.DeserializeObject<List<User>>(userData);
        foreach (var user in users)
        {
          byte[] passwordHash, passwordSalt;
          CreatePasswordHash("Password ", out passwordHash, out passwordSalt);
          user.PasswordHash = passwordHash;
          user.PasswordSalt = passwordSalt;
          user.Username = user.Username.ToLower();
          //adding to context all the initializations 
          context.Users.Add(user);
        }
        context.SaveChanges();
      }
    }



    private static void CreatePasswordHash(string Password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
      }
    }
  }
}