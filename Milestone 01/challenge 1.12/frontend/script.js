const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatDisplay = document.getElementById('chatDisplay');

// Conversation history
const messages = [];

/**
 * Render a message in the chat window
 */
function renderMessage(role, content) {
  const messageBubble = document.createElement('div');

  messageBubble.className = `message ${role}`;

  messageBubble.textContent = content;

  chatDisplay.appendChild(messageBubble);

  // Automatically scroll to latest message
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

/**
 * Send message to backend
 */
async function sendMessage() {
  const text = messageInput.value.trim();

  // Don't send empty messages
  if (!text) {
    return;
  }

  // Add user message to conversation history
  messages.push({
    role: 'user',
    content: text
  });

  // Show user message
  renderMessage('user', text);

  // Clear input
  messageInput.value = '';

  // Disable button while waiting
  sendBtn.disabled = true;
  sendBtn.textContent = 'Thinking...';

  try {
    // Send FULL conversation history to backend
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        messages: messages
      })
    });

    const data = await response.json();

    // Handle backend errors
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get AI response');
    }

    const reply = data.reply;

    // Add AI response to conversation history
    messages.push({
      role: 'assistant',
      content: reply
    });

    // Show AI response
    renderMessage('assistant', reply);

  } catch (error) {
    console.error('Error:', error);

    renderMessage(
      'assistant',
      'Sorry, something went wrong. Please try again.'
    );

  } finally {
    // Enable button again
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send';

    messageInput.focus();
  }
}

/**
 * Send when button is clicked
 */
sendBtn.addEventListener('click', sendMessage);

/**
 * Send when Enter is pressed
 */
messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});