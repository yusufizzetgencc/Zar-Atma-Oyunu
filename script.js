"use strict";

const panelContainer = document.querySelector(".panel-container");
const mainContainer = document.querySelector(".main-container");
const inputText1 = document.querySelector(".input-text-1");
const inputText2 = document.querySelector(".input-text-2");
const startGameBtn = document.querySelector(".start-game-btn");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const name1 = document.getElementById("name--0");
const name2 = document.getElementById("name--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

startGameBtn.addEventListener("click", function () {
  panelContainer.classList.add("hidden");
  mainContainer.classList.remove("hidden");

  name1.innerHTML = inputText1.value || "Oyuncu 1";
  name2.innerHTML = inputText2.value || "Oyuncu 2";
});

const init = function () {
  panelContainer.classList.remove("hidden");
  mainContainer.classList.add("hidden");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Zar atma fonksiyonu
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Rastgele zar oluşturma
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Zarları göster
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;

    // 3. Kontrol
    if (dice !== 1) {
      // Mevcut skora zarı ekle
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Sonraki oyuncuya geç
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Mevcut skoru aktif oyuncunun skoruna ekle
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Oyuncunun puanının >= 50 olup olmadığını kontrol edin
    if (scores[activePlayer] >= 50) {
      // Oyunu bitir
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Bir sonraki oyuncuya geç
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
