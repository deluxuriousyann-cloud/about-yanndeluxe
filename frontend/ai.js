const userInput = document.querySelector('.userInput')
const botResponse = document.querySelector('.botResponse')


const quoteTrigger = ['quote', 'quotes']
let quoteLink = '';
let canRespond = false;
let botReply = '';
let userData = {
    username: '',
    age: '',
    address: '',
    occupation: ''
}

document.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter') return;
    let message = userInput.value.toLowerCase();
    console.log(message)

    if (message.startsWith('search ')) {
        const query = message.replace('search ', '');

        const result = await searchWiki(query);

        botReply = result;
        botResponded();
        return;
    }

    if (message == 'hi') {
        canRespond = true;
        sayHello();
    }
    if (userData.username === '') {
        canRespond = true;
        botReply = 'please enter a name first so i can track what you prefer. [eg., my name is yannix].';
    }
    if (message.includes('name')) {
        canRespond = true;
        message = message.split(' ');
        let nameIndex = message.length;
        message = message[3];
        userData.username = message;
        console.log(userData)
        
        botReply = `hello ${message}, what can i help you with?`;
        botResponded()
        return;
    }
    if (message.includes('math', 'help' || 'problem')) {
        botReply = `looks like someone needs help with math! Submit something to calculate by doing: Calculate [numbers] [operators] [numbers]; it can be more than 1.`
        botResponded();
        return;
    }
    if (message.startsWith('calculate')) {
        message = message.replace('calculate', '').trim();
        message = eval(message);
        botReply = `the total is: ${message}`
        botResponded()

        console.log(message, botReply)
        return;
    }
    if (message.includes('search', 'what')) {
        searchWeb(message).then(result => {
            botReply = result;
            botResponded();
        })
    }
    if (message.includes(quoteTrigger && 'generate', 'create' , 'give')) {
        if (message.includes('of the day')) {
            quoteLink = 'https://api.api-ninjas.com/v2/quoteoftheday';
            getQuotes().then(data => {
                console.log(data);
                botReply = `${data.quote} - Author: ${data.author}` 
                botResponded();
                return;
            })
        } else if (message.includes('random')) {
            quoteLink = 'https://api.api-ninjas.com/v2/randomquotes';
            getQuotes().then(data => {
                console.log(data);
                botReply = `${data.quote} - Author: ${data.author}` 
                botResponded();
                return;
            }) 
        } else {
            quoteLink = 'https://api.api-ninjas.com/v2/quotes?limit=5';
            getQuotes().then(data => {
                console.log(data);
                botReply = `${data.quote} - Author: ${data.author}` 
                botResponded();
                return;
            })
        }

    } 

    if (message.startsWith('lyrics')) {
        const parts = message.split(' ');
        const [_, ...query] = parts;
        const [artist, title] = query.join(' ').split(' - ');

        getLyrics(artist, title).then(lyrics => {
            botReply = lyrics;
            botResponded();
        });

        return;
    }



    if (!canRespond) {
        canRespond = false;
        const query = message;

        const result = await searchWiki(query);

        botReply = result;
        botResponded();
        return;
    }

    canRespond = false;
    userInput.value = '';
    console.log('function sent')
})

async function searchWeb(query) {
    const res = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`
    );

    const data = await res.json();

    console.log(data.AbstractText)
    return data.AbstractText || 'No instant answer found.';
}

function getQuotes() {
    return fetch(quoteLink, {
        headers: {
            'X-Api-Key': 'QyF9iAXO9dRYEMJqYHvzhg==I1oEOiRFXIReRVQY'
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => data[Math.floor(Math.random() * data.length)])
}

async function searchWiki(query) {
    try {
        const title = query.replace(/\s+/g, '_');

        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
        );

        if (!res.ok) {
            return `I cound find what you're looking for: "${query}".`;
        }

        const data = await res.json();

        return data.extract || `No summary available for "${query}".`;
    } catch {
        return 'Search failed.';
    }
}


function getLyrics(artist, title) {
    return fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
    )
    .then(res => res.json())
    .then(data => data.lyrics || 'Lyrics not found.')
    .catch(() => 'Error fetching lyrics.');
}

function sayHello() {
    botReply = `hello ${userData.username}, how are you doing?`;
    botResponded();
}

function botResponded() {
    let typedText = 0;
    let textTyped = '';

    const type = setInterval(() => {
        

        if (typedText < botReply.length) {
            if (!botReply) {
                clearInterval(type);
                console.log('undefined, cleared interval')
                return;
            }

            botResponse.textContent = '';
            textTyped += botReply[typedText];
            botResponse.textContent = textTyped;
            typedText++
            return;
        } else {
            clearInterval(type);
            console.log('typing done!')
        }
    }, 10)
}