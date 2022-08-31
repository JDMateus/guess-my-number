'use strict';

const againBtn = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const body = document.querySelector('body');
const number = document.querySelector('.number');
const input = document.querySelector('.guess');
const randomNumber = () => Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highscore = 0;
let secretNumber = randomNumber();

const updateMessage = text => {
  document.querySelector('.message').textContent = text;
};

const updateScore = score => {
  document.querySelector('.score').textContent = score;
};

const playerWins = guess => {
  updateMessage('🎉 Correct Number!');
  body.style.backgroundColor = '#60b347';
  number.style.width = '30rem';
  number.textContent = guess;
  checkBtn.disabled = true;
  input.disabled = true;
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
};

const wrongNumber = guess => {
  updateMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
  score--;
  updateScore(score);
  if (score < 1) {
    updateMessage('💥 You lost the game!');
    number.textContent = '☠';
    body.style.backgroundColor = '#800000';
    checkBtn.disabled = true;
    input.disabled = true;
  }
};
//Game core
checkBtn.addEventListener('click', () => {
  const guess = Number(input.value);
  if (guess) {
    //When player wins
    if (guess === secretNumber) {
      playerWins(guess);
      //When guess is wrong
    } else {
      wrongNumber(guess);
    }
    //When no input
  } else {
    updateMessage('⛔ No number!');
  }
});
//Reset game
againBtn.addEventListener('click', () => {
  secretNumber = randomNumber();
  score = 20;
  updateScore(score);
  updateMessage('Start guessing...');
  number.style.width = '15rem';
  number.textContent = '?';
  input.value = '';
  body.style.backgroundColor = '#222';
  checkBtn.disabled = false;
  input.disabled = false;
});