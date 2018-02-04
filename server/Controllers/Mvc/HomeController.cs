using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Server.Controllers.Mvc
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfiguration _config;
        public HomeController(IHostingEnvironment env, IConfiguration config)
        {
            _env = env;
            _config = config;
        }

        [HttpGet]
        public IActionResult Index()
        {
            if(_env.IsDevelopment())
                return Redirect(_config["appEndpoint"]);
            return File("~/index.html", "text/html");
        }
    }
}
