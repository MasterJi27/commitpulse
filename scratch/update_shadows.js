const fs = require('fs');

const file = 'e:\\Projects\\commitpulse\\lib\\svg\\generator.ts';
let content = fs.readFileSync(file, 'utf8');

const regex = /const paths = {[\s\S]*?top: `M\$\{ax_sf\}[^`]+`,\n\s*};\n\n\s*towers \+= `\n\s*<g transform="translate\(\$\{towerX\}, \$\{towerY\}\)"\$\{dimAttr\}>/;

const replacement = `const paths = {
      left: \`M\${cx_sf} \${rnd(cy_sf - hOffset)} L\${cx_sf} \${cy_sf} L\${dx_sf} \${dy_sf} L\${dx_sf} \${rnd(dy_sf - hOffset)} Z\`,
      right: \`M\${cx_sf} \${rnd(cy_sf - hOffset)} L\${cx_sf} \${cy_sf} L\${bx_sf} \${by_sf} L\${bx_sf} \${rnd(by_sf - hOffset)} Z\`,
      top: \`M\${ax_sf} \${rnd(ay_sf - hOffset)} L\${bx_sf} \${rnd(by_sf - hOffset)} L\${cx_sf} \${rnd(cy_sf - hOffset)} L\${dx_sf} \${rnd(dy_sf - hOffset)} Z\`,
    };

    let shadowMarkup = '';
    if (!isGhost && hOffset > 0) {
      const vx = rnd(-hOffset * 0.7);
      const vy = rnd(-hOffset * 0.35);
      const shadowPath = \`M\${cx_sf} \${cy_sf} L\${bx_sf} \${by_sf} L\${rnd(bx_sf + vx)} \${rnd(by_sf + vy)} L\${rnd(ax_sf + vx)} \${rnd(ay_sf + vy)} L\${rnd(dx_sf + vx)} \${rnd(dy_sf + vy)} L\${dx_sf} \${dy_sf} Z\`;
      const shadowColor = isAutoTheme ? 'var(--cp-negative, #000000)' : '#000000';
      shadowMarkup = \`<path d="\${shadowPath}" fill="\${shadowColor}" fill-opacity="0.15" />\`;
    }

    towers += \`
        <g transform="translate(\${towerX}, \${towerY})"\${dimAttr}>
          \${shadowMarkup}`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content);
console.log('Shadow markup injected');
