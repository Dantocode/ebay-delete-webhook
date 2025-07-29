const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Replace this with your actual verification token
const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

// Define the eBay webhook endpoint
app.post('/ebay/delete', (req, res) => {
  console.log('✅ Received eBay webhook POST request');
  res.status(200).send(VERIFICATION_TOKEN); // Return token as plain text
});

// Optional root route to confirm server is running
app.get('/', (req, res) => {
  res.send('eBay webhook listener is live ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
