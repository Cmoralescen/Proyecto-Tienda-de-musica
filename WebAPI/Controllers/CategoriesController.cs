using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using CoreApp;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private CategoriesManager _categoriesManager;

        public CategoriesController()
        {
            _categoriesManager = new CategoriesManager();
        }

        [HttpGet]
        [Route("GetAll")]
        public ActionResult<List<Categories>> GetAllCategories()
        {
            try
            {
                var categories = _categoriesManager.GetAllCategories();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Create")]
        public ActionResult CreateCategory([FromBody] Categories category)
        {
            try
            {
                _categoriesManager.CreateCategory(category);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("Update")]
        public ActionResult UpdateCategory([FromBody] Categories category)
        {
            try
            {
                _categoriesManager.UpdateCategory(category);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public ActionResult DeleteCategory(int id)
        {
            try
            {
                var category = new Categories() { Id = id };
                _categoriesManager.DeleteCategory(category);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
