using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ServiceClass.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthentificationController : ControllerBase
    {

        ServDbContext DB = new ServDbContext();
        /* private readonly IHttpContextAccessor _httpContextAccessor;
         public AuthentificationController(IHttpContextAccessor httpContextAccessor)
         {
             _httpContextAccessor = httpContextAccessor;
         }*/

        [HttpPost("registration")]
        public void Reqistration([FromBody] Client client)
        {
            client.Password = BCrypt.Net.BCrypt.HashPassword(client.Password, BCrypt.Net.BCrypt.GenerateSalt());
            DB.Clients.Add(client);
            DB.SaveChanges();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        bool ValidateUser(string username, string password)
        {
            try
            {
                if (DB.Clients.Where(a => a.Email == username).First() != null)
                {
                    Client client = DB.Clients.Where(a => a.Email == username).First();
                    return BCrypt.Net.BCrypt.Verify(password, client.Password);
                    
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        bool ValidateAdm(string username, string password)
        {
            try
            {
                if (DB.Employees.Where(a => a.Phonenumber == username).First() != null)
                {
                    Employee client = DB.Employees.Where(a => a.Phonenumber == username).First();
                    if (BCrypt.Net.BCrypt.Verify(password, client.Password))
                    {
                        return true;
                    }
                    else
                        return false;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [HttpPost("login")]
        public IActionResult Login([FromForm] string username, [FromForm] string password)
        {
            bool isValid = ValidateUser(username, password);

            if (isValid)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes("YhCWnglZieuMUnuxTrAyiUcE4TdL4HqBIxjCO3uD3dM"); // Замените на свой секретный ключ
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Email, username),
                new Claim(ClaimTypes.Name,DB.Clients.Where(a => a.Email == username).First().Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30), // Время истечения токена
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new { tokenString });
            }

            return Unauthorized();
        }
        [HttpPost("loginadm")]
        public IActionResult LoginAdm([FromForm] string username, [FromForm] string password)
        {
            bool isValid = ValidateAdm(username, password);

            if (isValid)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes("YhCWnglZieuMUnuxTrAyiUcE4TdL4HqBIxjCO3uD3dM"); // Замените на свой секретный ключ
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Email, username),
                        new Claim(ClaimTypes.Name, DB.Employees.Where(a => a.Phonenumber == username).First().Id.ToString()),
                        new Claim(ClaimTypes.Actor, DB.Employees.Where(a => a.Phonenumber == username).First().Post)
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30), // Время истечения токена
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new { tokenString });
            }

            return Unauthorized();
        }

        [HttpPost("token")]
        public object ValidateToken([FromHeader] string token)
        {
            token = token.Substring(6);
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "practice", // Замените на свои значения
                ValidAudience = "customs", // Замените на свои значения
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YhCWnglZieuMUnuxTrAyiUcE4TdL4HqBIxjCO3uD3dM")) // Замените на свой секретный ключ
            };
            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);
                try
                {
                    var decodedToken = tokenHandler.ReadJwtToken(token);
                    var role = decodedToken.Claims.First(a => a.Type == "actort")?.Value;
                    return Tuple.Create(true, true);
                }
                catch
                {
                    return Tuple.Create(true, false);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Tuple.Create(false, false);
            }
        }
        [HttpPost("user")]
        public Client GetUser([FromHeader] string token)
        {
            try
            {
                token = token.Substring(6);
                var tokenHandler = new JwtSecurityTokenHandler();
                var decodedToken = tokenHandler.ReadJwtToken(token);
                int id = Convert.ToInt32(decodedToken.Claims.First(a => a.Type == "name").Value);
                return DB.Clients.Where(a => a.Id == id).Include(a => a.Requests).ThenInclude(b => b.StatusNavigation).First();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}
