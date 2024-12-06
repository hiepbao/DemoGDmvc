using Microsoft.AspNetCore.Mvc;

namespace DemoGDMVC.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
