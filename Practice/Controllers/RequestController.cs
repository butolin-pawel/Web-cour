using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Practice.DTO;
using ServiceClass.Models;
using System.Net;
using System.Net.Mail;

namespace Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        ServDbContext DB = new ServDbContext();
        [HttpPost]
        public void Save([FromBody] ReqDTO request)
        {


            request.Enddate = countEndTime(request.stdate, request.radius, request.type);
            DB.Requests.Add(ConvertDto(request));
            DB.SaveChanges();
            int id = DB.Requests.OrderBy(a => a.Id).Last().Id;
            List<CartServiceDTO> servcart = request.cart_services.ToList();
            foreach (CartServiceDTO csd in servcart
                 )
            {
                CartService cs = new CartService();
                cs.Cost = csd.Cost;
                cs.Serv = csd.Service;
                cs.Request = id;
                DB.CartServices.Add(cs);
            }
            if (request.cart_products != null)
            {
                List<CartProductDTO> prodcart = request.cart_products.ToList();
                foreach (CartProductDTO csd in prodcart
                )
                {
                    ProductRadius pr = DB.ProductRadii.Where(a => a.Id == csd.Productradius).First();
                    pr.Count = pr.Count - csd.Count;
                    DB.ProductRadii.Update(pr);
                    CartProduct cs = new CartProduct();
                    cs.Product = csd.Product;
                    cs.Productradius = csd.Productradius;
                    cs.Cost = csd.Cost;
                    cs.Count = csd.Count;
                    cs.Request = id;
                    DB.CartProducts.Add(cs);
                }
            }
            DB.SaveChanges();
        }
        Request ConvertDto(ReqDTO req)
        {
            Request request = new Request();
            request.stdate = req.stdate;
            request.Status = DB.Statuses.Where(a => a.Status1 == "Создана").First().Id;
            request.Summ = req.summ;
            request.CarType = req.type.Id;
            request.Enddate = req.Enddate;
            request.Client = req.Client;
            request.WheelRadius = req.radius.Id;
            return request;
        }
        DateTime countEndTime(DateTime stdt, WheelRadius rs, CarType ty)
        {
            DateTime enddate = stdt;
            double minutes = 15;

            byte wheelcnt = 4;
            if (ty.Id != DB.CarTypes.Where(a => a.Type == "Легковой").First().Id)
            {
                enddate = enddate.AddMinutes(20);
                if (ty.Id == DB.CarTypes.Where(a => a.Type == "Прицеп").First().Id)
                {
                    wheelcnt = 2;
                }
            }
            int rad = Convert.ToInt32(rs.Radius.Substring(0, 2));
            for (int i = rad; i > 15; i--)
            {
                minutes *= 1.4;
            }
            enddate = enddate.AddMinutes((long)Math.Ceiling(minutes * wheelcnt));
            return enddate;
        }

        [HttpPost("pay")]
        public void Pay([FromBody] int id)
        {
            Request request = DB.Requests.Where(a => a.Id == id).Include(a => a.CartProducts).ThenInclude(b => b.ProductNavigation).Include(a => a.CartServices).ThenInclude(b => b.ServNavigation).First();
            string to = DB.Clients.Where(a => a.Id == request.Client).First().Email;
            string subject = "Чек оплаты";
            string text = "Ваш чек по заказу №" + request.Id + "\nСодержание заказа\n";
            List<CartService> lcs = DB.CartServices.Where(a => a.Request == request.Id).Include(b => b.ServNavigation).ToList();
            foreach (CartService cs in lcs)
            {
                text += cs.ServNavigation.Name + " " + cs.Cost + "руб.\n";
            }

            List<CartProduct> lcp = DB.CartProducts.Where(a => a.Request == request.Id).Include(b => b.ProductNavigation).ToList();
            foreach (CartProduct cs in lcp)
            {
                text += cs.ProductNavigation.Name + " " + cs.ProductNavigation.Maker + " " + DB.ProductRadii.Where(a => a.Id == cs.Productradius).Include(b => b.RadiusNavigation).First().RadiusNavigation.Radius + " " + cs.Count + "шт. " + " " + cs.Cost + "руб.\n";
            }

            text += "Дата оплаты " + DateTime.Now.Day + " " + DateTime.Now.Month + " " + DateTime.Now.Year + "\n";
            text += "Итоговая сумма " + request.Summ + "руб.\n";
            text += "С уважением команда YDDYcustoms";
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("yddycustomservice@gmail.com");
            mail.To.Add(to);
            mail.Subject = subject;
            mail.Body = text;

            // Настройка клиента SMTP
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.Credentials = new NetworkCredential("yddycustomservice@gmail.com", "gqefzfwfmbroexgu");

            try
            {
                smtpClient.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Ошибка при отправке письма: " + ex.Message);
            }

            mail.Dispose();
            smtpClient.Dispose();
            request.Status = DB.Statuses.Where(a => a.Status1 == "Оплачена").First().Id;
            DB.Requests.Update(request);
            DB.SaveChanges();
        }
        [HttpPut("cancel")]
        public void Cancel([FromBody] int id)
        {
            Request request = DB.Requests.Where(a => a.Id == id).First();
            if (request.CartProducts != null)
            {
                List<CartProduct> prodcart = request.CartProducts.ToList();
                foreach (CartProduct cs in prodcart
                )
                {
                    ProductRadius pr = DB.ProductRadii.Where(a => a.Id == cs.Productradius).First();
                    pr.Count = (pr.Count + cs.Count);
                    DB.ProductRadii.Update(pr);
                }
            }
            DB.Requests.Remove(request);
            DB.SaveChanges();
        }
        [HttpPost("client")]
        public IEnumerable<Request> ByClient([FromBody] int id)
        {
            return DB.Requests.Where(a => a.Client == id).Include(b => b.WheelRadiusNavigation).Include(c => c.CarTypeNavigation).Include(d => d.StatusNavigation).Include(e => e.CartProducts).ThenInclude(b => b.ProductNavigation).Include(f => f.CartServices).ThenInclude(g => g.ServNavigation).IgnoreAutoIncludes().OrderBy(a => a.Id).ToList();
        }
        [HttpPost("times")]
        public List<List<DateTime>> timing([FromBody] DateTime dt)
        {
            List<List<DateTime>> times = new List<List<DateTime>>();
            foreach (Request req in DB.Requests.Where(a => a.stdate > dt && a.stdate.ToLocalTime() < dt.AddDays(3)))
            {
                List<DateTime> tp = new List<DateTime>();
                tp.Add(req.stdate);
                tp.Add(req.Enddate);
                times.Add(tp);
            }
            return times;
        }

        [HttpGet("future")]
        public ICollection<Request> FutureRequest()
        {
            return DB.Requests.Where(a => a.Status == 1 || a.Status == 2).Include(e => e.ClientNavigation).Include(b => b.WheelRadiusNavigation).Include(c => c.CarTypeNavigation).Include(d => d.StatusNavigation).Include(e => e.CartProducts).ThenInclude(b => b.ProductNavigation).Include(f => f.CartServices).ThenInclude(g => g.ServNavigation).IgnoreAutoIncludes().ToList();
        }

        [HttpGet("finish")]
        public ICollection<Request> FinishRequest()
        {
            return DB.Requests.Where(a => a.Status == 3).Include(e => e.ClientNavigation).Include(b => b.WheelRadiusNavigation).Include(c => c.CarTypeNavigation).Include(d => d.StatusNavigation).Include(e => e.CartProducts).ThenInclude(b => b.ProductNavigation).Include(f => f.CartServices).ThenInclude(g => g.ServNavigation).IgnoreAutoIncludes().ToList();
        }
        [HttpPut]
        public void Accept([FromBody] int id)
        {
            Request req = DB.Requests.Where(a => a.Id == id).First();
            req.Status = 3;
            DB.Requests.Update(req);
            DB.SaveChanges();
        }
    }

}
