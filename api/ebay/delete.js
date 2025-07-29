export default async function handler(req, res) {
  const VERIFICATION_TOKEN = 'MySecureVerificationToken123456789';

  if (req.method === 'GET') {
    return res.status(200).send(`GET OK. Send a POST with token: ${VERIFICATION_TOKEN}`);
  }

  if (req.method === 'POST') {
    let body = '';

    // Parse the body manually (Vercel doesn’t do it automatically)
    await new Promise((resolve, reject) => {
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    console.log('Received POST:', req.body);

    return res.status(200).json({ verification_token: VERIFICATION_TOKEN });
  }

  res.status(405).end('Method Not Allowed');
}
