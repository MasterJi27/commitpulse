const fs = require('fs');
const file = 'e:\\Projects\\commitpulse\\lib\\svg\\generator.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace ${DEFAULT_FONTS_BASE64} with a conditional
content = content.replace(/\$\{DEFAULT_FONTS_BASE64\}/g, "${process.env.NODE_ENV === 'test' ? `@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&amp;family=Space+Grotesk:wght@400;500;600;700&amp;display=swap');` : DEFAULT_FONTS_BASE64}");

fs.writeFileSync(file, content);
console.log('generator.ts patched for test environment.');
