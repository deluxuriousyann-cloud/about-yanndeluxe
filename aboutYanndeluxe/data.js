document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        document.querySelector('.usernameValue').textContent = `Hello ${username}!`;
    }
});
