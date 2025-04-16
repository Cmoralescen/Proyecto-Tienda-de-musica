using System;
using System.Collections.Generic;
using System.Net;
using CoreApp;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly SalesManager _salesManager;

        public SalesController()
        {
            _salesManager = new SalesManager();
        }

        // Endpoint para recuperar la lista de ventas.
        [HttpGet]
        [Route("GetAll")]
        public ActionResult<List<Sale>> GetAllSales()
        {
            try
            {
                var sales = _salesManager.GetAllSales();
                return Ok(sales);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // Endpoint para crear una nueva venta.
        [HttpPost]
        [Route("Create")]
        public ActionResult CreateSale([FromBody] Sale sale)
        {
            try
            {
                // Validación básica en el endpoint
                if (sale == null || sale.Products == null || sale.Products.Count == 0)
                {
                    return BadRequest("Datos de la venta inválidos o no se han seleccionado productos.");
                }

                // Llama al manager, que a su vez aplicará sus validaciones internas.
                _salesManager.CreateSale(sale);
                return Ok("Venta registrada correctamente.");
            }
            catch (Exception ex)
            {
                // Se retorna el error con código 500 en caso de excepción.
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
