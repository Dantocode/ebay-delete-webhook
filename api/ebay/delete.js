export default function handler(req, res) {
  const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

  if (req.method === 'GET') {
    // Sanity check
    res.status(200).send(`GET received. Expecting POST with token: ${VERIFICATION_TOKEN}`);
  } else if (req.method === 'POST') {
    console.log('Received webhook POST:', JSON.stringify(req.body, null, 2));
    res.status(200).json({ verification_token: VERIFICATION_TOKEN });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
