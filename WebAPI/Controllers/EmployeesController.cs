using CoreApp;
using DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesManager _employeesManager;

        public EmployeesController()
        {
            _employeesManager = new EmployeesManager();
        }

        [HttpPost]
        [Route("Create")]
        public ActionResult Create([FromBody] Employees employee)
        {
            try
            {
                if (employee == null || string.IsNullOrEmpty(employee.Name) || string.IsNullOrEmpty(employee.Lastname) ||
                    string.IsNullOrEmpty(employee.Email) || employee.PhoneNumber == 0 || string.IsNullOrEmpty(employee.Cargo) ||
                    employee.Salary == 0 || string.IsNullOrEmpty(employee.Schedule) || string.IsNullOrEmpty(employee.Password))
                {
                    return BadRequest(new { Message = "Todos los campos son obligatorios." });
                }

                _employeesManager.Create(employee);
                return Ok(new { Message = "Empleado creado exitosamente." });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetAll")]
        public ActionResult GetAll()
        {
            try
            {
                var employees = _employeesManager.RetrieveAll();
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetById")]
        public ActionResult GetById(int id)
        {
            try
            {
                var employee = _employeesManager.RetrieveById(id);
                if (employee == null)
                    return NotFound(new { Message = "Empleado no encontrado." });
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }

        [HttpPut]
        [Route("Update")]
        public ActionResult Update([FromBody] Employees employee)
        {
            try
            {
                if (employee == null || employee.Id == 0 || string.IsNullOrEmpty(employee.Name) ||
                    string.IsNullOrEmpty(employee.Lastname) || string.IsNullOrEmpty(employee.Email) ||
                    employee.PhoneNumber == 0 || string.IsNullOrEmpty(employee.Cargo) || employee.Salary == 0 ||
                    string.IsNullOrEmpty(employee.Schedule) || string.IsNullOrEmpty(employee.Password))
                {
                    return BadRequest(new { Message = "Todos los campos son obligatorios." });
                }

                _employeesManager.Update(employee);
                return Ok(new { Message = "Empleado actualizado exitosamente." });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public ActionResult Delete(int id)
        {
            try
            {
                _employeesManager.Delete(id);
                return Ok(new { Message = "Empleado eliminado exitosamente." });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { Message = ex.Message });
            }
        }
    }
}