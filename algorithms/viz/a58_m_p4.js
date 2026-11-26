VIZ.def("a58_m_p4", {
  title: VIZ.L("Four greedy rules, one input", "กฎ greedy สี่แบบบนอินพุตเดียวกัน"),
  input: "3\n0 4 5\n5 6 10",
  presets: [{ name: VIZ.L("Breaks 'shortest first'", "ทำให้ 'สั้นที่สุดก่อน' พัง"), input: "3\n0 4 5\n5 6 10" },
            { name: VIZ.L("Breaks 'earliest start'", "ทำให้ 'เริ่มเร็วที่สุดก่อน' พัง"), input: "4\n0 1 3 5\n10 2 4 6" },
            { name: VIZ.L("Breaks 'fewest overlaps'", "ทำให้ 'ทับน้อยที่สุดก่อน' พัง"), input: "11\n0 2 4 6 1 1 1 3 5 5 5\n2 4 6 8 3 3 3 5 7 7 7" }],
  limit: VIZ.L("N ≤ 12", "N ≤ 12"),
  maxFrames: 120,
  legend: [["ok", VIZ.L("chosen by this rule", "ถูกเลือกโดยกฎนี้")], ["cur", VIZ.L("being considered", "กำลังพิจารณา")], ["dim", VIZ.L("rejected", "ถูกปฏิเสธ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 12, L("keep N ≤ 12", "ให้ N ≤ 12"));
    const st = [], fi = []; for (let i = 0; i < n; i++) st.push(t.int()); for (let i = 0; i < n; i++) fi.push(t.int());
    const overl = (a, b) => st[a] < fi[b] && st[b] < fi[a];
    const conflicts = i => [...Array(n).keys()].filter(j => j !== i && overl(i, j)).length;
    const rules = [
      [L("earliest finish", "จบเร็วที่สุด"), (a, b) => fi[a] - fi[b]],
      [L("earliest start", "เริ่มเร็วที่สุด"), (a, b) => st[a] - st[b]],
      [L("shortest duration", "สั้นที่สุด"), (a, b) => (fi[a] - st[a]) - (fi[b] - st[b])],
      [L("fewest overlaps", "ทับกับวิชาอื่นน้อยที่สุด"), (a, b) => conflicts(a) - conflicts(b)]];
    const lo = Math.min(...st), hi = Math.max(...fi), results = [];
    const view = (ri, cls) => [{ t: "iv", title: L(`rule: ${rules[ri][0].en}`, `กฎ: ${rules[ri][0].th}`), lo, hi, full: true,
        iv: [...Array(n).keys()].map(i => ({ s: st[i], e: fi[i], l: `#${i + 1}`, c: cls[i] || "", row: i })) },
      { t: "table", title: L("classes chosen", "จำนวนวิชาที่ได้"), h: rules.map(r => r[0].en), r: [rules.map((_, k) => results[k] == null ? "…" : results[k])], c: Object.fromEntries(results.map((x, k) => [`0,${k}`, x === Math.max(...results) ? "ok" : "bad"])) }];
    for (let ri = 0; ri < rules.length; ri++) {
      const ord = [...Array(n).keys()].sort(rules[ri][1]), cls = Array(n).fill(""), kept = [];
      S.frame(L(`Rule "${rules[ri][0].en}": consider classes in that order, keep each one that overlaps nothing kept so far.`, `กฎ "${rules[ri][0].th}": พิจารณาวิชาตามลำดับนี้ เก็บวิชาที่ไม่ทับกับวิชาที่เก็บไว้แล้ว`), view(ri, cls));
      for (const c of ord) {
        const ok = kept.every(k => !overl(c, k));
        cls[c] = ok ? "ok" : "dim"; if (ok) kept.push(c);
        S.frame(L(`#${c + 1} [${st[c]}, ${fi[c]}] → ${ok ? "keep" : "overlaps a kept class, reject"}.`, `#${c + 1} [${st[c]}, ${fi[c]}] → ${ok ? "เก็บ" : "ทับวิชาที่เก็บไว้ ปฏิเสธ"}`), view(ri, cls));
      }
      results[ri] = kept.length;
      S.frame(L(`Rule "${rules[ri][0].en}" keeps ${kept.length} classes.`, `กฎ "${rules[ri][0].th}" ได้ ${kept.length} วิชา`), view(ri, cls));
    }
    S.frame(L(`Only "earliest finish" is guaranteed optimal: it got <b>${results[0]}</b>.`, `มีเพียง "จบเร็วที่สุด" ที่รับประกันว่าดีที่สุด: ได้ <b>${results[0]}</b>`), view(0, Array(n).fill("")));
  }
});
