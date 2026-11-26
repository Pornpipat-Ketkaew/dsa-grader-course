VIZ.def("ex06e2_shortest", {
  title: VIZ.L("Bellman–Ford: n − 1 rounds settle everything; a change in round n means a negative cycle", "Bellman–Ford: n − 1 รอบทำให้ทุกค่านิ่ง ถ้ารอบที่ n ยังเปลี่ยนแปลว่ามีวงรอบติดลบ"),
  input: "4 3 0\n1 2 -1\n2 3 -1\n3 1 -1",
  presets: [{ name: VIZ.L("Sample 2 (negative cycle, unreachable)", "ตัวอย่าง 2 (วงรอบติดลบ ไปไม่ถึง)"), input: "4 3 0\n1 2 -1\n2 3 -1\n3 1 -1" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "4 3 0\n0 1 -1\n1 2 1\n2 3 4" },
            { name: VIZ.L("Negative edge, no cycle", "เส้นติดลบ ไม่มีวงรอบ"), input: "4 5 0\n0 1 4\n0 2 5\n2 1 -3\n1 3 2\n2 3 4" }],
  limit: VIZ.L("N ≤ 7", "N ≤ 7"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("edge that improved something this round", "เส้นที่ทำให้ค่าดีขึ้นในรอบนี้")], ["bad", VIZ.L("still improving in round n: negative cycle", "ยังดีขึ้นในรอบที่ n: วงรอบติดลบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), e = t.int(), s = t.int();
    S.check(n >= 1 && n <= 7, L("keep N ≤ 7", "ให้ N ≤ 7"));
    const E = []; for (let i = 0; i < e; i++) E.push([t.int(), t.int(), t.int()]);
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 280, 220);
    let pot = Array(n).fill(0), hist = [];
    const fmt = a => a.map(x => x === Infinity ? "∞" : x);
    const view = (vals, hl, cls, title) => [{ t: "graph", title: L("graph", "กราฟ"), W: 280, H: 220,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, s: vals[v] === Infinity ? "∞" : String(vals[v]), c: v === s ? "sel" : "" })),
        e: E.map(([a, b, w], i) => ({ a, b, w, d: true, bend: E.some(([x, y]) => x === b && y === a) ? 16 : 0, c: hl && hl.has(i) ? cls : "" })) },
      { t: "table", title, h: [...Array(n).keys()], rh: hist.map(h => h[0]), corner: "round", r: hist.map(h => h[1]) }];
    hist.push(["start", fmt(pot)]);
    const t1 = L("phase 1: every vertex starts at 0 (hidden source)", "ขั้น 1: ทุกจุดเริ่มที่ 0 (ต้นทางลับ)");
    S.frame(L("Phase 1, cycle check: start EVERY vertex at 0, as if a hidden source had a 0-edge to each one. Then any negative cycle, reachable from s or not, keeps lowering values forever.", "ขั้น 1 ตรวจวงรอบ: ให้ทุกจุดเริ่มที่ 0 เหมือนต้นทางลับมีเส้น 0 ไปทุกจุด วงรอบติดลบใด ๆ ไม่ว่า s ไปถึงหรือไม่ จะลดค่าไปเรื่อย ๆ"), view(pot, null, "", t1));
    let changed = true;
    for (let round = 1; round <= n && changed; round++) {
      changed = false; const hl = new Set();
      E.forEach(([a, b, w], i) => { if (pot[a] + w < pot[b]) { pot[b] = pot[a] + w; changed = true; hl.add(i); } });
      hist.push([String(round), fmt(pot)]);
      if (round === n && changed) { S.frame(L(`round ${round} = n still changes values. A graph without negative cycles is settled after n − 1 rounds → negative cycle → print <b>−1</b>.`, `รอบที่ ${round} = n ยังเปลี่ยนค่า กราฟที่ไม่มีวงรอบติดลบจะนิ่งหลัง n − 1 รอบ → มีวงรอบติดลบ → พิมพ์ <b>−1</b>`), view(pot, hl, "bad", t1)); return; }
      S.frame(changed ? L(`round ${round}: some values dropped.`, `รอบที่ ${round}: มีค่าลดลง`) : L(`round ${round}: nothing changed → no negative cycle anywhere.`, `รอบที่ ${round}: ไม่มีอะไรเปลี่ยน → ไม่มีวงรอบติดลบเลย`), view(pot, hl, "cur", t1));
    }
    hist = []; const dist = Array(n).fill(Infinity); dist[s] = 0; hist.push(["start", fmt(dist)]);
    const t2 = L(`phase 2: Bellman–Ford from s = ${s}`, `ขั้น 2: Bellman–Ford จาก s = ${s}`);
    S.frame(L(`Phase 2: ordinary Bellman–Ford from s = ${s}.`, `ขั้น 2: Bellman–Ford ธรรมดาจาก s = ${s}`), view(dist, null, "", t2));
    for (let round = 1; round < n; round++) {
      let ch = false; const hl = new Set();
      E.forEach(([a, b, w], i) => { if (dist[a] === Infinity) return; if (dist[a] + w < dist[b]) { dist[b] = dist[a] + w; ch = true; hl.add(i); } });
      hist.push([String(round), fmt(dist)]);
      S.frame(ch ? L(`round ${round}: relax all edges.`, `รอบที่ ${round}: ผ่อนคลายทุกเส้น`) : L(`round ${round}: no change, stop.`, `รอบที่ ${round}: ไม่เปลี่ยน หยุด`), view(dist, hl, "cur", t2));
      if (!ch) break;
    }
    S.frame(L(`Answer: <b>${fmt(dist).join(" ")}</b>.`, `คำตอบ: <b>${fmt(dist).join(" ")}</b>`), view(dist, null, "", t2));
  }
});
