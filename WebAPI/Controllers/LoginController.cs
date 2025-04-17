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
        private readonly EmployeesManager _employeesManager;

        public LoginController()
        {
            _loginManager = new LoginManager();
            _employeesManager = new EmployeesManager();
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
        public ActionResult Register([FromBody] Employees employee)
        {
            try
            {
                if (employee == null ||
                    string.IsNullOrEmpty(employee.Email) ||
                    string.IsNullOrEmpty(employee.Password) ||
                    string.IsNullOrEmpty(employee.Name) ||
                    string.IsNullOrEmpty(employee.Lastname) ||
                    string.IsNullOrEmpty(employee.Cargo) ||
                    employee.Salary <= 0 ||
                    string.IsNullOrEmpty(employee.Schedule))
                {
                    return BadRequest(new { Message = "Todos los campos obligatorios deben estar completos y el salario debe ser mayor a 0." });
                }

                _employeesManager.Create(employee);
                return Ok(new { Message = "Cuenta creada exitosamente." });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }
    }
}