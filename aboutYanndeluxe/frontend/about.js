const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('todoShow');
        } else {
            entry.target.classList.remove('todoShow');
        }
    });
}, {});

const toDoElements = document.querySelectorAll('.list');
toDoElements.forEach(el => observer.observe(el));

//

const observer1 = new IntersectionObserver(entries => {
    messageActive = entries[0].isIntersecting;
});

let messageActive = false;
let scrollY = 0;
const boxes = document.querySelectorAll('.box');
const boxes1 = document.querySelectorAll('.box1');
const message1 = document.querySelector('.message1');
if (message1) {
    observer1.observe(message1);
}

function update() {
    scrollY = window.scrollY;

    if (messageActive) {
        const defLetterS = 15;
        const letterS = defLetterS + (-scrollY * 0.03);
        message1.style.letterSpacing = `${letterS}px`;
    }

    boxes.forEach((box, index) => {
        const speed = 0.5 + index * 0.05;
        box.style.transform = `translateX(${200 - scrollY * speed}px)`;
    });

    boxes1.forEach((box1, index) => {
        const speed = 0.5 + index * 0.05;
        const value = -(200 - scrollY * speed);
        box1.style.transform = `translateX(${value}px)`;
    });
    
    

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

//


const searchIcon = document.querySelector('.searchIcon');
const accountIcon = document.querySelector('.accountIcon');
const menuIcon = document.querySelector('.menuIcon');
const searchBar = document.querySelector('.searchBar');

let clickedAgain = false;

if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            if (clickedAgain) return closeSearch();

            searchInput();
            clickedAgain = true;
    });
}

function closeSearch() {
    searchIcon.classList.remove('addBorder');
    menuIcon.classList.remove('moveUpAnimExit');
    accountIcon.classList.remove('moveDownAnimExit');
    searchBar.classList.remove('showSearchBar');
    console.log('clicked');
    clickedAgain = false;
}

function searchInput() {
    searchIcon.classList.add('addBorder');
    menuIcon.classList.add('moveUpAnimExit');
    accountIcon.classList.add('moveDownAnimExit');
    
    accountIcon.addEventListener('animationend', () => {
        searchBar.classList.add('showSearchBar');
    });
    console.log('clicked');
}



//

const usernameInput = document.querySelector('.usernameInput');
const passwordInput = document.querySelector('.passwordInput');
const confirmButton = document.querySelector('.confirmButton');

let usernameFilled = false;
let passwordFilled = false;
let username = '';
let password = '';
let contentLoaded = false;

window.addEventListener('DOMContentLoaded', () => {
    contentLoaded = true;
    console.log(`content loaded: ${contentLoaded}`)
});

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (passwordFilled) return;
    if (usernameFilled) return;
    console.log('Enter detected')
    userData();
});


if (confirmButton) {
    confirmButton.addEventListener('click', async () => {
        if (passwordFilled) return;
        if (usernameFilled) return;
        userData(); 
    });
}

