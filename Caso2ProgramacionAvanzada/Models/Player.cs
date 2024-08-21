using System;

namespace Caso2ProgramacionAvanzada.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Color { get; set; }

        // Clave foránea
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
