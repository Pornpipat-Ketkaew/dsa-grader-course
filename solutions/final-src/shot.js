// usage: node shot.js <hash> <out.png> [lang] [width]
const { chromium } = require('playwright');
(async () => {
  const [hash, out, lang = 'en', width = '1280'] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +width, height: 900 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + __dirname + '/final-grader-solutions.html#' + hash);
  if (lang === 'th') await p.click('#lang button[data-l="th"]');
  if (hash.includes('/')) await p.evaluate(h => { location.hash = ''; location.hash = h; }, hash);
  await p.waitForTimeout(400);
  await p.screenshot({ path: out, fullPage: false });
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
