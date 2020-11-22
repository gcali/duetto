using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Duetto.Api.Services.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Duetto.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        public class CreateGameVM {

        }
        [Authorize]
        [HttpPost("create")]
        public Task<IActionResult> CreateGame([FromBody]CreateGameVM vm) {

        }

        public class JoinGameVM {

        }
        [Authorize]
        [HttpPost("join")]
        public Task<IActionResult> JoinGame([FromBody]JoinGameVM vm) {
            
        }
    }
}