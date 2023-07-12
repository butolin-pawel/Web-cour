using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceClass.Models;

namespace Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        ServDbContext DB = new ServDbContext();
        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return DB.Products.Include(a => a.ProductRadii).ThenInclude(b => b.RadiusNavigation);
        }
        [HttpGet("{id}")]
        public Product GetProduct(int id)
        {
            return DB.Products.Where(a => a.Id == id).Include(a => a.ProductRadii).ThenInclude(b => b.RadiusNavigation).First();

        }
        [HttpGet("types")]
        public IEnumerable<ProductRadius> GetProductById()
        {
            return DB.ProductRadii;
        }
        [HttpGet("services")]
        public IEnumerable<Service> GetServ()
        {
            return DB.Services;
        }
    }
}
