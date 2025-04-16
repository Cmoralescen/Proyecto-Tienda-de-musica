using System;
using System.Net;
using CoreApp;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginManager _loginManager;
        private readonly ClientsManager _clientsManager;

        public LoginController()
        {
            _loginManager = new LoginManager();
            _clientsManager = new ClientsManager();
        }

        [HttpPost]
        [Route("Login")]
        public ActionResult Login([FromBody] LoginDTO login)
        {
            try
            {
                if (login == null || string.IsNullOrEmpty(login.Email) || string.IsNullOrEmpty(login.Password))
                {
                    return BadRequest(new { Message = "Correo o contraseña inválidos." });
                }

                var (isValid, userType, userId) = _loginManager.ValidateLogin(login);
                if (isValid)
                {
                    return Ok(new { Message = "Inicio de sesión exitoso.", UserType = userType, UserId = userId });
                }
                else
                {
                    return Unauthorized(new { Message = "Correo o contraseña incorrectos." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }

        [HttpPost]
        [Route("Register")]
        public ActionResult Register([FromBody] Clients client)
        {
            try
            {
                if (client == null || string.IsNullOrEmpty(client.Email) || string.IsNullOrEmpty(client.Password) ||
                    string.IsNullOrEmpty(client.Name) || string.IsNullOrEmpty(client.Lastname))
                {
                    return BadRequest(new { Message = "Todos los campos obligatorios deben estar completos." });
                }

                _clientsManager.Create(client);
                return Ok(new { Message = "Cuenta creada exitosamente." });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }
    }
}