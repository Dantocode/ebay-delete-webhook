const express = require('express');
const app = express();
const EXPECTED_TOKEN = process.env.VERIFY_TOKEN;

app.use(express.json());

app.post('/ebay/delete', (req, res) => {
  const token = req.body.verification_token;
  if (token === EXPECTED_TOKEN) {
    return res.status(200).send(token);
  } else {
    return res.status(400).send('Invalid token');
  }
});

app.get('/', (req, res) => res.send('Webhook live ✅'));
app.listen(process.env.PORT || 3000);
