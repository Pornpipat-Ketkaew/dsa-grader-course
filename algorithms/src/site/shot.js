// node shot.js <page.html> <out.png> [th] [dark] [clickSelector...]
const { chromium } = require('playwright');
(async () => {
  const [page_, out, ...opts] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.addInitScript(o => { localStorage.setItem('alg-lang', o.includes('th') ? 'th' : 'en'); localStorage.setItem('alg-theme', o.includes('dark') ? 'dark' : 'light'); }, opts);
  await p.goto('file://' + require('path').resolve('out/algorithms/' + page_));
  await p.waitForTimeout(400);
  for (const o of opts) if (o.startsWith('click:')) { const [sel, n] = o.slice(6).split('*'); for (let i = 0; i < (+n || 1); i++) await p.locator(sel).locator('visible=true').first().click(); }
  if (opts.includes('viz')) { const v = p.locator('.viz >> visible=true'); const k = +(opts.find(o => o.startsWith('n=')) || 'n=0').slice(2); await v.nth(k).screenshot({ path: out }); }
  else await p.screenshot({ path: out, fullPage: true });
  console.log(errs.length ? 'ERRORS: ' + errs.join(' | ') : 'no errors');
  await b.close();
})();
