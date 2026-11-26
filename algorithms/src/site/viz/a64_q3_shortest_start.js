VIZ.def("a64_q3_shortest_start", {
  title: VIZ.L("Bellman–Ford from all starts at once (every start begins at 0)", "Bellman–Ford จากทุกจุดเริ่มพร้อมกัน (ทุกจุดเริ่มมีค่า 0)"),
  input: "6 6 4\n5\n4 3 0 1\n0 1 10\n1 2 5\n1 3 7\n2 5 -4\n3 2 2\n1 4 8",
  presets: [{ name: VIZ.L("Sample 2 (negative edge)", "ตัวอย่าง 2 (เส้นติดลบ)"), input: "6 6 4\n5\n4 3 0 1\n0 1 10\n1 2 5\n1 3 7\n2 5 -4\n3 2 2\n1 4 8" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "5 4 2\n4\n0 1\n0 1 1\n1 2 1\n2 4 1\n3 4 2" }],
  limit: VIZ.L("n ≤ 8", "n ≤ 8"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("edge relaxed in this step", "เส้นที่ผ่อนคลายในขั้นนี้")], ["ok", VIZ.L("start (distance 0)", "จุดเริ่ม (ระยะ 0)")], ["sel", VIZ.L("goal", "เป้าหมาย")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int(), goal = t.int();
    S.check(n >= 1 && n <= 8, L("keep n ≤ 8", "ให้ n ≤ 8"));
    const starts = []; for (let i = 0; i < k; i++) starts.push(t.int());
    const E = []; for (let i = 0; i < m; i++) E.push([t.int(), t.int(), t.int()]);
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 300, 240), dist = Array(n).fill(Infinity); starts.forEach(s => dist[s] = 0);
    const hist = [];
    const view = (hl) => [{ t: "graph", title: L("directed graph, label = distance", "กราฟมีทิศทาง ตัวเลข = ระยะ"), W: 300, H: 240,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, s: dist[v] === Infinity ? "∞" : String(dist[v]), c: v === goal ? "sel" : starts.includes(v) ? "ok" : "" })),
        e: E.map(([a, b, w], i) => ({ a, b, w, d: true, bend: E.some(([x, y]) => x === b && y === a) ? 16 : 0, c: hl && hl.has(i) ? "cur" : "" })) },
      { t: "table", title: L("distance after each round", "ระยะหลังแต่ละรอบ"), h: [...Array(n).keys()], rh: hist.map(h => h[0]), corner: "round", r: hist.map(h => h[1]), c: Object.fromEntries(hist.map((_, i) => [i + "," + goal, "sel"])) }];
    hist.push(["start", dist.map(d => d === Infinity ? "∞" : d)]);
    S.frame(L(`Weights can be negative, so Dijkstra is not safe: use Bellman–Ford. All starts (${starts.join(", ")}) get distance 0 at once, like one hidden source joined to them by 0-weight edges.`, `น้ำหนักติดลบได้ Dijkstra จึงไม่ปลอดภัย: ใช้ Bellman–Ford ทุกจุดเริ่ม (${starts.join(", ")}) ได้ระยะ 0 พร้อมกัน เหมือนมีต้นทางลับที่เชื่อมกับพวกมันด้วยเส้นน้ำหนัก 0`), view());
    for (let round = 1; round < n; round++) {
      const hl = new Set(), msg = [];
      E.forEach(([a, b, w], i) => { if (dist[a] === Infinity) return; if (dist[a] + w < dist[b]) { dist[b] = dist[a] + w; hl.add(i); msg.push(`${b} = ${dist[a]} + (${w}) = ${dist[b]}`); } });
      hist.push([String(round), dist.map(d => d === Infinity ? "∞" : d)]);
      S.frame(msg.length ? L(`round ${round}: relax every edge once, in input order. Improved: ${msg.join(", ")}.`, `รอบที่ ${round}: ผ่อนคลายทุกเส้นหนึ่งครั้งตามลำดับในข้อมูลเข้า ดีขึ้น: ${msg.join(", ")}`) : L(`round ${round}: nothing changed → every distance is final, stop early.`, `รอบที่ ${round}: ไม่มีอะไรเปลี่ยน → ทุกระยะเป็นค่าสุดท้าย หยุดก่อนได้`), view(hl));
      if (!msg.length) break;
    }
    S.frame(L(`Answer: distance[${goal}] = <b>${dist[goal]}</b>.`, `คำตอบ: distance[${goal}] = <b>${dist[goal]}</b>`), view());
  }
});
