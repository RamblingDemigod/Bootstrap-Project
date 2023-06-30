function triggerResetAnimation() {
  var resetButton = document.getElementById('reset');
  resetButton.classList.add('clicked');
  setTimeout(function() {
    resetButton.classList.remove('clicked');
  }, 1000); // Adjust the duration of the animation in milliseconds
}

window.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const gameModeButton = document.querySelector('#game-mode-button');
  const announcer = document.querySelector('.announcer');
    var section = document.querySelector('.display');
    section.addEventListener('click', function() {
      playSound('Sound/bgMusic.wav', true);
    });

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let isGameActive = true;

  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'TIE';

  /*
    Indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
  */

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleResultValidation() {
    let roundWon = false;
    let winningCombo = null; // Store the winning combination

    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        winningCombo = winCondition; // Update the winning combination
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      // Add strikethrough effect to winning tiles
      winningCombo.forEach((index) => {
        tiles[index].classList.add('winning-tile');
      });
      return;
    }

    if (!board.includes('')) {
      announce(TIE);
    }
  }

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'THE AI Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
  };

  const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  }

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  }

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();

      if (currentPlayer === 'O') {
        // AI's turn
        setTimeout(makeAIMove, 500);
      }
    }
  }

  const makeAIMove = () => {
    const emptyTiles = tiles.filter((tile, index) => board[index] === '');

    // Check if AI can win in the next move
    for (let i = 0; i < emptyTiles.length; i++) {
      const tile = emptyTiles[i];
      const index = tiles.indexOf(tile);
      board[index] = currentPlayer;

      if (checkWin(currentPlayer)) {
        userAction(tile, index);
        return;
      }

      board[index] = ''; // Reset the board state
    }

    // Check if the player can win in the next move and block the player
    for (let i = 0; i < emptyTiles.length; i++) {
      const tile = emptyTiles[i];
      const index = tiles.indexOf(tile);
      board[index] = 'X'; // Assume player's move

      if (checkWin('X')) {
        userAction(tile, index);
        return;
      }

      board[index] = ''; // Reset the board state
    }

    // If no immediate winning or blocking move, select a random tile
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const tile = emptyTiles[randomIndex];
    const index = tiles.indexOf(tile);
    userAction(tile, index);
  }

  const checkWin = (player) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  }

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
      changePlayer();
      makeAIMove();
    }

    tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
      tile.classList.remove('winning-tile'); // Remove the winning-tile class
    });

    triggerResetAnimation();
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
  });

  resetButton.addEventListener('click', resetBoard);
  
  gameModeButton.addEventListener('click', () => {
    window.location.href = '../gameIndex1.html'; // Redirect to index1.html when the button is clicked
  });

  // Play the background sound clip
  playSound();
});

            //Load the Game
            function loadGame(mode) {
                if (mode === 'single') {
                    window.location.href = '../HTML1/game1.html';
                } else if (mode === 'two') {
                    window.location.href = '../HTML1/game2.html';
                }
                else if (mode === 'three') {
                  window.location.href = '../index.html';
              }
            }


        //Sound Reference:
        //<audio src="https://freesound.org/people/BloodPixelHero/sounds/620451/" autoplay></audio>
      // Play sound on HTML page
      function playSound(audioName, loop){
        let audio = new Audio(audioName);
        audio.loop = loop;
        audio.play();
      }
      playSound("Sound/bgMusic.wav", true);
      

