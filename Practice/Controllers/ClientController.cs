using Microsoft.AspNetCore.Mvc;
using ServiceClass.Models;

namespace Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        ServDbContext DB = new ServDbContext();
        [HttpGet]
        public IEnumerable<Client> GetClients()
        {
            return DB.Clients;
        }
        [HttpPut]
        public void DeleteClient([FromBody] int id)
        {
            DB.Remove(DB.Clients.Where(a => a.Id == id).First());
            DB.SaveChanges();
        }
        [HttpPost]
        public Client GetClient([FromBody] Dictionary<string, string> phone)
        {
            return DB.Clients.Where(a => a.Phonenumber == phone["phone"]).First();
        }
    }
}