function userData() {
    const usernameIn = usernameInput.value.toLowerCase().trim();
    const passwordIn = passwordInput.value.trim();
    const bannedSymbols = /[+-\/*\=#\$%\^\s]/;
    
    if (!usernameIn) {
        usernameInput.value = '';
        usernameInput.placeholder = 'fill up the username.';
        usernameInput.classList.add('errorAnim');
        setInterval(() => {
            usernameInput.classList.remove('errorAnim');
        }, 3000)
        return;
    }
    if (!passwordIn) {
        passwordInput.value = '';
        passwordInput.placeholder = 'fill up the password.';
        passwordInput.classList.add('errorAnim');
        setInterval(() => {
            passwordInput.classList.remove('errorAnim');
        }, 3000)
        return;
    }
    if (bannedSymbols.test(usernameIn)) {
        usernameInput.value = '';
        usernameInput.placeholder = 'no special characters are allowed.';
        usernameInput.classList.add('errorAnim');
        setInterval(() => {
            usernameInput.classList.remove('errorAnim');
        }, 3000)
        return;
    }
    if (bannedSymbols.test(passwordIn)) {
        passwordInput.value = '';
        passwordInput.placeholder = 'no special characters are allowed.';
        passwordInput.classList.add('errorAnim');
        setInterval(() => {
            passwordInput.classList.remove('errorAnim');
        }, 3000)
        return;
    }
    if (passwordIn == usernameIn) {
        passwordInput.value = '';
        usernameInput.value = '';
        passwordInput.placeholder = 'password matched with username';

        passwordInput.classList.add('errorAnim');
        setInterval(() => {
            passwordInput.classList.remove('errorAnim');
        }, 3000)
        return;
    }

    password = passwordInput.value.trim();
    username = usernameInput.value.toLowerCase().trim();
    usernameFilled = true;
    passwordFilled = true;
    console.log(`saved || username: ${username} || password: ${password}`);
    usernameInput.classList.add('moveLeftAnimExit');
    passwordInput.classList.add('moveRightAnimExit');
    confirmButton.classList.add('moveDownAnimExit');
    document.querySelector('.lineGrey').classList.add('moveRightAnimExit');
    document.querySelector('.content').classList.add('moveUpAnimExit');
    const loadingScreen = document.querySelector('.loadingToHome');
    const loadingIcon = document.querySelector('.loadingIcon');
    loadingScreen.textContent = `hello ${username}!`;

    usernameInput.addEventListener('animationend', () => {
        loadingScreen.style.marginTop = '';
        loadingScreen.style.display = 'flex';
        loadingIcon.style.display = 'flex';
        loadingIcon.style.marginTop = '-100px';

        setInterval(() => {
            loadingScreen.classList.add('loadingAnim');
            loadingIcon.classList.add('loadingIconAnim');
        }, 1000);
    });

    loadingScreen.addEventListener('animationend', () => {
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
        console.log('welcome')
    });
    return;
}


//

const factBox = document.querySelector('.factBox');
const programmingFacts = [
  "JavaScript was created in just 10 days.",
  "The first computer bug was an actual moth found in a machine.",
  "`null` and `undefined` are not the same thing in JavaScript.",
  "CSS stands for Cascading Style Sheets, not Creative Style Stuff.",
  "HTML is not a programming language — it’s a markup language.",
  "The original name of JavaScript was Mocha.",
  "A single missing semicolon has crashed real-world systems.",
  "Most programming bugs are caused by logic errors, not syntax errors.",
  "Git was created by Linus Torvalds, the creator of Linux.",
  "The `console.log()` method was never meant to stay in production.",
  "Java and JavaScript are completely different languages.",
  "The first website ever made is still online today.",
  "Whitespace matters in some languages, like Python.",
  "A loop that never ends is called an infinite loop (and it will freeze things).",
  "Computers only understand 0s and 1s — everything else is an abstraction.",
  "The term 'debugging' became popular after removing real insects from computers.",
  "Frameworks exist to make common problems easier — and new ones harder.",
  "Most modern apps rely on open-source code.",
  "A computer can do millions of calculations per second but can’t guess what you meant.",
  "Comments in code are ignored by the computer but loved by humans.",
  "The browser is very forgiving — it fixes many of your HTML mistakes silently.",
  "The same code can behave differently in different browsers.",
  "APIs are basically menus for software to talk to each other.",
  "A program that works once doesn’t mean it works forever.",
  "The hardest part of programming is naming things."
];

if (factBox) {
    factBox.addEventListener('click', () => {
    factBox.textContent = `here: ${programmingFacts[Math.floor(Math.random() * programmingFacts.length)]}`;
});
}

//


const listParagraphs = document.querySelectorAll('.aboutP');
const aboutText = document.querySelector('.aboutText');


function typeWriter(element, speed = 40) {
    const fullText = element.textContent; 
    element.textContent = '';       
    let i = 0;

    function typeLetter() {
        if (i < fullText.length) {
            element.textContent += fullText[i];
            i++;
            setTimeout(typeLetter, speed); 
            aboutText.classList.add('aboutTextAnim');
        }
    }

    typeLetter();
}


const observer2 = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {    
            typeWriter(entry.target); 
        } 
    });
});


listParagraphs.forEach(p => observer2.observe(p));


//


const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
            // Only type if not typed yet
            if (!el.dataset.typed) {
                typeWriter1(el);
                el.dataset.typed = 'true'; // mark as typed
            }
        }
    });
});


const listAboutMe = document.querySelectorAll('.listAboutMe');
listAboutMe.forEach(list => observer3.observe(list))

function typeWriter1(list, speed = 40) {
    const textVal = list.textContent;
    list.textContent = '';
    let i = 0;

    function typeLetter1() {
        if (i < textVal.length) {
            list.textContent += textVal[i];
            i++;
            setTimeout(typeLetter1, speed);
        }
    }

    typeLetter1();
}

const calculator = document.querySelector('#calculator');

let expression = '';
let allowedNums = /[0-9\s]+/;
let allowedOps = /[+\-/*\s]+/;
let result = '';

document.addEventListener('keydown', (e) => {
    const expression = calculator.value.trim();

    if (e.key !== 'Enter') return;
    if (!expression) return;
    if (!allowedNums.test(expression) && !allowedOps.test(expression)) return calculator.value = 'Not a number or operator';
    result = eval(expression);
    calculator.value = result; 
})


// 


const numStars = 100; // total stars you want
const body = document.body;

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('stars');

    // random position anywhere on the screen
    const x = Math.random() * window.innerWidth + 50;
    const y = Math.random() * window.innerHeight + 50;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // optional: random size for variation
    const size = Math.random() * 5 + 1; // 1px to 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.borderRadius = '50%';
    star.style.display = 'fixed';

    // optional: random opacity for depth effect
    star.style.opacity = (Math.random() * 0.5 + 0.3).toString();

    body.appendChild(star);
}


//
