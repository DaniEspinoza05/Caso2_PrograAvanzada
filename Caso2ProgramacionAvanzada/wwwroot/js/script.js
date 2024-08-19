$(document).ready(function () {
    const rows = 6;
    const cols = 7;
    let currentPlayer;
    let playerColor;
    let opponentColor;
    let board = Array(rows).fill(null).map(() => Array(cols).fill(null));

    // Preguntar al jugador qué color quiere ser
    function askPlayerColor() {
        playerColor = prompt("Elige tu color: 'red' o 'yellow'").toLowerCase();
        while (playerColor !== 'red' && playerColor !== 'yellow') {
            playerColor = prompt("Color inválido. Por favor, elige 'red' o 'yellow'").toLowerCase();
        }
        opponentColor = playerColor === 'red' ? 'yellow' : 'red';
        currentPlayer = playerColor;
        console.log(`El jugador ha elegido ${playerColor}. El oponente será ${opponentColor}.`);
    }

    // Crear el tablero
    function createBoard() {
        console.log("Creando el tablero...");
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                console.log(`Creando celda en fila ${row}, columna ${col}`);
                $('#gameBoard').append(`<div class="cell" data-row="${row}" data-col="${col}"></div>`);
            }
        }
        console.log("Tablero creado con éxito.");
    }

    // Delegación de eventos para manejar clics en las celdas
    $('#gameBoard').on('click', '.cell', function () {
        let col = $(this).data('col');
        let row = findEmptyRow(col);
        console.log(`Clic detectado en columna ${col}. Fila vacía encontrada: ${row}`);

        if (row === -1) {
            console.log("Columna llena, no se puede colocar más fichas aquí.");
            return;
        }

        board[row][col] = currentPlayer;
        console.log(`Colocando ${currentPlayer} en fila ${row}, columna ${col}`);
        $(`.cell[data-row=${row}][data-col=${col}]`).addClass(currentPlayer);

        if (checkWinner(row, col)) {
            console.log(`${currentPlayer.toUpperCase()} ha ganado!`);
            alert(`${currentPlayer.toUpperCase()} ha ganado!`);
            resetGame();
            return;
        }

        currentPlayer = currentPlayer === playerColor ? opponentColor : playerColor;
        console.log(`Cambio de turno. Ahora juega ${currentPlayer}`);
    });

    // Encontrar la primera fila vacía en una columna
    function findEmptyRow(col) {
        console.log(`Buscando fila vacía en la columna ${col}...`);
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col]) {
                console.log(`Fila vacía encontrada en la fila ${row}`);
                return row;
            }
        }
        console.log("No se encontró ninguna fila vacía.");
        return -1;
    }

    // Verificar si hay un ganador
    function checkWinner(row, col) {
        console.log(`Verificando si hay un ganador después de la jugada en fila ${row}, columna ${col}...`);
        let isWinner = checkDirection(row, col, 1, 0) || // Horizontal
            checkDirection(row, col, 0, 1) || // Vertical
            checkDirection(row, col, 1, 1) || // Diagonal \
            checkDirection(row, col, 1, -1);  // Diagonal /
        if (isWinner) {
            console.log("¡Hay un ganador!");
        } else {
            console.log("No hay ganador todavía.");
        }
        return isWinner;
    }

    // Verificar en una dirección
    function checkDirection(row, col, rowDir, colDir) {
        let count = 1;
        count += checkLine(row, col, rowDir, colDir);
        count += checkLine(row, col, -rowDir, -colDir);
        console.log(`Verificando dirección (${rowDir}, ${colDir}). Fichas consecutivas: ${count}`);
        return count >= 4;
    }

    // Verificar una línea en una dirección
    function checkLine(row, col, rowDir, colDir) {
        let r = row + rowDir;
        let c = col + colDir;
        let count = 0;

        while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }
        console.log(`Línea verificada. Fichas encontradas: ${count}`);
        return count;
    }

    // Reiniciar el juego
    function resetGame() {
        console.log("Reiniciando el juego...");
        board = Array(rows).fill(null).map(() => Array(cols).fill(null));
        $('.cell').removeClass('red yellow');
        currentPlayer = playerColor;
        console.log("Juego reiniciado.");
    }

    // Inicializar el juego
    askPlayerColor(); // Pregunta el color al jugador
    createBoard();    // Crea el tablero
});
