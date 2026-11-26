VIZ.def("da68_f_k_connected_city", {
  title: VIZ.L("BFS order from city 1: every prefix is connected", "ลำดับ BFS จากเมือง 1: ทุก prefix เชื่อมกันเอง"),
  input: "10 20 5\n7 2\n2 9\n2 1\n2 3\n9 4\n3 6\n4 5\n7 10\n10 8\n5 8\n2 8\n9 10\n7 6\n1 6\n4 8\n3 8\n3 5\n9 1\n1 8\n7 8",
  presets: [{ name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "10 20 5\n7 2\n2 9\n2 1\n2 3\n9 4\n3 6\n4 5\n7 10\n10 8\n5 8\n2 8\n9 10\n7 6\n1 6\n4 8\n3 8\n3 5\n9 1\n1 8\n7 8" },
            { name: VIZ.L("Sample 1 (a line)", "ตัวอย่าง 1 (เส้นตรง)"), input: "5 4 3\n5 1\n1 3\n3 4\n4 2" }],
  limit: VIZ.L("N ≤ 12", "N ≤ 12"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("city being expanded", "เมืองที่กำลังขยาย")], ["ok", VIZ.L("chosen (first K in BFS order)", "ถูกเลือก (K เมืองแรกในลำดับ BFS)")], ["vis", VIZ.L("discovered, waiting in the queue", "ถูกค้นพบ รออยู่ในคิว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int();
    S.check(n >= 2 && n <= 12 && k >= 1 && k <= n, L("keep N ≤ 12 and 1 ≤ K ≤ N", "ให้ N ≤ 12 และ 1 ≤ K ≤ N"));
    const adj = Array.from({ length: n + 1 }, () => []), edges = [];
    for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(); adj[a].push(b); adj[b].push(a); edges.push([a, b]); }
    const pos = VIZ.circle(n, 300, 250);
    const order = [1], via = Array(n + 1).fill(0), disc = Array(n + 1).fill(false); disc[1] = true;
    const view = (read, cur) => {
      const chosen = new Set(order.slice(0, Math.min(k, order.length)));
      return [{ t: "graph", title: L("roads (BFS tree edges highlighted)", "ถนน (เส้นของต้นไม้ BFS ถูกเน้น)"), W: 300, H: 250,
        n: [...Array(n).keys()].map(i => { const c = i + 1; return { id: c, x: pos[i].x, y: pos[i].y, c: c === cur ? "cur" : chosen.has(c) && order.indexOf(c) < read ? "ok" : disc[c] ? "vis" : "", s: disc[c] ? "#" + (order.indexOf(c) + 1) : "" }; }),
        e: edges.map(([a, b]) => ({ a, b, c: (via[b] === a || via[a] === b) ? (chosen.has(a) && chosen.has(b) ? "ok" : "vis") : "" })) },
        { t: "arr", title: L("order (the queue array; read = front)", "order (อาร์เรย์คิว; read = หัวคิว)"), a: order.map(String), c: Object.fromEntries(order.map((c, i) => [i, i < k ? "ok" : "vis"]).concat(read < order.length ? [[read, "cur"]] : [])), p: read < order.length ? { [read]: "read" } : {}, idx: 0 },
        { t: "vars", v: [["K", k], ["known", order.length, order.length >= k ? "ok" : ""]] }];
    };
    S.frame(L(`Start a BFS at city 1. We only need the first K = ${k} cities it reaches.`, `เริ่ม BFS ที่เมือง 1 ต้องการแค่ K = ${k} เมืองแรกที่ไปถึง`), view(0, 0));
    for (let read = 0; order.length < k; read++) {
      const c = order[read], added = [];
      for (const nx of adj[c]) if (!disc[nx]) { disc[nx] = true; via[nx] = c; order.push(nx); added.push(nx); }
      S.frame(L(`expand city ${c}: ` + (added.length ? `discover ${added.join(", ")} (each joins through road ${c}–x, so it touches a city already in the order).` : "nothing new."), `ขยายเมือง ${c}: ` + (added.length ? `ค้นพบ ${added.join(", ")} (แต่ละเมืองเข้ามาผ่านถนน ${c}–x จึงติดกับเมืองที่อยู่ในลำดับแล้ว)` : "ไม่มีเมืองใหม่")), view(read + 1, c));
    }
    S.frame(L(`${order.length} ≥ K cities known: stop. Answer: <b>${order.slice(0, k).join(" ")}</b>. Each of them was reached from an earlier one, so they are connected without leaving the set.`, `รู้แล้ว ${order.length} ≥ K เมือง: หยุด คำตอบ: <b>${order.slice(0, k).join(" ")}</b> แต่ละเมืองถูกไปถึงจากเมืองก่อนหน้า จึงเชื่อมกันโดยไม่ออกนอกเซต`), view(k, 0));
  }
});
