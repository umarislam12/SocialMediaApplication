using System.Collections.Generic;
using System.Threading.Tasks;
using datingApp.API.Models;

namespace datingApp.API.Data
{
  public interface ISocialRepository
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveAll();
    Task<IEnumerable<User>> GetUsers();
    Task<User> GetUser(int id);
  }
}