const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + __dirname + '/final-grader-solutions.html#home');
  const ids = await p.evaluate(() => ['home'].concat(DATA.groups.map(g => 'ch-' + g.id)).concat(DATA.problems.map(x => x.id)));
  const bad = [];
  for (const lang of ['en', 'th']) {
    await p.click('#lang button[data-l="' + lang + '"]');
    for (const id of ids) {
      await p.evaluate(h => { location.hash = h; }, id);
      await p.waitForTimeout(30);
      const r = await p.evaluate(() => {
        const m = document.getElementById('main'); const t = m.innerText;
        const issues = [];
        ['{{code}}', '{{tests}}', ':::', '](#', '**', '==== '].forEach(k => { if (t.includes(k)) issues.push('raw ' + k); });
        const links = [...m.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1).split('/')[0]);
        const known = new Set(['home', ...DATA.groups.map(g => 'ch-' + g.id), ...DATA.problems.map(x => x.id)]);
        links.forEach(l => { if (!known.has(l)) issues.push('link ' + l); });
        return { issues, len: t.length, pre: m.querySelectorAll('pre').length, hints: m.querySelectorAll('details.hint').length, tables: m.querySelectorAll('table').length };
      });
      if (r.issues.length) bad.push([lang, id, r.issues]);
      if (!id.startsWith('ch-') && id !== 'home' && (r.hints !== 2 || r.pre < 1)) bad.push([lang, id, 'hints=' + r.hints + ' pre=' + r.pre]);
      if (lang === 'en' && id.startsWith('ch-')) console.log(id, r.len, 'pre', r.pre, 'tables', r.tables);
    }
  }
  console.log('pages', ids.length * 2, 'bad', JSON.stringify(bad, null, 0));
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
