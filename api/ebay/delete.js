export default function handler(req, res) {
  const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

  if (req.method === 'GET') {
    const challenge = req.query.challenge_code;

    if (!challenge) {
      return res.status(400).json({ error: 'Missing challenge_code' });
    }

    const crypto = require('crypto');
    const challengeResponse = crypto
      .createHmac('sha256', VERIFICATION_TOKEN)
      .update(challenge)
      .digest('hex');

    return res.status(200).json({ challengeResponse });
  }

  if (req.method === 'POST') {
    console.log('Received webhook:', req.body);
    return res.status(200).end();
  }

  res.status(405).end('Method Not Allowed');
}
