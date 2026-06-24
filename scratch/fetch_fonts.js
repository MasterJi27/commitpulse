const fs = require('fs');
const https = require('https');

async function fetchURL(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function run() {
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36' }; // Forces WOFF2
  
  const cssBuffer = await fetchURL(cssUrl, headers);
  let cssText = cssBuffer.toString('utf8');

  // Find all url(...) links
  const urlRegex = /url\((https:\/\/[^)]+)\)/g;
  let match;
  const fontUrls = new Set();
  while ((match = urlRegex.exec(cssText)) !== null) {
    fontUrls.add(match[1]);
  }

  console.log(`Found ${fontUrls.size} font URLs.`);

  for (const fontUrl of fontUrls) {
    console.log(`Fetching ${fontUrl}`);
    const fontBuffer = await fetchURL(fontUrl);
    const base64 = fontBuffer.toString('base64');
    const dataUrl = `data:font/woff2;base64,${base64}`;
    cssText = cssText.replace(fontUrl, dataUrl);
  }

  const output = `// Auto-generated fonts base64 (WOFF2)\nexport const DEFAULT_FONTS_BASE64 = \`${cssText.trim()}\`;\n`;
  fs.writeFileSync('e:\\Projects\\commitpulse\\lib\\svg\\fonts.ts', output);
  console.log('Fonts saved to lib/svg/fonts.ts');
}

run().catch(console.error);
