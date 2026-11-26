// node checkall.js [page...]: load pages (EN+TH), report JS errors, viz errors, raw markdown, steps through every frame
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const dir = path.resolve('out/algorithms');
  let pages = process.argv.slice(2); if (!pages.length) pages = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  const b = await chromium.launch(); let bad = 0;
  for (const lang of ['en', 'th']) {
    const ctx = await b.newContext(); await ctx.addInitScript(l => localStorage.setItem('alg-lang', l), lang);
    for (const pg of pages) {
      const p = await ctx.newPage(); const errs = [];
      p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
      await p.goto('file://' + dir + '/' + pg); await p.waitForTimeout(150);
      const info = await p.evaluate(() => {
        const out = [];
        document.querySelectorAll('.md').forEach(md => { if (getComputedStyle(md).display === 'none') return;
          const t = md.innerText; if (/(^|\n)\s*(#{2,}|:::|```)/.test(t) || t.includes('{{') || t.includes('**')) out.push('raw markdown'); });
        document.querySelectorAll('.viz').forEach(v => { if (!v.offsetParent) return; const e = v.querySelector('.err'); if (e && e.textContent) out.push('viz ' + v.dataset.viz + ': ' + e.textContent);
          if (v.querySelector('.cap') && /^visualizer '.*' missing$/.test(v.querySelector('.cap').textContent)) out.push('viz missing ' + v.dataset.viz); });
        document.querySelectorAll('a[href]').forEach(a => { const h = a.getAttribute('href'); if (h.startsWith('#')) { if (h.length > 1 && !document.getElementById(h.slice(1))) out.push('bad anchor ' + h); } });
        return out;
      });
      // step through every frame of each visible viz
      const n = await p.locator('.viz >> visible=true').count();
      for (let i = 0; i < n; i++) {
        const v = p.locator('.viz >> visible=true').nth(i);
        const total = await v.evaluate(el => +el.querySelector('input[type=range]').max);
        for (let f = 0; f <= total; f++) await v.evaluate((el, f) => { const s = el.querySelector('input[type=range]'); s.value = f; s.dispatchEvent(new Event('input')); }, f);
        // presets
        const np = await v.evaluate(el => el.querySelectorAll('[data-pn]').length);
        for (let k = 0; k < np; k++) { await v.evaluate((el, k) => el.querySelectorAll('[data-pn]')[k].click(), k);
          const e = await v.evaluate(el => el.querySelector('.err').textContent); if (e) info.push('preset ' + k + ' ' + e);
          const tot = await v.evaluate(el => +el.querySelector('input[type=range]').max);
          for (let f = 0; f <= tot; f++) await v.evaluate((el, f) => { const s = el.querySelector('input[type=range]'); s.value = f; s.dispatchEvent(new Event('input')); }, f); }
      }
      // links to local pages exist
      const links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => !h.startsWith('#') && !h.startsWith('http') && !h.startsWith('../')));
      for (const l of links) if (!fs.existsSync(path.join(dir, l.split('#')[0]))) info.push('broken link ' + l);
      const all = [...errs, ...info];
      if (all.length) { bad++; console.log(lang, pg, [...new Set(all)].join(' | ')); }
      await p.close();
    }
    await ctx.close();
  }
  console.log(bad ? `${bad} page views with problems` : `all ${pages.length * 2} page views clean`);
  await b.close();
})();
