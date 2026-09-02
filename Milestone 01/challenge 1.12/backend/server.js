const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * AI Chat Route
 *
 * Receives:
 * {
 *   messages: [
 *     { role: "user", content: "Hello" }
 *   ]
 * }
 *
 * Sends the full conversation history to OpenRouter
 * and returns:
 * {
 *   reply: "AI response"
 * }
 */
app.post('/chat', async (req, res) => {
  try {
    // 1. Get messages from the frontend
    const { messages } = req.body;

    // Validate messages
    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: 'messages must be an array'
      });
    }

    // 2. Get OpenRouter API key from .env
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'OPENROUTER_API_KEY is missing'
      });
    }

    // 3. Send conversation to OpenRouter
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },

        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: messages
        })
      }
    );

    // Convert OpenRouter response to JSON
    const data = await response.json();

    // Handle OpenRouter errors
    if (!response.ok) {
      console.error('OpenRouter error:', data);

      return res.status(response.status).json({
        error:
          data.error?.message ||
          'OpenRouter request failed'
      });
    }

    // 4. Extract AI response
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        error: 'No reply received from AI'
      });
    }

    // Send reply to frontend
    res.json({
      reply: reply
    });

  } catch (error) {
    console.error('Server error:', error);

    res.status(500).json({
      error: 'Something went wrong'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});