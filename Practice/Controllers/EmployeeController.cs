using Microsoft.AspNetCore.Mvc;
using ServiceClass.Models;

namespace Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        ServDbContext DB = new ServDbContext();
        [HttpPost]
        public void Post([FromBody] Employee employee)
        {

            Console.WriteLine(employee.Post + employee.Phonenumber);
            employee.Password = BCrypt.Net.BCrypt.HashPassword(employee.Password, BCrypt.Net.BCrypt.GenerateSalt());
            DB.Employees.Add(employee);
            DB.SaveChanges();
        }
        [HttpGet]
        public IEnumerable<Employee> GetAll()
        {
            return DB.Employees;
        }
        [HttpGet("{id}")]
        public Employee Get(int id)
        {

            return DB.Employees.Where(a => a.Id == id).First();
        }
        [HttpPut]
        public void Edit([FromBody] Employee employee)
        {
            Console.WriteLine(employee.Post + employee.Phonenumber);
            if (DB.Employees.Where(a => a.Id == employee.Id).First().Password != employee.Password)
            {
                employee.Password = BCrypt.Net.BCrypt.HashPassword(employee.Password, BCrypt.Net.BCrypt.GenerateSalt());
            }
            ServDbContext BD = new ServDbContext();
            BD.Employees.Update(employee);
            BD.SaveChanges();
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            DB.Employees.Remove(DB.Employees.Where(a => a.Id == id).First());
            DB.SaveChanges();
        }
    }
}
