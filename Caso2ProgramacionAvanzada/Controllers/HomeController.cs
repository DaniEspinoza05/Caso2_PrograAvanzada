using Caso2ProgramacionAvanzada.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Caso2ProgramacionAvanzada.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }


    public IActionResult Historial()
    {
        var juegos = _context.Games.Include(g => g.Players).ToList();
        return View(juegos);
    }


    public IActionResult Juego()
    {
        return View();
    }

    [HttpPost]
    public IActionResult GuardarResultado(string ganador, string jugador1, string color1, string jugador2, string color2)
    {
        var game = new Game
        {
            StartTime = DateTime.Now, // Podría registrar el tiempo de inicio real
            EndTime = DateTime.Now, // Podría registrar el tiempo de finalización real
            Winner = ganador,
            Players = new List<Player>
            {
                new Player { Username = jugador1, Color = color1 },
                new Player { Username = jugador2, Color = color2 }
            }
        };

        _context.Games.Add(game);
        _context.SaveChanges();

        return RedirectToAction("Index");
    }
}
