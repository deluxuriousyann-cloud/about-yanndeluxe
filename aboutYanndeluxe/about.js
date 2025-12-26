const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log(entry.target);
            entry.target.classList.add('todoShow');
        } else {
            entry.target.classList.remove('todoShow');
        }
    });
}, {});

const toDoElements = document.querySelectorAll('.list');
toDoElements.forEach(el => observer.observe(el));


const usernameInput = document.querySelector('.usernameInput');
const passwordInput = document.querySelector('.passwordInput');
const confirmButton = document.querySelector('.confirmButton');
const body = document.querySelector('body');
body.style.overflow = 'hidden';

let usernameFilled = false;
let passwordFilled = false;
let username = '';
let password = '';

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (passwordFilled) return;
    if (usernameFilled) return;
    userData();
})

confirmButton.addEventListener('click', () => {
    if (passwordFilled) return;
    if (usernameFilled) return;
    userData();
})



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
        loadingScreen.style.marginTop = '200px';
        loadingScreen.style.display = 'flex';
        loadingIcon.style.display = 'flex';

        setInterval(() => {
            loadingScreen.classList.add('loadingAnim');
            loadingIcon.classList.add('loadingIconAnim');
        }, 1000);
    });

    loadingScreen.addEventListener('animationend', () => {
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    });
    return;
}