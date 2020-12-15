using System.Threading.Tasks;
using Duetto.Api.Services.Game;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Duetto.Api.Hubs
{

    [Authorize]
    public class GameHub : Hub
    {
        private static readonly GameService _gameService = new GameService();
        public Task JoinGame(string userName, string password) {
            _gameService.JoinGame(userName, password, Context.ConnectionId);
            return Task.CompletedTask;
        }

        public Task CreateGame(string password) {
            _gameService.CreateGame(Context.User.Identity.Name, password, Context.ConnectionId);
            return Task.CompletedTask;
        }

        public async Task SendMessage(string userName, string password, string message) {
            var otherId = _gameService.GetOtherPlayer(userName, password, Context.ConnectionId);
            if (otherId != null) {
                await Clients.Client(otherId).SendAsync("receiveMessage", message);
            }
        }
    }
}