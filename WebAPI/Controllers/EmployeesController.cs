using System;
using System.Collections.Generic;
using CoreApp;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/Employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private EmployeesManager _employeesManager;

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
                _employeesManager.Create(employee);
                return Ok("Empleado creado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAll")]
        public ActionResult<List<Employees>> GetAll()
        {
            return _employeesManager.RetrieveAll();
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public ActionResult<Employees> GetById(int id)
        {
            return _employeesManager.RetrieveById(id);
        }

        [HttpPut]
        [Route("Update")]
        public ActionResult Update([FromBody] Employees employee)
        {
            try
            {
                _employeesManager.Update(employee);
                return Ok("Empleado actualizado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _employeesManager.Delete(id);
                return Ok("Empleado eliminado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
