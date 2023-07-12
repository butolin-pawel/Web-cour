using Newtonsoft.Json;
using ServiceClass.Models;

namespace Practice.DTO
{
    public class ReqDTO
    {
        public int Id { get; set; }

        public int Client { get; set; }

        public DateTime stdate { get; set; }

        public DateTime Enddate { get; set; }

        public decimal? summ { get; set; }

        public CarType type { get; set; }

        public WheelRadius radius { get; set; }

        public List<CartProductDTO> cart_products { get; set; } = new List<CartProductDTO>();

        public List<CartServiceDTO> cart_services { get; set; } = new List<CartServiceDTO>();

    }
}
