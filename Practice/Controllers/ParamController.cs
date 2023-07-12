using Microsoft.AspNetCore.Mvc;
using ServiceClass.Models;

namespace Practice.Controllers
{
    [Route("api")]
    [ApiController]
    public class ParamController : ControllerBase
    {
        ServDbContext DB = new ServDbContext();
        [HttpGet("radius")]

        public IEnumerable<WheelRadius> radius()
        {
            return DB.WheelRadii.ToList();
        }

        [HttpGet("type")]
        public IEnumerable<CarType> type()
        {
            return DB.CarTypes.ToList();
        }
        [HttpGet("radius/{id}")]
        public WheelRadius radius(long id)
        {
            return DB.WheelRadii.Where(a => a.Id == id).First();
        }
        [HttpGet("type/{id}")]
        public CarType type(long id)
        {
            return DB.CarTypes.Where(a => a.Id == id).First();
        }



        [HttpGet("stat")]
        public Status stat()
        {
            return DB.Statuses.Where(a => a.Status1 == "Создана").First();
        }
    }
}
