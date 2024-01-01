document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const resultElement = document.getElementById('result');
  const cells = document.querySelectorAll('.cell');

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameBoard[cellIndex] === '' && gameActive) {
      gameBoard[cellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;

      if (checkWinner()) {
        resultElement.textContent = `${currentPlayer} wins!`;
        gameActive = false;
      } else if (isBoardFull()) {
        resultElement.textContent = "It's a tie!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        highlightWinnerCells(combination);
        return true;
      }
    }

    return false;
  }

  function highlightWinnerCells(combination) {
    for (const index of combination) {
      cells[index].style.backgroundColor = '#90EE90';
    }
  }

  function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
  }

  function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    resultElement.textContent = '';
    cells.forEach(cell => {
      cell.textContent = '';
      cell.style.backgroundColor = '#fff';
    });
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
});
