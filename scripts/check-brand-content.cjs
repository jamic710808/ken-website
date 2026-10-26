/* Regression check: every original content field survives the presentation change. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'ken-components.jsx'), 'utf8').replaceAll('\r\n', '\n');
function array(component, name) {
  const assignment = source.indexOf(`const ${name} = [`, source.indexOf(`const ${component}`));
  const start = source.indexOf('[', assignment);
  const end = source.indexOf('\n  ];', start);
  assert(assignment >= 0 && end > start, `Missing original ${component}.${name}`);
  return JSON.parse(JSON.stringify(vm.runInNewContext(`(${source.slice(start, end + 4)})`, {}, { timeout: 1000 })));
}
function load(file, property) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { timeout: 1000 });
  return JSON.parse(JSON.stringify(context.window[property]));
}
const brand = load('design-exploration/brand-data.js', 'KEN_BRAND');
const reports = load('design-exploration/report-data.js', 'KEN_REPORTS');
const previews = load('design-exploration/report-preview-data.js', 'KEN_REPORT_PREVIEWS');
const originalReports = array('KenPowerBI', 'reports');
assert.deepEqual(brand.skills, array('KenSkills', 'groups'), 'Skills were omitted or rewritten');
assert.deepEqual(brand.career, array('KenExperience', 'items'), 'Career details were omitted or rewritten');
assert.deepEqual(brand.portfolio.map(({ image, ...p }) => p), array('KenPortfolio', 'projects').map(({ icon, tag, ...p }) => p), 'Portfolio details were omitted or rewritten');
assert.deepEqual(reports, originalReports.map(({ icon, mockTabs, mockKPIs, mockBars, mockBarLabel, mockRing, ...r }) => ({ ...r, frameworks: r.frameworks.map(({ icon, ...f }) => f) })), 'Report content or guide links were lost');
assert.deepEqual(previews, originalReports.map(({ mockTabs, mockKPIs, mockBars, mockBarLabel, mockRing }) => ({ mockTabs, mockKPIs, mockBars, mockBarLabel, mockRing })), 'Original report preview data was lost');
const about = source.slice(source.indexOf('const KenAbout'), source.indexOf('const KenSkills'));
const paragraphs = [...about.matchAll(/<p style=\{\{ color: '#94a3b8'[^>]*>([\s\S]*?)<\/p>/g)].map(m => m[1].replace(/ style=\{\{[\s\S]*?\}\}/g, '').trim());
const normalize = html => html.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
assert.equal(normalize(brand.aboutHtml), normalize(paragraphs.join('')), 'Original biography was shortened');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.equal((index.match(/data-style-choice=/g) || []).length, 5, 'Expected original plus four design options');
assert(index.includes('id="classic-frame"') && index.includes('data-src="index-classic.html"'), 'Original page must be available from the same switcher');
const ai = load('ai-projects-data.js', 'AI_PROJECTS');
console.log(JSON.stringify({ result: 'PASS', biographyParagraphs: paragraphs.length, skills: brand.skills.length, careerEntries: brand.career.length, portfolio: brand.portfolio.length, aiProjects: ai.length, reports: reports.length, previews: previews.length, reportGuideLinks: reports.flatMap(r => r.guides || (r.guide ? [{ url: r.guide }] : [])).length, styleOptions: 5 }, null, 2));
