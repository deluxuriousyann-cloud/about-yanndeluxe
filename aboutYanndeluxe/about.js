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


const searchIcon = document.querySelector('.searchIcon');
const accountIcon = document.querySelector('.accountIcon');
const menuIcon = document.querySelector('.menuIcon');
const searchBar = document.querySelector('.searchBar')

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
    confirmButton.addEventListener('click', () => {
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


