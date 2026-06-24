const fs = require('fs');

function updateAccessibility(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace missing aria-* tags in generator.ts
  content = content.replace(
    /role="img">/g,
    'role="img" aria-labelledby="cp-title-${safeId}" aria-describedby="cp-desc-${safeId}">'
  );

  // Fix where it only has cp-title
  content = content.replace(
    /role="img" aria-labelledby="cp-title-\$\{safeId\}">/g,
    'role="img" aria-labelledby="cp-title-${safeId}" aria-describedby="cp-desc-${safeId}">'
  );
  
  // Clean up any double additions
  content = content.replace(
    /role="img" aria-labelledby="cp-title-\$\{safeId\}" aria-describedby="cp-desc-\$\{safeId\}" aria-labelledby="cp-title-\$\{safeId\}" aria-describedby="cp-desc-\$\{safeId\}"/g,
    'role="img" aria-labelledby="cp-title-${safeId}" aria-describedby="cp-desc-${safeId}"'
  );

  fs.writeFileSync(file, content);
  console.log(file, 'updated accessibility.');
}

updateAccessibility('e:\\Projects\\commitpulse\\lib\\svg\\generator.ts');
