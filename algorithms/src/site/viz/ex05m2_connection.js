VIZ.def("ex05m2_connection", {
  title: VIZ.L("BFS cut off at depth K, once per student", "BFS ที่หยุดที่ความลึก K ทำครั้งละหนึ่งนักเรียน"),
  input: "7 8 2\n0 6\n1 6\n1 5\n1 4\n2 3\n3 4\n4 5\n5 6",
  presets: [{ name: VIZ.L("Sample (K = 2)", "ตัวอย่าง (K = 2)"), input: "7 8 2\n0 6\n1 6\n1 5\n1 4\n2 3\n3 4\n4 5\n5 6" },
            { name: VIZ.L("Same graph, K = 1", "กราฟเดิม K = 1"), input: "7 8 1\n0 6\n1 6\n1 5\n1 4\n2 3\n3 4\n4 5\n5 6" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("BFS source", "ต้นทาง BFS")], ["ok", VIZ.L("within distance K", "อยู่ในระยะ K")], ["vis", VIZ.L("at distance exactly K: not expanded", "อยู่ที่ระยะ K พอดี: ไม่ขยายต่อ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), e = t.int(), k = t.int();
    S.check(n >= 1 && n <= 10, L("keep N ≤ 10", "ให้ N ≤ 10"));
    const adj = Array.from({ length: n }, () => []), edges = [];
    for (let i = 0; i < e; i++) { const a = t.int(), b = t.int(); adj[a].push(b); adj[b].push(a); edges.push([a, b]); }
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 280, 220);
    const counts = Array(n).fill(""); let best = 0;
    const view = (src, dist) => [{ t: "graph", title: L("friendships (label = distance from the source)", "ความเป็นเพื่อน (ตัวเลข = ระยะจากต้นทาง)"), W: 280, H: 220,
        n: [...Array(n).keys()].map(x => ({ id: x, x: pos[x].x, y: pos[x].y, s: dist && dist[x] >= 0 ? "d=" + dist[x] : "", c: x === src ? "cur" : dist && dist[x] >= 0 ? (dist[x] === k ? "vis" : "ok") : "" })),
        e: edges.map(([a, b]) => ({ a, b, c: dist && dist[a] >= 0 && dist[b] >= 0 && Math.abs(dist[a] - dist[b]) === 1 ? "ok" : "" })) },
      { t: "arr", title: L("friends within K, per student", "จำนวนเพื่อนในระยะ K ของแต่ละคน"), a: counts.map(String), c: src >= 0 ? { [src]: "cur" } : {}, idx: 0 },
      { t: "vars", v: [["K", k], ["best", best, "ok"]] }];
    S.frame(L(`"Degree K friends" = everyone at distance ≤ K, including yourself. BFS finds distances level by level, so run one BFS per student and stop at level K.`, `"เพื่อนระดับ K" = ทุกคนที่ระยะ ≤ K รวมตัวเอง BFS หาระยะทีละชั้น จึงรัน BFS ครั้งละหนึ่งคน แล้วหยุดที่ชั้น K`), view(-1));
    for (let s = 0; s < n; s++) {
      const dist = Array(n).fill(-1), q = [s]; dist[s] = 0;
      for (let r = 0; r < q.length; r++) { const u = q[r]; if (dist[u] === k) continue; for (const w of adj[u]) if (dist[w] < 0) { dist[w] = dist[u] + 1; q.push(w); } }
      counts[s] = q.length; best = Math.max(best, q.length);
      S.frame(L(`BFS from ${s}: levels ` + [...Array(k + 1).keys()].map(d => `${d}: {${q.filter(x => dist[x] === d).join(", ")}}`).join(", ") + ` → ${q.length} friends.`, `BFS จาก ${s}: ชั้น ` + [...Array(k + 1).keys()].map(d => `${d}: {${q.filter(x => dist[x] === d).join(", ")}}`).join(", ") + ` → เพื่อน ${q.length} คน`), view(s, dist));
    }
    S.frame(L(`Answer: the maximum, <b>${best}</b>.`, `คำตอบ: ค่ามากที่สุด <b>${best}</b>`), view(-1));
  }
});
