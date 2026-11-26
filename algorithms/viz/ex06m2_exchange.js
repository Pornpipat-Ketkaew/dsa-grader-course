VIZ.def("ex06m2_exchange", {
  title: VIZ.L("Rates → weights −log(rate): a profitable loop is a negative cycle", "อัตรา → น้ำหนัก −log(อัตรา): วงที่ได้กำไรคือวงรอบติดลบ"),
  input: "3\n1 0.7 1.2\n1.1 1 2\n0.75 0.7 1",
  presets: [{ name: VIZ.L("Sample table 1 (YES)", "ตารางตัวอย่าง 1 (YES)"), input: "3\n1 0.7 1.2\n1.1 1 2\n0.75 0.7 1" },
            { name: VIZ.L("Sample table 2 (NO)", "ตารางตัวอย่าง 2 (NO)"), input: "2\n1 0.7\n1.2 1" }],
  limit: VIZ.L("one table, N ≤ 5", "ตารางเดียว N ≤ 5"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("improved this round", "ดีขึ้นในรอบนี้")], ["bad", VIZ.L("loop of improvement pointers = negative cycle", "วงของตัวชี้การปรับ = วงรอบติดลบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 5, L("keep N ≤ 5", "ให้ N ≤ 5"));
    const R = []; for (let i = 0; i < n; i++) { R.push([]); for (let j = 0; j < n; j++) R[i].push(t.num()); }
    const W = R.map(r => r.map(x => x > 0 ? -Math.log(x) : Infinity)), f = x => x === Infinity ? "∞" : (Math.abs(x) < 5e-4 ? "0" : x.toFixed(3));
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 280, 220);
    const pot = Array(n).fill(0), par = Array(n).fill(-1);
    const view = (hl, cyc) => [{ t: "graph", title: L("currencies; edge label = rate R[a][b]", "สกุลเงิน; ตัวเลขบนเส้น = อัตรา R[a][b]"), W: 280, H: 220,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, s: "h=" + f(pot[v]), c: cyc && cyc.has(v) ? "bad" : hl && hl.has(v) ? "cur" : "" })),
        e: [].concat(...R.map((r, a) => r.map((x, b) => a !== b && x > 0 ? { a, b, w: String(x), d: true, bend: 16, c: cyc && cyc.has(a) && cyc.has(b) && par[b] === a ? "bad" : par[b] === a ? "vis" : "" } : null))).filter(Boolean) },
      { t: "table", title: L("weight = −log(rate)", "น้ำหนัก = −log(อัตรา)"), h: [...Array(n).keys()], rh: [...Array(n).keys()].map(String), corner: "a\\b", r: W.map(r => r.map(f)) },
      { t: "arr", title: L("lastImprovedFrom[v]", "lastImprovedFrom[v]"), a: par.map(String), idx: 0 }];
    S.frame(L("Money multiplies along a route. With weight −log(rate), a product > 1 becomes a sum < 0: infinite money ⇔ negative cycle. All potentials start at 0 (hidden source).", "เงินคูณกันตามเส้นทาง เมื่อใช้น้ำหนัก −log(อัตรา) ผลคูณ > 1 กลายเป็นผลรวม < 0: เงินไม่จำกัด ⇔ วงรอบติดลบ potential ทุกตัวเริ่มที่ 0 (ต้นทางลับ)"), view());
    for (let round = 1; round <= n; round++) {
      const hl = new Set();
      for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (pot[a] + W[a][b] < pot[b] - 1e-12) { pot[b] = pot[a] + W[a][b]; par[b] = a; hl.add(b); }
      if (!hl.size) { S.frame(L(`round ${round}: nothing improved → no negative cycle → <b>NO</b>.`, `รอบที่ ${round}: ไม่มีอะไรดีขึ้น → ไม่มีวงรอบติดลบ → <b>NO</b>`), view()); return; }
      let cyc = null;
      for (let s = 0; s < n && !cyc; s++) { const seen = new Map(); let x = s, k = 0; while (x !== -1 && !seen.has(x)) { seen.set(x, k++); x = par[x]; } if (x !== -1) { cyc = new Set(); let y = x; do { cyc.add(y); y = par[y]; } while (y !== x); } }
      if (cyc || round === n) { S.frame(L(`round ${round}: the pointers lastImprovedFrom form a loop (${[...(cyc || [])].join(" → ")}): each currency keeps improving the next one around the loop → <b>YES</b>.`, `รอบที่ ${round}: ตัวชี้ lastImprovedFrom เป็นวง (${[...(cyc || [])].join(" → ")}): แต่ละสกุลทำให้สกุลถัดไปดีขึ้นวนไปเรื่อย ๆ → <b>YES</b>`), view(hl, cyc)); return; }
      S.frame(L(`round ${round}: improved ${[...hl].join(", ")}; the pointers have no loop yet.`, `รอบที่ ${round}: ดีขึ้น ${[...hl].join(", ")}; ตัวชี้ยังไม่เป็นวง`), view(hl));
    }
  }
});
