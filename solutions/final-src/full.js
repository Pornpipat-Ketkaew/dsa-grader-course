const { chromium } = require('playwright');
(async () => {
  const [hash, out, lang = 'en', theme = 'light'] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 900 }, colorScheme: theme });
  await p.goto('file://' + __dirname + '/final-grader-solutions.html#' + hash);
  if (lang === 'th') await p.click('#lang button[data-l="th"]');
  await p.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = true));
  await p.waitForTimeout(300);
  await p.screenshot({ path: out, fullPage: true });
  await b.close();
})();
