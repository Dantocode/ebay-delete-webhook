import crypto from 'crypto';

const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789'; // use the exact token you gave eBay

export default function handler(req, res) {
  const { challenge_code, endpoint, verification_token } = req.query;

  // Step 1: Handle verification request (GET)
  if (req.method === 'GET' && challenge_code) {
    const data = challenge_code + VERIFICATION_TOKEN + req.url.split('?')[0];
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    return res.status(200).json({
      challengeResponse: hash,
    });
  }

  // Step 2: Handle incoming POST data (e.g. actual account deletion events)
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        console.log('✅ Received deletion event:', parsed);
        res.status(200).json({ status: 'OK' });
      } catch (err) {
        console.error('❌ Invalid JSON:', err);
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });

    return;
  }

  // Step 3: If it's not GET or POST, reject
  res.status(405).json({ error: 'Method Not Allowed' });
}
