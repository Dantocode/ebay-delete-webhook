export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).send('GET OK. Send a POST request for webhook verification.');
  }

  if (req.method === 'POST') {
    let body = '';

    // Manually parse body
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

    console.log('Received POST from eBay:', req.body);

    const challenge = req.body.challenge;
    if (!challenge) {
      return res.status(400).json({ error: 'Missing challenge parameter' });
    }

    return res.status(200).json({
      challengeResponse: challenge
    });
  }

  return res.status(405).end('Method Not Allowed');
}
