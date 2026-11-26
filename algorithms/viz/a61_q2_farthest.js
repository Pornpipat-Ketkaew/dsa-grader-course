VIZ.def("a61_q2_farthest", {
  title: VIZ.L("Dijkstra (array version): finalize the closest city, relax its roads", "Dijkstra (แบบอาร์เรย์): ยืนยันเมืองที่ใกล้ที่สุด แล้วผ่อนคลายถนนของมัน"),
  input: "5\n0 1 -1 -1 7\n-1 0 2 3 5\n-1 -1 0 4 -1\n-1 4 2 0 -1\n-1 -1 -1 4 0",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "5\n0 1 -1 -1 7\n-1 0 2 3 5\n-1 -1 0 4 -1\n-1 4 2 0 -1\n-1 -1 -1 4 0" },
            { name: VIZ.L("An unreachable city", "มีเมืองที่ไปไม่ถึง"), input: "4\n0 3 -1 -1\n-1 0 2 -1\n-1 -1 0 -1\n-1 -1 5 0" }],
  limit: VIZ.L("N ≤ 8", "N ≤ 8"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("just finalized", "เพิ่งยืนยัน")], ["ok", VIZ.L("finalized", "ยืนยันแล้ว")], ["vis", VIZ.L("road being relaxed", "ถนนที่กำลังผ่อนคลาย")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 2 && n <= 8, L("keep 2 ≤ N ≤ 8", "ให้ 2 ≤ N ≤ 8"));
    const w = []; for (let i = 0; i < n; i++) { w.push([]); for (let j = 0; j < n; j++) w[i].push(t.int()); }
    const pos = VIZ.circle(n, 300, 240), dist = Array(n).fill(Infinity), done = Array(n).fill(false); dist[0] = 0;
    const edges = []; for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (w[a][b] > 0) edges.push({ a, b, w: w[a][b], d: true, bend: w[b][a] > 0 ? 16 : 0 });
    const view = (cur, relaxed) => [{ t: "graph", title: L("roads (one-way); label under a city = distance", "ถนน (ทางเดียว); ตัวเลขใต้เมือง = ระยะทาง"), W: 300, H: 240,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, l: String(v + 1), s: dist[v] === Infinity ? "∞" : String(dist[v]), c: v === cur ? "cur" : done[v] ? "ok" : "" })),
        e: edges.map(e => Object.assign({}, e, { c: relaxed && relaxed.has(e.a + ">" + e.b) ? "vis" : "" })) },
      { t: "arr", title: L("distance[city]", "distance[city]"), a: dist.map(d => d === Infinity ? "∞" : d), c: Object.fromEntries(dist.map((_, v) => [v, v === cur ? "cur" : done[v] ? "ok" : ""])), idx: 1 }];
    S.frame(L("distance[capital] = 0, every other city ∞. Repeat: take the closest unfinalized city, its distance is final; then try every road out of it.", "distance[เมืองหลวง] = 0 เมืองอื่นเป็น ∞ ทำซ้ำ: เลือกเมืองที่ใกล้ที่สุดที่ยังไม่ยืนยัน ระยะของมันถือเป็นค่าสุดท้าย แล้วลองทุกถนนที่ออกจากมัน"), view(-1));
    for (let round = 0; round < n; round++) {
      let u = -1; for (let v = 0; v < n; v++) if (!done[v] && dist[v] < Infinity && (u < 0 || dist[v] < dist[u])) u = v;
      if (u < 0) { S.frame(L("No reachable city is left unfinalized: the remaining cities stay at ∞.", "ไม่มีเมืองที่ไปถึงได้เหลือแล้ว: เมืองที่เหลือคงเป็น ∞"), view(-1)); break; }
      done[u] = true; const rel = new Set(), msg = [];
      for (let v = 0; v < n; v++) if (w[u][v] > 0) { rel.add(u + ">" + v); if (dist[u] + w[u][v] < dist[v]) { msg.push(`${v + 1}: ${dist[v] === Infinity ? "∞" : dist[v]} → ${dist[u] + w[u][v]}`); dist[v] = dist[u] + w[u][v]; } }
      S.frame(L(`finalize city ${u + 1} (distance ${dist[u]}). Relax its roads: ` + (msg.length ? msg.join(", ") : "no improvement") + ".", `ยืนยันเมือง ${u + 1} (ระยะ ${dist[u]}) ผ่อนคลายถนนของมัน: ` + (msg.length ? msg.join(", ") : "ไม่มีค่าที่ดีขึ้น")), view(u, rel));
    }
    const ans = dist.some(d => d === Infinity) ? -1 : Math.max(...dist);
    S.frame(ans < 0 ? L("Some city is unreachable → <b>−1</b>.", "มีเมืองที่ไปไม่ถึง → <b>−1</b>") : L(`All cities reached. The farthest distance is <b>${ans}</b>.`, `ไปถึงทุกเมือง ระยะที่ไกลที่สุดคือ <b>${ans}</b>`), view(-1));
  }
});
