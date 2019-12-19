using System.Threading.Tasks;
using socialMedia.API.Models;

namespace socialMedia.API.Data
{
  public interface IAuthRepository
  {
    Task<User> Register(User user, string password);

    Task<User> Login(string username, string password);
    Task<bool> UserExist(string username);
  }
}