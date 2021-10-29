'use strict';
//diagram.net for flowchart of the project

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//starting condition

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player-active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//both works same but get element by id works little bit faster than query selector
//starting conditions
init();

//functionality
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    //1. generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.check for rolled 1 : if true, switch to next player
    if (dice !== 1) {
      //add dice t current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //change later
    } else {
      switchPlayer();
      //switch to next player
      //toggle will remove from one which have and add to that does not have means in simple word from both only one can have that property we can also used contain but toggle is better
    }
  }
});
btnHold.addEventListener('click', function () {
  //1. add current score to active player score
  if (playing == true) {
    scores[activePlayer] += currentScore;
    //score[1] = score[1]+ currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if it value is 1
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //switch to next player
    else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
