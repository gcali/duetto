using System.Collections.Generic;
using System.Threading.Tasks;

namespace Duetto.Api.Services.User
{
    public class MemoryUserService : IUserService
    {
        private static readonly object _lock = new object();
        private static readonly List<Duetto.Api.Model.User> _users = new List<Duetto.Api.Model.User> {
            new Model.User {
                Username = "gicali",
                Password = "q2e4t6o0",
                IsAdmin = true
            },
            new Model.User {
                Username = "francesca",
                Password = "francescapuzza",
                IsAdmin = false
            }
        };

        public Task<bool> AddUser(string userName, string password, bool isAdmin)
        {
            lock(_lock) {
                var existing = FindExisting(userName);
                if (existing != null) {
                    return Task.FromResult(false);
                }
                var newUser = new Duetto.Api.Model.User {
                    Username = userName,
                    Password = password,
                    IsAdmin = isAdmin
                };
                _users.Add(newUser);
                return Task.FromResult(true);
            }
        }

        private Duetto.Api.Model.User FindExisting(string userName)  {
            return _users.Find(e => e.Username == userName);
        }

        public Task<bool> CheckUserPassword(string userName, string password)
        {
            lock (_lock) {
                var existing = FindExisting(userName);
                return Task.FromResult(existing != null && existing.Password == password);
            }
        }

        public Task<bool> IsAdmin(string userName) {
            lock (_lock) {
                var existing = FindExisting(userName);
                return Task.FromResult(existing != null && existing.IsAdmin);
            }
        }
    }
}