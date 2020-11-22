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
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]User user) {
            if (!await _userService.CheckUserPassword(user.Username, user.Password)) {
                return NotFound();
            }

            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Username),
            };
            if (await _userService.IsAdmin(user.Username)) {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity)
            );
            return Ok();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout() {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [HttpPost("add")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddUser([FromBody]FullUser user) {
            var addResult = await _userService.AddUser(user.Username, user.Password, user.IsAdmin);
            if (addResult) {
                return Ok();
            } else {
                return BadRequest("Could not add user");
            }
        }

        [HttpGet]
        public async Task<IActionResult> WhoAmI() {
            if (HttpContext.User?.Identity?.Name != null) {
                return Ok(new {Name = HttpContext.User.Identity.Name});
            } else {
                return NotFound();
            }
        }

        public class User {
            public string Username {get;set;}
            public string Password {get;set;}
        }
        public class FullUser : User {
            public bool IsAdmin {get;set;}
        }
    }
}

