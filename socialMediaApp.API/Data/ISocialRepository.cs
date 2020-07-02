using System.Collections.Generic;
using System.Threading.Tasks;
using socialMedia.API.Helpers;
using socialMedia.API.Models;

namespace socialMedia.API.Data
{
  public interface ISocialRepository
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveAll();
        //passing our helper class in
    Task<PagedList<User>> GetUsers(UserParams userParams);
    Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        //Get id of message
        Task<Message> GetMessage(int id);
        //Inbox/Outbox etc
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        //Conversation of two user displayed in tabbed pannel
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}