window.addEventListener('beforeunload', (e) => {
    console.trace('PAGE IS RELOADING');
});

const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const loginButton = document.querySelector('.confirmLogin');
const logInText = document.querySelector('.loginText');


let key = '';
let passwordPhase = false;
let invalidCharacters = /[/+\$\-%\^&*;\:#|\s]/;

loginButton.addEventListener('click', async () => {
    if (passwordPhase) {
        if (!passwordInput.value || invalidCharacters.test(passwordInput.value)) {
            passwordInput.value = '';
            passwordInput.placeholder = `invalid password`
            return;
        }

        userHandler(usernameInput.value, passwordInput.value);
    };
    if (!usernameInput.value || usernameInput.value.length > 12 || invalidCharacters.test(usernameInput.value)) {
        usernameInput.value = '';
        usernameInput.placeholder = 'invalid username.';
        return;
    };

    console.log(`fetching database...`)
    const res = await fetch('http://localhost:3000/users');
    const data = await res.json();

    let exists = false;

    for (const user of data) {
        if (usernameInput.value.trim() === user.username) {
            exists = true;
            break; // stop checking the rest
        }
    }

    if (exists) {
        loginHandler();
        passwordPhase = true;
        passwordInput.focus();
        console.log('password' + passwordPhase)
        return;
    } else {
        signupHandler();
        passwordPhase = true;
        passwordInput.focus();
        console.log('password' + passwordPhase)
        return;
    }
});


async function loginHandler() {
    logInText.textContent = `Login as ${usernameInput.value}`
    console.log(`The username "${usernameInput.value}" already exists. Must be a login`);
    passwordInput.classList.add('showPassword');
}
async function signupHandler() {
    logInText.textContent = `Sign up as ${usernameInput.value}`
    console.log(`The username "${usernameInput.value}" doesn't exist, signing up user`);
    passwordInput.classList.add('showPassword');
}
async function userHandler(username, password) {
    try {
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })

        });
        const data = await res.json();
        console.log(`username and password stored in database!`)
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        console.log(`in database: ${data.username, data.password}`)
        logInText.textContent = `hello ${username}!`
    } catch (err) {
        console.error('Failed to save user: ', err)
    }
}