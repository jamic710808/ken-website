/* Assemble the four independent hero fragments. No packages or build step needed at runtime. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const styles = ['editorial', 'systems', 'gallery', 'island'];
const templates = Object.fromEntries(styles.map(style => {
  const file = path.join(root, 'design-exploration', 'themes', `hero-${style}.html`);
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('<h1') || !html.includes('href="#projects"')) throw new Error(`Missing title or project action in ${style}`);
  return [style, html];
}));
fs.writeFileSync(path.join(root, 'design-exploration', 'hero-templates.js'), `window.KEN_HERO_TEMPLATES = ${JSON.stringify(templates, null, 2)};\n`);
console.log(`Prepared ${styles.length} personal-brand styles.`);
