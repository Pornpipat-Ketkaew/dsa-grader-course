VIZ.def("a58_q3_p3a_hacking", {
  title: VIZ.L("Multi-source Dijkstra: hack time = time of the attacker + c[victim]", "Dijkstra หลายต้นทาง: เวลาถูกแฮก = เวลาของผู้โจมตี + c[เหยื่อ]"),
  input: "4 4 1\n0\n2 5 3 1\n0 1\n0 2\n1 3\n2 3",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "4 4 1\n0\n2 5 3 1\n0 1\n0 2\n1 3\n2 3" },
            { name: VIZ.L("Sample 3 (two first targets)", "ตัวอย่าง 3 (เป้าแรกสองตัว)"), input: "4 3 2\n0 3\n4 3 2 1\n0 1\n1 2\n2 3" },
            { name: VIZ.L("Seven servers", "เซิร์ฟเวอร์เจ็ดตัว"), input: "7 8 2\n0 6\n3 9 2 4 1 7 5\n0 1\n1 2\n0 3\n3 4\n4 2\n2 5\n5 6\n6 4" }],
  limit: VIZ.L("n ≤ 9", "n ≤ 9"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("falls now (popped)", "ถูกแฮกตอนนี้ (pop)")], ["bad", VIZ.L("hacked (time final)", "ถูกแฮกแล้ว (เวลาสุดท้าย)")], ["vis", VIZ.L("tentative time", "เวลาชั่วคราว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int();
    S.check(n >= 1 && n <= 9, L("keep n ≤ 9", "ให้ n ≤ 9"));
    const first = []; for (let i = 0; i < k; i++) first.push(t.int());
    const c = []; for (let i = 0; i < n; i++) c.push(t.int());
    const adj = Array.from({ length: n }, () => []), edges = [];
    for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(); adj[a].push(b); adj[b].push(a); edges.push([a, b]); }
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 300, 240), time = Array(n).fill(Infinity), fin = Array(n).fill(false);
    let heap = [];
    const view = (cur, from) => [{ t: "graph", title: L("servers: inside = number, below = c[i] → hack time", "เซิร์ฟเวอร์: ข้างใน = หมายเลข, ข้างล่าง = c[i] → เวลาถูกแฮก"), W: 300, H: 240,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, s: `c=${c[v]} → ${time[v] === Infinity ? "∞" : time[v]}`, c: v === cur ? "cur" : fin[v] ? "bad" : time[v] < Infinity ? "vis" : "" })),
        e: edges.map(([a, b]) => ({ a, b, c: from != null && ((a === from && b === cur) || (b === from && a === cur)) ? "cur" : "" })) },
      { t: "list", title: L("heap (time, server)", "heap (เวลา, เซิร์ฟเวอร์)"), a: heap.slice().sort((x, y) => x[0] - y[0]).map(([d, v]) => `${d}:#${v}`), row: true }];
    const parent = Array(n).fill(null);
    for (const s of first) { time[s] = c[s]; heap.push([c[s], s]); }
    S.frame(L(`The first targets ${first.join(", ")} fall at time c[s]: ${first.map(s => `#${s} at ${c[s]}`).join(", ")}. They all go into the heap together.`, `เป้าแรก ${first.join(", ")} ถูกแฮกที่เวลา c[s]: ${first.map(s => `#${s} ที่ ${c[s]}`).join(", ")} ทั้งหมดเข้า heap พร้อมกัน`), view(-1));
    while (heap.length) {
      heap.sort((a, b) => a[0] - b[0]); const [d, u] = heap.shift(); if (d > time[u]) continue;
      fin[u] = true; const msg = [];
      for (const v of adj[u]) { const th = d + c[v]; if (th < time[v]) { time[v] = th; parent[v] = u; heap.push([th, v]); msg.push(`#${v} at ${d} + ${c[v]} = ${th}`); } }
      S.frame(L(`#${u} falls at ${d}` + (parent[u] != null ? ` (via #${parent[u]})` : " (first target)") + ". " + (msg.length ? "It attacks: " + msg.join(", ") + "." : "No neighbour gets an earlier time."), `#${u} ถูกแฮกที่ ${d}` + (parent[u] != null ? ` (ผ่าน #${parent[u]})` : " (เป้าแรก)") + " " + (msg.length ? "มันโจมตีต่อ: " + msg.join(", ") : "ไม่มีเพื่อนบ้านที่ได้เวลาเร็วขึ้น")), view(u, parent[u]));
    }
    S.frame(L(`Everything is hacked when the last server falls: max time = <b>${Math.max(...time)}</b>.`, `ทุกเครื่องถูกแฮกเมื่อเครื่องสุดท้ายถูกแฮก: เวลามากที่สุด = <b>${Math.max(...time)}</b>`), view(-1));
  }
});
