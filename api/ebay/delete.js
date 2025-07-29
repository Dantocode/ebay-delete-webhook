import crypto from 'crypto';
export default async function handler(req, res) {
  const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';
  const endpoint = `https://${req.headers.host}${req.url.split('?')[0]}`;

  if (req.method === 'GET' && req.query.challenge_code) {
    const challengeCode = req.query.challenge_code;
    const hash = crypto.createHash('sha256');
    hash.update(challengeCode);
    hash.update(VERIFICATION_TOKEN);
    hash.update(endpoint);
    const challengeResponse = hash.digest('hex');
    return res.status(200)
      .setHeader('Content-Type', 'application/json')
      .send(JSON.stringify({ challengeResponse }));
  }

  if (req.method === 'POST') {
    // Receive actual deletion notification
    console.log('Received POST webhook:', req.body);
    return res.status(200).json({}); // basic acknowledgment
  }

  res.status(405).end('Method Not Allowed');
}
