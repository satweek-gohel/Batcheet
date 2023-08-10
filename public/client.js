const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let sendButton = document.querySelector('#sendButton');
let messageArea = document.querySelector('.message__area');
let nameModal = document.querySelector('#nameModal');
let nameInput = document.querySelector('#nameInput');
let nameSubmit = document.querySelector('#nameSubmit');

nameModal.style.display = 'flex';

// Add this to your client.js file

nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        submitName();
    }
});

nameSubmit.addEventListener('click', submitName);

function submitName() {
    name = nameInput.value.trim();
    if (name !== '') {
        nameModal.style.display = 'none';
    }
}


nameSubmit.addEventListener('click', () => {
    name = nameInput.value.trim();
    if (name !== '') {
        nameModal.style.display = 'none';
    }
});

sendButton.addEventListener('click', () => {
    sendMessage(textarea.value);
});

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    if (message.trim() === '') {
        return; // Don't send empty messages
    }

    let msg = {
        user: name,
        message: message.trim(),
    };

    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
