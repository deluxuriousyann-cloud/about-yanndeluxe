const bird = document.querySelector('.bird');
const pipe = document.querySelector('.pipe');
const text = document.querySelector('.text');
const body = document.querySelector('body');

let birdPosition = bird.getBoundingClientRect();
let pipePosition = pipe.getBoundingClientRect();
const birdY = birdPosition.y;
const birdX = birdPosition.x;
let pipeSpawned = '';
let newPos = 0;
let pipeX = 0;
let totalHeight = 0;
let isOnCooldown = false;
let hasJumped = false;

const randomPipe = setInterval(() => {
    const newPipe = document.createElement('div');
    pipeSpawned = newPipe;
    newPipe.classList.add('pipeR');
    newPipe.classList.add('pipe');

    const pipePos = ['bottom', 'top']
    const randomPos = Math.floor(Math.random() * pipePos.length)
    const pipeHeight = Math.random() * (400 - 200) + 200;
    console.log(`pipe spawned: position ${pipePos[randomPos]}, height ${pipeHeight}`)

    let newPipePosY = '';

    if (randomPos == 'bottom') {
        newPipe.style.bottom = 0;
        newPipePosY = 'bottom';
    } else {
        newPipe.style.top = 0;
        newPipePosY = 'top';
    }

    newPipe.style.right = 0 + 'px';
    newPipe.style.height = `${pipeHeight}px`;
    console.log(randomPos)
    
    body.appendChild(newPipe)
}, 5000)

const loop = setInterval(() => {
    pipeX -= 5;
    pipe.style.transform = `translateX(${pipeX}px)`;

    if (hasJumped) return;
    newPos += 1;
    bird.style.transform = `translateY(${newPos}px)`;

    const birdPosition = bird.getBoundingClientRect();
    const pipePosition = pipe.getBoundingClientRect();

    if (isColliding(pipePosition, birdPosition)) return gameOver();
    console.log('not colliding')
    
}, 50)

function gameOver() {
    clearInterval(loop);
    text.textContent = 'Game Over';
}

document.addEventListener('keydown', (e) => {
    key = e.key.toLowerCase();

    if (key !== 'arrowup') return console.log('not arrow up');
    if (isOnCooldown) return console.log('on cooldown');

    isOnCooldown = true
    setTimeout(() => {
        isOnCooldown = false;
    }, 900)
    jumpBird();
})

function jumpBird() {
    hasJumped = true;
    let count = 0;
    const jumpHeight = 100; // total pixels to move up
    const interval = setInterval(() => {
        if (count >= jumpHeight) {
            clearInterval(interval);
            return;
        }
        newPos -= 1; // move up
        bird.style.transform = `translateY(${newPos}px)`;
        count++;
    }, 10); // every 10ms

    setTimeout(() => {
        hasJumped = false;
    }, 1000);
}

function isColliding(a, b) {
    return !(
        a.right < b.left ||  // completely to the left
        a.left > b.right ||  // completely to the right
        a.bottom < b.top ||  // completely above
        a.top > b.bottom     // completely below
    );
}

