const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guesses = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".box_container img");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".play-again");

let currentWord;
let wrongGuesscount;
correctLetters = [];

const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuesscount = 0;
  hangmanImage.src = `../images/hangman-${wrongGuesscount}.svg`;
  guesses.innerText = `${wrongGuesscount} / ${maxGuesses}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word : `
      : `The correct word was : `;
    gameModal.querySelector("img").src = `../images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congratulations !" : "You loose !"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}<b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  //   console.log(button, clickedLetter);
  if (currentWord.includes(clickedLetter)) {
    // console.log(clickedLetter, "exist in the world");
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // console.log(clickedLetter, "does not exist in the world");
    wrongGuesscount++;
    hangmanImage.src = `../images/hangman-${wrongGuesscount}.svg`;
  }
  button.disabled = true;
  guesses.innerText = `${wrongGuesscount} / ${maxGuesses}`;

  if (wrongGuesscount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);
