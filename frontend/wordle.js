const boxes = document.querySelectorAll('.box');
const display = document.querySelector('.message');

let wordToGuess = 'HELLO'; // or pick randomly from a list
let guess = '';
let currentRow = 0; // row index, 0-5
let currentCol = 0; // column index, 0-4

const allowedWords = /^[a-z]$/i;


document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();

    if (key === 'ENTER') {
        if (currentCol !== 5) {
            display.textContent = 'Complete the word first!';
            return;
        }
        submitEntry();
        return;
    }

    if (key === 'BACKSPACE') {
        if (currentCol === 0) return;
        currentCol--;
        guess = guess.slice(0, -1);
        const boxIndex = currentRow * 5 + currentCol;
        boxes[boxIndex].textContent = '';
        return;
    }

    if (!allowedWords.test(key)) return;
    if (currentCol >= 5) return;

    // Add letter to guess
    const boxIndex = currentRow * 5 + currentCol;
    boxes[boxIndex].textContent = key;
    guess += key;
    currentCol++;
});

function submitEntry() {
    const guessArr = guess.split('');
    const targetArr = wordToGuess.split('');

    const result = Array(5).fill('');
    const used = Array(5).fill(false);

    // PASS 1: Correct letter & position
    for (let i = 0; i < 5; i++) {
        if (guessArr[i] === targetArr[i]) {
            result[i] = 'green';
            used[i] = true;
        }
    }

    // PASS 2: Correct letter, wrong position
    for (let i = 0; i < 5; i++) {
        if (result[i]) continue; // skip already green

        for (let j = 0; j < 5; j++) {
            if (used[j]) continue;

            if (guessArr[i] === targetArr[j]) {
                result[i] = 'yellow';
                used[j] = true; // mark letter as used
                break;
            }
        }
    }

    // PASS 3: Remaining letters are wrong
    for (let i = 0; i < 5; i++) {
        if (!result[i]) result[i] = 'gray';
    }

    // Update boxes visually
    for (let i = 0; i < 5; i++) {
        const boxIndex = currentRow * 5 + i;
        boxes[boxIndex].classList.add(result[i]);
        boxes[boxIndex].textContent = guessArr[i]; // optional, to ensure letters are displayed
    }

    // Reset guess for next row
    guess = '';
    currentRow++;
    currentCol = 0;

    // Optional: check for win
    if (result.every(color => color === 'green')) {
        display.textContent = 'You won!';
    } else if (currentRow === 6) {
        display.textContent = `Game over! The word was ${wordToGuess}`;
    }
}
