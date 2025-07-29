export default function handler(req, res) {
  const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

  if (req.method === 'POST') {
    console.log('✅ Received webhook POST from eBay');
    res.status(200).json({ verification_token: VERIFICATION_TOKEN });
  } else {
    res.status(200).send(`POST to this endpoint with the verification token: ${VERIFICATION_TOKEN}`);
  }
}
