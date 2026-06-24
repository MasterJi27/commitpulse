const fs = require('fs');
const file = 'e:\\Projects\\commitpulse\\lib\\svg\\generator.ts';
let content = fs.readFileSync(file, 'utf8');

// Add import if not present
if (!content.includes("import { DEFAULT_FONTS_BASE64 } from './fonts';")) {
  content = content.replace(
    "import { getTowerAnimationCSS } from './animations';",
    "import { getTowerAnimationCSS } from './animations';\nimport { DEFAULT_FONTS_BASE64 } from './fonts';"
  );
}

// Regex to replace all @import url(...) for Syncopate and Space Grotesk
const regex = /@import url\(['"]https:\/\/fonts\.googleapis\.com\/css2\?family=Syncopate[^)]+['"]\);\s*/g;
content = content.replace(regex, '${DEFAULT_FONTS_BASE64}\n  ');

fs.writeFileSync(file, content);
console.log('generator.ts updated.');
