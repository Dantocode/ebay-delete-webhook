import crypto from 'crypto';

const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789'; // match eBay dashboard

export default function handler(req, res) {
  const { challenge_code } = req.query;

  if (req.method === 'GET' && challenge_code) {
    const path = '/api/ebay/delete'; // hardcoded path as required by eBay docs
    const data = challenge_code + VERIFICATION_TOKEN + path;
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    return res.status(200).json({
      challengeResponse: hash,
    });
  }

  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        console.log('✅ Received webhook payload:', parsed);
        res.status(200).json({ status: 'OK' });
      } catch (err) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });

    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
