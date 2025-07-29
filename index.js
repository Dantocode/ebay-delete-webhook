const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const VERIFICATION_TOKEN = "MySecureVerificationToken123456789";

app.use(bodyParser.json());

// 🔁 Optional: respond to GET requests for browser testing
app.get('/ebay/delete', (req, res) => {
  res.send(`POST to this endpoint with the verification token: ${VERIFICATION_TOKEN}`);
});

// ✅ Actual eBay webhook POST handler
app.post('/ebay/delete', (req, res) => {
  const token = req.body.verification_token;

  if (token === VERIFICATION_TOKEN) {
    console.log("✅ Verification token matched");
    res.status(200).send("Verified");
  } else {
    console.warn("❌ Invalid verification token:", token);
    res.status(403).send("Forbidden");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}`);
});
