const board = document.getElementById("board");
const modal = document.getElementById("myModal");
const winnerMessage = document.getElementById("winnerMessage");
const playAgainButton = document.getElementById("playAgainButton");

let currentPlayer = "X";
let winner = null;

const cells = Array.from({ length: 9 }, (_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
    return cell;
});

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (cells[index].textContent || winner) return;

    cells[index].textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            winner = cells[a].textContent;
            winnerMessage.textContent = `Player ${winner} wins!`;
            showModal();
            return;
        }
    }
    if (!cells.some(cell => !cell.textContent)) {
        winnerMessage.textContent = "It's a draw!";
        showModal();
    }
}

function showModal() {
    modal.style.display = "block";
}

playAgainButton.addEventListener("click", () => {
    modal.style.display = "none";
    resetGame();
});

function resetGame() {
    currentPlayer = "X";
    winner = null;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "white"; // Reset background color to white
    });
    winnerMessage.textContent = "";
}
