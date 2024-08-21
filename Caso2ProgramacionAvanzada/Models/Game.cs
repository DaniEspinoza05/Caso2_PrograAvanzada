using System;
using System.Collections.Generic;

namespace Caso2ProgramacionAvanzada.Models
{
    public class Game
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Winner { get; set; }

        // Relación uno-a-muchos
        public ICollection<Player> Players { get; set; } = new List<Player>();
    }
}
