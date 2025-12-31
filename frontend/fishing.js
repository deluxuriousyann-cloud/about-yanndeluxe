let loadedContent = false;

window.addEventListener('DOMContentLoaded', () => {
    loadedContent = true;
});


const button = document.querySelector('.fishButton');
const inventory = document.querySelector('.inventory');
const fishIndex = document.querySelector('.fishIndex');
const display = document.querySelector('.messageUser');
const displayTime = document.querySelector('.headersText');
const balance = document.querySelector('.balance');
const throwRod = document.getElementById('throwRod');
const reeled = document.getElementById('reeled');
const Legendary = document.getElementById('Legendary');
const shop = document.querySelector('.Shop');

let shopShown = false;
let isFishing = false;
let fishValue = '';
let timeToCatch = 5;
let clickButton = '';
let totalBalance = 0;
let fishCaught = null;
let cooldown = false;
let cooldownStarted = false;
let cooldownTime = 3;
let spamLines = [
    `spam the fish button before it gets away!`,
    `you caught a big fish, click before its gone!`
]
let fishes = [
    {
        name: 'Tuna',
        rarity: 'Rare',
        price: 1200
    },
    {
        name: 'Salmon',
        rarity: 'Common',
        price: 300
    },
    {
        name: 'Cod',
        rarity: 'Common',
        price: 200
    },
    {
        name: 'Trout',
        rarity: 'Uncommon',
        price: 450
    },
    {
        name: 'Mackerel',
        rarity: 'Common',
        price: 250
    },
    {
        name: 'Swordfish',
        rarity: 'Epic',
        price: 2500
    },
    {
        name: 'Shark',
        rarity: 'Legendary',
        price: 5000
    },
    {
        name: 'Golden Carp',
        rarity: 'Legendary',
        price: 8000
    },
    {
        name: 'Anglerfish',
        rarity: 'Epic',
        price: 2200
    },
    {
        name: 'Pufferfish',
        rarity: 'Uncommon',
        price: 400
    }
];

function reduceClicks() {
    if (clickButton > 0) {
        clickButton--;
        display.textContent = `${clickButton} more clicks!`
    } else {
        fishCaught = fishes[Math.floor(Math.random() * fishes.length)];
        let priceRange = fishCaught.price * 0.2;
        fishValue = Math.floor(Math.random() * priceRange * 3 + priceRange);
        display.textContent = `you caught a ${fishCaught.rarity} ${fishCaught.name}, worth $${fishValue}!`;
        if (fishCaught.rarity == 'Legendary') {
            Legendary.play();
        } else {
            reeled.play();
        }
        cooldown = true;
        isFishing = false;

        if (!totalBalance) {
            totalBalance = fishValue;
            balance.textContent = '$' + totalBalance;
        } else {
            totalBalance += fishValue;
            balance.textContent = '$' + totalBalance;
        }
    }
}

button.addEventListener('click', () => {
    if (cooldown) {

        if (cooldownStarted) return;
        cooldownStarted = true;
        const cooldownLeft = setInterval(() => {
            display.textContent = `button is on cooldown for ${cooldownTime}s`;
            console.log(cooldownTime, `cooldown started: ${cooldownStarted}`);
            cooldownTime--;

            if (cooldownTime < 0) {
            clearInterval(cooldownLeft);
            cooldown = false;
            cooldownStarted = false;
            cooldownTime = 3;
            display.textContent = 'Start fishing again!'
            console.log('cooldown ended')
            }
        }, 1000)
        return;
    }
    if (isFishing) return reduceClicks();
    if (!loadedContent) return;

    throwRod.play();
    clickButton = Math.floor(Math.random() * 10);
    displayLines = Math.floor(Math.random() * spamLines.length);
    display.textContent = spamLines[displayLines] + ` Click ${clickButton} times`;
    button.classList.add('fishButtonClicked');
    setTimeout(() => {
        button.classList.remove('fishButtonClicked');
    }, 100)

    const timeLeft = setInterval(() => {
        displayTime.textContent = `${timeToCatch} seconds left.`;
        timeToCatch--;

        if (!isFishing) {
            clearInterval(timeLeft);
            displayTime.textContent = 'Lucky Catch!';
        };

        if (timeToCatch < 0) {
            clearInterval(timeLeft);
            timeToCatch = 5;

            setTimeout(() => {
                displayTime.textContent = `time has ran out`;
                isFishing = false;
            }, 1000)
        }
    }, 1000)

    isFishing = true;
});

inventory.addEventListener('click', () => {
    if (shopShown) {
        shop.style.opacity = 0;
        shopShown = false;
        return;
    }
    shop.style.opacity = 30 + `%`;
    shopShown = true;
})
