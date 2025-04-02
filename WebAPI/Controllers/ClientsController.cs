using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoreApp;
using DTO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly ClientsManager _clientsManager;

        public ClientsController()
        {
            _clientsManager = new ClientsManager();
        }

        // POST - Create
        [HttpPost]
        [Route("Create")]
        public ActionResult Create(Clients client)
        {
            try
            {
                if (client == null)
                {
                    return BadRequest("El objeto cliente es nulo.");
                }
                _clientsManager.Create(client);
                return Ok(client);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET - Retrieve all clients
        [HttpGet]
        [Route("RetrieveAll")]
        public ActionResult RetrieveAll()
        {
            try
            {
                var clients = _clientsManager.RetrieveAll();
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET - Retrieve by ID
        [HttpGet]
        [Route("RetrieveById")]
        public ActionResult RetrieveById(int id)
        {
            try
            {
                var client = _clientsManager.RetrieveById(id);
                if (client == null)
                {
                    return NotFound("Cliente no encontrado.");
                }
                return Ok(client);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT - Update
        [HttpPut]
        [Route("Update")]
        public ActionResult Update(Clients client)
        {
            try
            {
                if (client == null)
                {
                    return BadRequest("El objeto cliente es nulo.");
                }
                _clientsManager.Update(client);
                return Ok("Cliente actualizado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE - Delete
        [HttpDelete("Delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _clientsManager.Delete(id);
                return Ok("Cliente eliminado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
