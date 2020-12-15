using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Duetto.Api.Services.Game
{
    public class GameService
    {
        private class PlayerGames {
            private class Game {
                public string Master {get;set;}
                public string Player {get;set;}
            }
            private readonly ConcurrentDictionary<string, Game> _playerMap = new ConcurrentDictionary<string, Game>();
            private object _lock = new object();
            public void CreateGame(string password, string connectionId) {
                var game = new Game { Master = connectionId};
                _playerMap.AddOrUpdate(
                    password, 
                    (password) => game,
                    (password, old) => game
                );
            }

            public void Join(string password, string connectionId) {
                if (_playerMap.TryGetValue(password, out var game)) {
                    game.Player = connectionId;
                }
            }

            internal string GetOtherPlayer(string password, string connectionId)
            {
                if (_playerMap.TryGetValue(password, out var game)) {
                    return game.Master == connectionId ? game.Player : game.Master;
                }
                return null;
            }
        }

        public string GetOtherPlayer(string userName, string password, string connectionId)
        {
            if (_gameMap.TryGetValue(userName, out var game)) {
                return game.GetOtherPlayer(password, connectionId);
            }
            return null;
        }

        private readonly ConcurrentDictionary<string, PlayerGames> _gameMap = new ConcurrentDictionary<string, PlayerGames>();

        public void CreateGame(string userName, string password, string connectionId) {
            var game = _gameMap.GetOrAdd(userName, (userName) => new PlayerGames());
            game.CreateGame(password, connectionId);
        }

        public void JoinGame(string userName, string password, string connectionId) {
            if (_gameMap.TryGetValue(userName, out var game)) {
                game.Join(password, connectionId);
            }
        }
    }
}