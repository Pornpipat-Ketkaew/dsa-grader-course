VIZ.def("69_AG4", {
  title: VIZ.L("Dijkstra on (room, portals used) states", "Dijkstra บนสถานะ (ห้อง, จำนวนครั้งที่ใช้ปืน)"),
  input: "4 3 1\n1 3 1\n2 3 100\n2 4 5",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "4 3 1\n1 3 1\n2 3 100\n2 4 5" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "5 6 1\n1 2 4\n1 3 2\n2 4 5\n3 4 8\n4 5 3\n2 5 10" },
            { name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "8 7 2\n1 2 8\n1 4 20\n3 4 2\n3 8 10\n2 4 10\n6 7 0\n4 5 1" }],
  limit: VIZ.L("N ≤ 8, K ≤ 3", "N ≤ 8, K ≤ 3"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("state popped now (final)", "สถานะที่ pop ตอนนี้ (สิ้นสุด)")], ["ok", VIZ.L("final", "สิ้นสุดแล้ว")], ["vis", VIZ.L("improved by this pop", "ถูกปรับให้ดีขึ้นจากการ pop นี้")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), K = t.int();
    S.check(n >= 1 && n <= 8 && K >= 0 && K <= 3, L("keep N ≤ 8 and K ≤ 3", "ให้ N ≤ 8 และ K ≤ 3"));
    const E = [], adj = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < m; i++) { const u = t.int(), v = t.int(), w = t.int(); E.push({ a: u, b: v, w }); adj[u].push([v, w, i]); adj[v].push([u, w, i]); }
    const best = Array.from({ length: K + 1 }, () => Array(n + 1).fill(Infinity)), done = Array.from({ length: K + 1 }, () => Array(n + 1).fill(false));
    const pos = VIZ.circle(n, 300, 220);
    let heap = [[0, 0, 1]]; best[0][1] = 0;
    const view = (cu, cr, improved, edgeCls) => {
      const c = {};
      for (let k = 0; k <= K; k++) for (let v = 1; v <= n; v++) if (done[k][v]) c[k + "," + (v - 1)] = "ok";
      (improved || []).forEach(([k, v]) => c[k + "," + (v - 1)] = "vis");
      if (cu != null) c[cu + "," + (cr - 1)] = "cur";
      return [{ t: "graph", title: L("rooms (label = tunnel time)", "ห้อง (ตัวเลข = เวลาเดินทาง)"), W: 300, H: 220,
          n: [...Array(n).keys()].map(i => ({ id: i + 1, x: pos[i].x, y: pos[i].y, c: i + 1 === cr ? "cur" : i + 1 === n ? "path" : "" })), e: E.map((e, i) => ({ a: e.a, b: e.b, w: e.w, c: (edgeCls || {})[i] || "", bend: n % 2 === 0 && Math.abs(e.a - e.b) === n / 2 ? 30 : 0 })) },
        { t: "table", title: L("best[used][room]", "best[used][room]"), h: [...Array(n).keys()].map(i => i + 1), rh: [...Array(K + 1).keys()].map(k => "used " + k), corner: "",
          r: best.map(row => row.slice(1).map(x => x === Infinity ? "∞" : x)), c },
        { t: "list", title: L("heap (time, used, room)", "heap (เวลา, used, ห้อง)"), a: heap.slice().sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]).map(h => `(${h[0]}, ${h[1]}, ${h[2]})`), row: true }];
    };
    S.frame(L(`Copy the map K + 1 = ${K + 1} times: layer "used = k" means k portal shots are spent. A tunnel either costs its time inside a layer, or costs 0 and moves one layer down. Start at (used 0, room 1) with time 0.`, `คัดลอกแผนที่ K + 1 = ${K + 1} ชั้น: ชั้น "used = k" หมายถึงใช้ปืนไปแล้ว k ครั้ง ทางเชื่อมหนึ่งเส้นจะเสียเวลาของมันภายในชั้นเดิม หรือเสีย 0 แล้วลงไปชั้นถัดไป เริ่มที่ (used 0, ห้อง 1) เวลา 0`), view());
    let answer = null;
    while (heap.length) {
      heap.sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
      const [d, k, v] = heap.shift();
      if (d > best[k][v] || done[k][v]) continue;
      done[k][v] = true;
      if (v === n) { answer = d; S.frame(L(`pop (${d}, used ${k}, room ${v}): the exit. Dijkstra pops states in increasing time, so this is the fastest escape: <b>${d}</b>.`, `pop (${d}, ใช้ ${k}, ห้อง ${v}): ทางออก Dijkstra pop สถานะตามเวลาจากน้อยไปมาก นี่จึงเป็นการหนีที่เร็วที่สุด: <b>${d}</b>`), view(k, v)); break; }
      const improved = [], edgeCls = {}, notes = [];
      for (const [u, w, i] of adj[v]) {
        if (d + w < best[k][u]) { best[k][u] = d + w; heap.push([d + w, k, u]); improved.push([k, u]); edgeCls[i] = "ok"; notes.push(L(`walk to ${u}: ${d + w}`, `เดินไป ${u}: ${d + w}`)); }
        if (k < K && d < best[k + 1][u]) { best[k + 1][u] = d; heap.push([d, k + 1, u]); improved.push([k + 1, u]); edgeCls[i] = edgeCls[i] || "vis"; notes.push(L(`portal to ${u} (used ${k + 1}): ${d}`, `ใช้ปืนไป ${u} (ใช้ ${k + 1}): ${d}`)); }
      }
      S.frame(L(`pop (${d}, used ${k}, room ${v}): final. Improved: ${notes.map(x => x.en).join("; ") || "nothing"}.`, `pop (${d}, ใช้ ${k}, ห้อง ${v}): สิ้นสุด ปรับได้: ${notes.map(x => x.th).join("; ") || "ไม่มี"}`), view(k, v, improved, edgeCls));
    }
    if (answer === null) S.frame(L("The heap is empty.", "heap ว่าง"), view());
  }
});
