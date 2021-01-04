using System;
using System.Collections.Generic;
using System.Linq;
using socialMedia.API.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;

namespace socialMedia.API.Data
{
  public class Seed
  {
    public static void SeedUsers(UserManager<User> userManager, RoleManager<Role>roleManager)
    {
      if (!userManager.Users.Any())
      {
        var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
        var users = JsonConvert.DeserializeObject<List<User>>(userData);
                //create some roles
                var roles = new List<Role>
                {
                    new Role{Name="Member"},
                    new Role{Name="Admin"},
                    new Role{Name="Moderator"},
                    new Role{Name="VIP"},
                };
                //populate these roles in our db
                foreach(var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                    
                }
        foreach (var user in users)
                {
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member");
                    //Adding identity so we dont need them anymore
                    //byte[] passwordHash, passwordSalt;
                    //CreatePasswordHash("password", out passwordHash, out passwordSalt);
                    ////user.PasswordHash = passwordHash;
                    ////user.PasswordSalt = passwordSalt;
                    //user.UserName = user.UserName.ToLower();
                    ////adding to context all the initializations 
                    //context.Users.Add(user);
                }
                //create admin user
                var adminUser = new User
                {
                    UserName = "Admin"
                };
                var result = userManager.CreateAsync(adminUser, "Shutup").Result;
                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
                }
        //context.SaveChanges();
      }
    }



    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }
  }
}