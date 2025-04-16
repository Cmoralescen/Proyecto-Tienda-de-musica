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
    public class ProductsController : ControllerBase
    {
        private ProductManager _productManager;

        public ProductsController()
        {
            _productManager = new ProductManager();
        }

        [HttpGet]
        [Route("GetAll")]
        public ActionResult<List<Product>> GetAllProducts()
        {
            try
            {
                var products = _productManager.GetAllProducts();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public ActionResult<Product> GetProductById(int id)
        {
            try
            {
                var product = _productManager.GetProductById(id);
                if (product == null)
                {
                    return NotFound("Producto no encontrado.");
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Create")]
        public ActionResult CreateProduct([FromBody] Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Datos del producto inválidos.");
                }

                if (string.IsNullOrEmpty(product.Name) || product.Price <= 0)
                {
                    return BadRequest("Nombre del producto o precio no son válidos.");
                }

                _productManager.CreateProduct(product);
                return Ok("Producto creado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("Update")]
        public ActionResult UpdateProduct([FromBody] Product product)
        {
            try
            {
                _productManager.UpdateProduct(product);
                return Ok("Producto actualizado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public ActionResult DeleteProduct(int id)
        {
            try
            {
                var product = new Product() { Id = id };
                _productManager.DeleteProduct(product);
                return Ok("Producto eliminado correctamente.");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
