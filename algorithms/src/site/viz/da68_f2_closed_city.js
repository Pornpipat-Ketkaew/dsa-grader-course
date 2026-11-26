VIZ.def("da68_f2_closed_city", {
  title: VIZ.L("Delete the closed cities, then run Dijkstra on what is left", "ลบเมืองที่ปิดออก แล้วรัน Dijkstra บนส่วนที่เหลือ"),
  input: "5 6 2\n3 4\n1 2 5\n2 3 3\n3 5 2\n1 4 1\n4 5 2\n2 5 15",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5 6 2\n3 4\n1 2 5\n2 3 3\n3 5 2\n1 4 1\n4 5 2\n2 5 15" },
            { name: VIZ.L("Sample 1 (nothing closed)", "ตัวอย่าง 1 (ไม่มีเมืองปิด)"), input: "4 5 0\n\n1 2 3\n2 3 4\n3 4 2\n1 3 10\n2 4 20" }],
  limit: VIZ.L("N ≤ 9", "N ≤ 9"),
  maxFrames: 50,
  legend: [["cur", VIZ.L("popped (final)", "ถูก pop (ค่าสุดท้าย)")], ["ok", VIZ.L("final", "ค่าสุดท้าย")], ["dim", VIZ.L("closed city / unusable road", "เมืองปิด / ถนนที่ใช้ไม่ได้")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int();
    S.check(n >= 2 && n <= 9, L("keep N ≤ 9", "ให้ N ≤ 9"));
    const closed = Array(n + 1).fill(false); for (let i = 0; i < k; i++) closed[t.int()] = true;
    const roads = [], adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(), w = t.int(); roads.push([a, b, w]); if (!closed[a] && !closed[b]) { adj[a].push([b, w]); adj[b].push([a, w]); } }
    const pos = VIZ.circle(n, 300, 240), dist = Array(n + 1).fill(Infinity), fin = Array(n + 1).fill(false), par = Array(n + 1).fill(0); dist[1] = 0;
    let heap = [[0, 1]], done = false;
    const onPath = new Set(); const markPath = () => { for (let v = n; v && v !== 1; v = par[v]) onPath.add(par[v] + "-" + v).add(v + "-" + par[v]); };
    const view = (cur, deleted) => [{ t: "graph", title: L("roads (closed cities greyed out); label = distance from city 1", "ถนน (เมืองปิดเป็นสีเทา); ตัวเลข = ระยะจากเมือง 1"), W: 300, H: 240,
        n: [...Array(n).keys()].map(i => { const v = i + 1; return { id: v, x: pos[i].x, y: pos[i].y, s: closed[v] ? "closed" : dist[v] === Infinity ? "∞" : String(dist[v]), c: closed[v] && deleted ? "dim" : v === cur ? "cur" : fin[v] ? "ok" : "" }; }),
        e: roads.map(([a, b, w]) => ({ a, b, w, c: deleted && (closed[a] || closed[b]) ? "dim" : onPath.has(a + "-" + b) ? "ok" : "" })) },
      { t: "list", title: L("heap (distance, city)", "heap (ระยะ, เมือง)"), a: heap.slice().sort((x, y) => x[0] - y[0]).map(([d, v]) => `${d}:${v}`), row: true }];
    S.frame(L(`Closed: ${[...Array(n + 1).keys()].filter(v => closed[v]).join(", ") || "none"}. A path may not pass through them.`, `เมืองปิด: ${[...Array(n + 1).keys()].filter(v => closed[v]).join(", ") || "ไม่มี"} เส้นทางห้ามผ่านเมืองเหล่านี้`), view(-1, false));
    S.frame(L("So every road touching a closed city is never added to the graph. What remains is an ordinary shortest-path problem.", "ถนนทุกเส้นที่แตะเมืองปิดจึงไม่ถูกใส่ลงในกราฟเลย ที่เหลือคือโจทย์เส้นทางสั้นที่สุดธรรมดา"), view(-1, true));
    while (heap.length && !done) {
      heap.sort((a, b) => a[0] - b[0]); const [d, u] = heap.shift(); if (d > dist[u]) continue;
      fin[u] = true;
      if (u === n) { done = true; markPath(); S.frame(L(`city N = ${n} is popped with distance <b>${d}</b>: final, stop.`, `เมือง N = ${n} ถูก pop ด้วยระยะ <b>${d}</b>: เป็นค่าสุดท้าย หยุด`), view(u, true)); break; }
      const msg = []; for (const [v, w] of adj[u]) if (d + w < dist[v]) { dist[v] = d + w; par[v] = u; heap.push([dist[v], v]); msg.push(`${v}: ${dist[v]}`); }
      S.frame(L(`pop city ${u} (distance ${d}). ` + (msg.length ? "Improve " + msg.join(", ") + "." : "No improvement."), `pop เมือง ${u} (ระยะ ${d}) ` + (msg.length ? "ปรับ " + msg.join(", ") : "ไม่มีค่าที่ดีขึ้น")), view(u, true));
    }
  }
});
