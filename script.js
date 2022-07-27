let turn = 0;

const gameBoard = (() => {
  let gameBoardArray = ["", "", "", "", "", "", "", "", ""];

  const markTile = (pos, marker) => {
    if (gameBoardArray[pos] == "") {
      gameBoardArray[pos] = marker;
      displayController.updateDisplay();
      checkWin();
      turn = turn == 0 ? 1 : 0;
    }
  };

  const checkWin = () => {
    // check for vertical wins
    // if (
    //   (gameBoardArray[0] == gameBoardArray[3] &&
    //     gameBoardArray[3] == gameBoardArray[6]) ||
    //   (gameBoardArray[1] == gameBoardArray[4] &&
    //     gameBoardArray[4] == gameBoardArray[7]) ||
    //   (gameBoardArray[2] == gameBoardArray[5] &&
    //     gameBoardArray[5] == gameBoardArray[8])
    // ) {
    //   console.log("vertical win");
    // }

    if (
      ((gameBoardArray[0] != "",
      gameBoardArray[3] != "",
      gameBoardArray[6] != "") &&
        gameBoardArray[0] == gameBoardArray[3] &&
        gameBoardArray[3] == gameBoardArray[6]) ||
      ((gameBoardArray[1] != "",
      gameBoardArray[4] != "",
      gameBoardArray[7] != "") &&
        gameBoardArray[1] == gameBoardArray[4] &&
        gameBoardArray[4] == gameBoardArray[7]) ||
      ((gameBoardArray[2] != "",
      gameBoardArray[5] != "",
      gameBoardArray[8] != "") &&
        gameBoardArray[2] == gameBoardArray[5] &&
        gameBoardArray[5] == gameBoardArray[8])
    ) {
      console.log("VERTICAL WIN");
    }
    // check for horizontal wins
    if (
      ((gameBoardArray[0] != "",
      gameBoardArray[1] != "",
      gameBoardArray[2] != "") &&
        gameBoardArray[0] == gameBoardArray[1] &&
        gameBoardArray[1] == gameBoardArray[2]) ||
      ((gameBoardArray[3] != "",
      gameBoardArray[4] != "",
      gameBoardArray[5] != "") &&
        gameBoardArray[3] == gameBoardArray[4] &&
        gameBoardArray[4] == gameBoardArray[5]) ||
      ((gameBoardArray[6] != "",
      gameBoardArray[7] != "",
      gameBoardArray[8] != "") &&
        gameBoardArray[6] == gameBoardArray[7] &&
        gameBoardArray[7] == gameBoardArray[8])
    ) {
      console.log("HORIZONTAL WIN");
    }
    // check for diagonal wins
    if (
      ((gameBoardArray[0] != "",
      gameBoardArray[4] != "",
      gameBoardArray[8] != "") &&
        gameBoardArray[0] == gameBoardArray[4] &&
        gameBoardArray[4] == gameBoardArray[8]) ||
      ((gameBoardArray[2] != "",
      gameBoardArray[4] != "",
      gameBoardArray[6] != "") &&
        gameBoardArray[2] == gameBoardArray[4] &&
        gameBoardArray[4] == gameBoardArray[6])
    ) {
      console.log("DIAGONAL WIN");
    }
  };

  return { gameBoardArray, markTile };
})();

const displayController = (() => {
  let tiles = [];
  for (let i = 0; i < 9; i++) {
    tiles[i] = document.getElementById(i);
  }

  const updateDisplay = () => {
    for (let i = 0; i < 9; i++) {
      tiles[i].innerHTML = gameBoard.gameBoardArray[i];
    }
  };
  return { updateDisplay };
})();

const player = (name, marker) => {
  const tilePress = (pos) => {
    gameBoard.markTile(pos, marker);
  };
  return { name, marker, tilePress };
};

const player1 = player("bob", "x");
const player2 = player("joe", "o");

const tileClick = (e) => {
  if (turn == 0) {
    player1.tilePress(e.target.id);
  } else if (turn == 1) {
    player2.tilePress(e.target.id);
  }
};

document.querySelectorAll(".boardTile").forEach((item) => {
  item.addEventListener("click", tileClick);
});

displayController.updateDisplay();
