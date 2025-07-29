export default function handler(req, res) {
  const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

  if (req.method === 'GET') {
    res.status(200).send(`GET OK. Send a POST with token: ${VERIFICATION_TOKEN}`);
  } else if (req.method === 'POST') {
    console.log('Webhook received:', req.body);

    // Respond with the token for verification
    res.status(200).json({ verification_token: VERIFICATION_TOKEN });
  } else {
    res.status(405).end('Method Not Allowed');
  }
}
