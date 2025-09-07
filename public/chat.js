const chatContainer = document.getElementById('chatContainer');
const chatBox = document.getElementById('chatBox');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

// Show chat container after 5 seconds
setTimeout(() => {
    chatContainer.classList.remove('hidden');
}, 5000);

// Dummy message handling (replace with backend connection later)
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if (msg === "") return;
    addMessage("You: " + msg);
    chatInput.value = "";

    // Simulated AI reply
    setTimeout(() => {
        addMessage("Rewind AI: That's a great memory from IIT Delhi!");
    }, 1000);
});

function addMessage(text) {
    const p = document.createElement('p');
    p.textContent = text;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
}
