VIZ.def("da66_f1_buffet_flight", {
  title: VIZ.L("Fees on airports become edge weights: co[a] + ci[b], then Dijkstra", "ค่าบริการที่สนามบินกลายเป็นน้ำหนักเส้น: co[a] + ci[b] แล้วใช้ Dijkstra"),
  input: "5 10\n5 7 3 4 8\n1 4 4 2 6\n0 3\n0 4\n4 3\n3 4\n0 1\n4 1\n1 2\n2 4\n2 0\n1 0",
  presets: [{ name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "5 10\n5 7 3 4 8\n1 4 4 2 6\n0 3\n0 4\n4 3\n3 4\n0 1\n4 1\n1 2\n2 4\n2 0\n1 0" },
            { name: VIZ.L("Sample 2 (airport 1 unreachable)", "ตัวอย่าง 2 (ไปสนามบิน 1 ไม่ได้)"), input: "4 6\n1 2 3 4\n9 8 7 6\n0 2\n0 3\n2 3\n1 0\n1 3\n1 2" }],
  limit: VIZ.L("n ≤ 8", "n ≤ 8"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("just finalized", "เพิ่งยืนยัน")], ["ok", VIZ.L("finalized", "ยืนยันแล้ว")], ["vis", VIZ.L("flight being relaxed", "เที่ยวบินที่กำลังผ่อนคลาย")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 1 && n <= 8, L("keep n ≤ 8", "ให้ n ≤ 8"));
    const ci = [], co = []; for (let i = 0; i < n; i++) ci.push(t.int()); for (let i = 0; i < n; i++) co.push(t.int());
    const fl = Array.from({ length: n }, () => Array(n).fill(false)), edges = [];
    for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(); fl[a][b] = true; }
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (fl[a][b]) edges.push({ a, b, w: co[a] + ci[b], d: true, bend: fl[b][a] ? 16 : 0 });
    const pos = n === 1 ? [{ x: 150, y: 120 }] : VIZ.circle(n, 300, 240), cost = Array(n).fill(Infinity), done = Array(n).fill(false); cost[0] = 0;
    const view = (cur, rel) => [{ t: "graph", title: L("flights, weight = co[from] + ci[to]; label = cost so far", "เที่ยวบิน น้ำหนัก = co[from] + ci[to]; ตัวเลข = ค่าใช้จ่ายตอนนี้"), W: 300, H: 240,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, s: cost[v] === Infinity ? "∞" : String(cost[v]), c: v === cur ? "cur" : done[v] ? "ok" : "" })),
        e: edges.map(e => Object.assign({}, e, { c: rel && rel.has(e.a + ">" + e.b) ? "vis" : "" })) },
      { t: "table", title: L("fees", "ค่าบริการ"), h: [...Array(n).keys()], rh: ["ci (landing)", "co (take-off)", "cost"], r: [ci, co, cost.map(c => c === Infinity ? "∞" : c)], c: cur >= 0 ? { ["2," + cur]: "cur" } : {} }];
    S.frame(L("A flight from a to b costs co[a] + ci[b], always positive. Put that number on the edge and run Dijkstra from airport 0.", "เที่ยวบินจาก a ไป b เสีย co[a] + ci[b] ซึ่งเป็นบวกเสมอ เขียนค่านั้นไว้บนเส้น แล้วรัน Dijkstra จากสนามบิน 0"), view(-1));
    for (let round = 0; round < n; round++) {
      let u = -1; for (let v = 0; v < n; v++) if (!done[v] && cost[v] < Infinity && (u < 0 || cost[v] < cost[u])) u = v;
      if (u < 0) break;
      done[u] = true; const rel = new Set(), msg = [];
      for (let v = 0; v < n; v++) if (fl[u][v]) { rel.add(u + ">" + v); const th = cost[u] + co[u] + ci[v]; if (th < cost[v]) { msg.push(`${v}: ${cost[v] === Infinity ? "∞" : cost[v]} → ${cost[u]} + ${co[u]} + ${ci[v]} = ${th}`); cost[v] = th; } }
      S.frame(L(`finalize airport ${u} (cost ${cost[u]}). ` + (msg.length ? "Improve " + msg.join("; ") : "No flight improves anything") + ".", `ยืนยันสนามบิน ${u} (ค่าใช้จ่าย ${cost[u]}) ` + (msg.length ? "ปรับ " + msg.join("; ") : "ไม่มีเที่ยวบินที่ทำให้ดีขึ้น")), view(u, rel));
    }
    S.frame(L(`Answer: <b>${cost.map(c => c === Infinity ? -1 : c).join(" ")}</b> (−1 = unreachable).`, `คำตอบ: <b>${cost.map(c => c === Infinity ? -1 : c).join(" ")}</b> (−1 = ไปไม่ถึง)`), view(-1));
  }
});
