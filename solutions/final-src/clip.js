const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  const items = process.argv.slice(2);
  for (const it of items) {
    const [hash, idx, out] = it.split(':');
    await p.goto('file://' + __dirname + '/final-grader-solutions.html#' + hash); await p.waitForTimeout(200);
    const all = await p.locator('.md pre.dia').all();
    await all[+idx].screenshot({ path: out });
  }
  await b.close();
})();
