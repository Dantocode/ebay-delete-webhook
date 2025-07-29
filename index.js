const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Replace this with your actual eBay token
const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

// Middleware
app.use(bodyParser.json());

// GET fallback for sanity check
app.get('/ebay/delete', (req, res) => {
  res.send(`POST to this endpoint with the verification token: ${MySecureVerificationToken123456789}`);
});

// Main POST handler for eBay account deletion webhook
app.post('/ebay/delete', (req, res) => {
  console.log('Received webhook POST from eBay:', JSON.stringify(req.body, null, 2));

  // Respond with the verification token to confirm webhook
  res.status(200).json({
    verification_token: VERIFICATION_TOKEN
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Webhook listening at http://localhost:${port}/ebay/delete`);
});
