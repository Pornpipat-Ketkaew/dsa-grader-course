const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 1600 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  const f = 'file://' + process.cwd() + '/grader-solutions.html';
  const id = process.argv[2] || 'd63_q1b_interval_count';
  await p.goto(f + '#' + id); await p.waitForTimeout(400);
  await p.screenshot({ path: 'shot_en.png', fullPage: false });
  await p.click('#lang button[data-l="th"]'); await p.waitForTimeout(300);
  await p.screenshot({ path: 'shot_th.png', fullPage: false });
  await p.click('#lang button[data-l="en"]');
  await p.goto(f + '#home'); await p.waitForTimeout(300); await p.screenshot({ path: 'shot_home.png' });
  console.log('errors:', JSON.stringify(errs));
  await b.close();
})();
