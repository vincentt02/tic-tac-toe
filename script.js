const gameBoard = (() => {
  let gameBoardArray = ["x", "", "o", "", "", "", "", "", ""];
  return { gameBoardArray };
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

let turn = 0;

const player = (name, marker) => {
  const tilePress = () => {
    console.log(marker);
  };
  return { name, marker, tilePress };
};

const player1 = player("bob", "x");
const player2 = player("joe", "o");

const tileClick = () => {
  if (turn == 0) {
    player1.tilePress();
  } else if (turn == 1) {
    player2.tilePress();
  }
  turn = turn == 0 ? 1 : 0;
};

document.querySelectorAll(".boardTile").forEach((item) => {
  item.addEventListener("click", tileClick);
});

displayController.updateDisplay();
