using System.Threading.Tasks;

namespace Duetto.Api.Services.User
{
    public interface IUserService
    {
         Task<bool> CheckUserPassword(string userName, string password);
         Task<bool> AddUser(string userName, string password, bool isAdmin);
         Task<bool> IsAdmin(string userName);
    }
}