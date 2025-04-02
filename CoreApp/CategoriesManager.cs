using System;
using System.Collections.Generic;
using DataAccess.CRUDs;
using DTO;

namespace CoreApp
{
    public class CategoriesManager
    {
        private CategoriesCrudFactory _categoriesCrudFactory;

        public CategoriesManager()
        {
            _categoriesCrudFactory = new CategoriesCrudFactory();
        }

        public void CreateCategory(Categories category)
        {
            _categoriesCrudFactory.Create(category);
        }

        public void UpdateCategory(Categories category)
        {
            _categoriesCrudFactory.Update(category);
        }

        public void DeleteCategory(Categories category)
        {
            _categoriesCrudFactory.Delete(category);
        }

        public List<Categories> GetAllCategories()
        {
            return _categoriesCrudFactory.RetrieveAll<Categories>();
        }

        public Categories GetCategoryById(int id)
        {
            return _categoriesCrudFactory.RetrieveById<Categories>(id);
        }
    }
}
