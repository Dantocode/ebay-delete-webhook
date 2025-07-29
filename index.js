// pages/api/ebay/delete.js (Vercel expects this to be an API route inside /pages/api)

export default async function handler(req, res) {
  const verificationToken = 'MySecureVerificationToken123456789';

  if (req.method === 'POST') {
    try {
      // eBay expects the raw token in the response body — nothing else
      res.status(200).send(verificationToken);
    } catch (error) {
      console.error('Error handling eBay webhook:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // eBay requires a POST request
    res.status(405).send('Method Not Allowed');
  }
}
