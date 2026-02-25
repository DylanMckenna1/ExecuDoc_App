// appwrite-functions/ocrFunction.js
// Appwrite Function: OCR 


function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async ({ req, res, log }) => {
  cors(res);

  if (req.method === 'OPTIONS') {
    return res.send('', 204);
  }

  try {
    const body = await req.json();
    const imageBase64 = body?.imageBase64;

    if (!imageBase64) {
      return res.json({ error: 'imageBase64 required' }, 400);
    }

    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (!apiKey) {
      return res.json({ error: 'Missing GOOGLE_VISION_API_KEY env var' }, 500);
    }

    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const payload = {
      requests: [
        {
          image: { content: imageBase64 },
          features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
        },
      ],
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await r.json();
    const text = data?.responses?.[0]?.fullTextAnnotation?.text || '';

    return res.json({ text });
  } catch (e) {
    log(String(e));
    return res.json({ error: 'OCR failed' }, 500);
  }
};
