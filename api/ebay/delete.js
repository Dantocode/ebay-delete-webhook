// /api/ebay/delete.js

const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received webhook from eBay:', JSON.stringify(req.body, null, 2));

    res.status(200).json({
      verification_token: VERIFICATION_TOKEN
    });
  } else if (req.method === 'GET') {
    res.status(200).send(`POST to this endpoint with the verification token: ${VERIFICATION_TOKEN}`);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
