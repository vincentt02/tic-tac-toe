let turn = 0;

const gameBoard = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  const clearArray = () => {
    for (let i = 0; i < gameBoardArray.length; i++) {
      gameBoardArray[i] = "";
    }
  };

  const markTile = (pos, marker) => {
    if (gameBoardArray[pos] == "") {
      gameBoardArray[pos] = marker;
      displayController.updateDisplay();
      if (checkWin()) {
        winHandler();
        return;
      }
      turn = turn == 0 ? 1 : 0;
      displayController.updateCurrentTurn();
    }
  };

  const checkWin = () => {
    const possibleWins = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < possibleWins.length; i++) {
      let a = possibleWins[i][0];
      let b = possibleWins[i][1];
      let c = possibleWins[i][2];

      if (
        (gameBoard.gameBoardArray[a] != "",
        gameBoard.gameBoardArray[b] != "",
        gameBoard.gameBoardArray[c] != "") &&
        gameBoard.gameBoardArray[a] == gameBoard.gameBoardArray[b] &&
        gameBoard.gameBoardArray[b] == gameBoard.gameBoardArray[c]
      ) {
        return true;
      }
    }
  };

  const winHandler = () => {
    if (turn == 0) {
      console.log("x wins");
    } else {
      console.log("o wins");
    }
  };

  return { gameBoardArray, clearArray, markTile };
})();

const displayController = (() => {
  const xSymbolDiv = document.getElementById("xSymbol");
  const oSymbolDiv = document.getElementById("oSymbol");
  let player1Name = document.getElementById("player1").innerHTML;
  let player2Name = document.getElementById("player2").innerHTML;

  let tiles = [];
  for (let i = 0; i < 9; i++) {
    tiles[i] = document.getElementById(i);
  }

  const updateDisplay = () => {
    for (let i = 0; i < 9; i++) {
      tiles[i].innerHTML = gameBoard.gameBoardArray[i];
    }
  };

  const updateCurrentTurn = () => {
    if (turn == 0) {
      xSymbolDiv.classList.add("currentTurn");
      oSymbolDiv.classList.remove("currentTurn");
    } else {
      oSymbolDiv.classList.add("currentTurn");
      xSymbolDiv.classList.remove("currentTurn");
    }
  };

  const updateNameDisplay = () => {
    document.getElementById("player1").innerHTML = player1.getName();
    document.getElementById("player2").innerHTML = player2.getName();
  };

  return { updateDisplay, updateCurrentTurn, updateNameDisplay };
})();

const player = (name, marker) => {
  const getName = () => {
    return name;
  };

  const tilePress = (pos) => {
    gameBoard.markTile(pos, marker);
  };

  const changeName = (newName) => {
    name = newName;
  };

  return { getName, marker, tilePress, changeName };
};

const tileClick = (e) => {
  if (turn == 0) {
    player1.tilePress(e.target.id);
  } else if (turn == 1) {
    player2.tilePress(e.target.id);
  }
};

const player1 = player("Player 1", "x");
const player2 = player("Player 2", "o");

document.querySelectorAll(".boardTile").forEach((item) => {
  item.addEventListener("click", tileClick);
});

const restartBtn = () => {
  turn = 0;
  gameBoard.clearArray();
  displayController.updateDisplay();
  displayController.updateCurrentTurn();
};

const player1_nameChange = () => {
  document.getElementById("newName1").value = player1.getName();

  const closeWindow = () => {
    document.getElementById("changeNameWindow1").style.display = "none";
  };

  const submitName = () => {
    let newName = document.getElementById("newName1").value;
    if (newName.length < 1) {
      return;
    }
    player1.changeName(newName);
    displayController.updateNameDisplay();

    document.getElementById("changeNameWindow1").style.display = "none";
  };
  document.getElementById("submitName1").addEventListener("click", submitName);
  document
    .getElementById("closeButton1")
    .addEventListener("click", closeWindow);
  document.getElementById("changeNameWindow1").style.display = "grid";
};

const player2_nameChange = () => {
  document.getElementById("newName2").value = player2.getName();

  const closeWindow = () => {
    document.getElementById("changeNameWindow2").style.display = "none";
  };

  const submitName = () => {
    let newName = document.getElementById("newName2").value;
    if (newName.length < 1) {
      return;
    }
    player2.changeName(newName);
    displayController.updateNameDisplay();

    document.getElementById("changeNameWindow2").style.display = "none";
  };
  document.getElementById("submitName2").addEventListener("click", submitName);
  document
    .getElementById("closeButton2")
    .addEventListener("click", closeWindow);
  document.getElementById("changeNameWindow2").style.display = "grid";
};

document
  .getElementById("player1")
  .addEventListener("click", player1_nameChange);

document
  .getElementById("player2")
  .addEventListener("click", player2_nameChange);

displayController.updateDisplay();
displayController.updateCurrentTurn();
