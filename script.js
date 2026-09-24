const NUM_SWATCHES = 6;

const targetCodeEl = document.getElementById('targetCode');
const swatchesEl = document.getElementById('swatches');
const feedbackEl = document.getElementById('feedback');
const statCorrectEl = document.getElementById('statCorrect');
const statAttemptsEl = document.getElementById('statAttempts');
const statRoundEl = document.getElementById('statRound');

let correctIndex = null;
let correctGuesses = 0;
let attempts = 0;
let round = 1;
let roundSolved = false;

function randomColor() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  };
}

function colorToCss(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

function newRound() {
  roundSolved = false;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  const correctColor = randomColor();
  correctIndex = Math.floor(Math.random() * NUM_SWATCHES);

  targetCodeEl.textContent = colorToCss(correctColor);

  swatchesEl.innerHTML = '';

  for (let i = 0; i < NUM_SWATCHES; i++) {
    const color = (i === correctIndex) ? correctColor : randomColor();

    const div = document.createElement('div');
    div.className = 'swatch';
    div.style.backgroundColor = colorToCss(color);

    div.addEventListener('click', () => handleGuess(div, i));

    swatchesEl.appendChild(div);
  }
}

function handleGuess(element, index) {
  if (roundSolved) return;

  attempts++;
  statAttemptsEl.textContent = attempts;

  if (index === correctIndex) {
    correctGuesses++;
    roundSolved = true;
    element.classList.add('correct');
    feedbackEl.textContent = 'Korrekt! Starter en ny runde...';
    feedbackEl.className = 'feedback correct-text';
    statCorrectEl.textContent = correctGuesses;

    setTimeout(() => {
      round++;
      statRoundEl.textContent = round;
      newRound();
    }, 900);
  } else {
    feedbackEl.textContent = 'Forkert, prøv igen.';
    feedbackEl.className = 'feedback wrong-text';
    element.classList.add('hidden');
  }
}

newRound();