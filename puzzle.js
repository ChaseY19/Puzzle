var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this; // La pieza que estás arrastrando
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {
    e.preventDefault();
}

function dragDrop() {
    otherTile = this; // La pieza sobre la cual soltaste la anterior
}

function dragEnd() {
    // Si no hay un destino válido o intentas soltar la pieza sobre ella misma, no hacemos nada
    if (!otherTile || currTile === otherTile) {
        otherTile = null;
        return;
    }

    // Intercambiamos las imágenes directamente entre cualquier par de piezas
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    let turnsEl = document.getElementById("turns");
    if (turnsEl) {
        turnsEl.innerText = turns;
    }

    // Comprobamos si el puzzle quedó completo con este movimiento
    checkWin();

    // Limpiamos la referencia
    otherTile = null;
}

function checkWin() {
    let tiles = document.querySelectorAll("#board img");
    let isWin = true;

    for (let tile of tiles) {
        let coords = tile.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        
        // Orden correcto esperado de 1.png hasta 9.png según la posición en la cuadrícula
        let expectedNum = r * 3 + c + 1;

        if (!tile.src.includes(expectedNum + ".png")) {
            isWin = false;
            break;
        }
    }

    if (isWin) {
        setTimeout(() => {
            alert("¡Felicidades!~♡ Tu recompensa es: 32");
        }, 300);
    }
}