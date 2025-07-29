export default async function handler(req, res) {
  const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';
  const ENDPOINT = 'https://ebay-delete-webh.vercel.app/api/ebay/delete'; // exact full URL

  if (req.method === 'GET') {
    const challenge = req.query.challenge_code;
    if (!challenge) {
      return res.status(400).json({ error: 'Missing challenge_code' });
    }

    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(challenge);
    hash.update(VERIFICATION_TOKEN);
    hash.update(ENDPOINT);
    const challengeResponse = hash.digest('hex');

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ challengeResponse });
  }

  if (req.method === 'POST') {
    console.log('Received eBay deletion webhook:', req.body);
    return res.status(200).end();
  }

  res.status(405).end('Method Not Allowed');
}
