VIZ.def("a59_q3_cycle", {
  title: VIZ.L("Peeling leaves until only the cycle is left", "ลอกใบออกจนเหลือแค่วงวน"),
  input: "9\n0 1\n0 2\n1 3\n1 4\n2 5\n2 6\n2 7\n4 5\n5 8",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "9\n0 1\n0 2\n1 3\n1 4\n2 5\n2 6\n2 7\n4 5\n5 8" },
            { name: VIZ.L("Triangle with a long tail", "สามเหลี่ยมที่มีหางยาว"), input: "7\n0 1\n1 2\n2 0\n2 3\n3 4\n4 5\n5 6" }],
  limit: VIZ.L("n ≤ 12", "n ≤ 12"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("leaf being removed", "ใบที่กำลังถูกลบ")], ["vis", VIZ.L("current leaves (degree 1)", "ใบปัจจุบัน (degree 1)")], ["ok", VIZ.L("the cycle", "วงวน")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 12, L("keep n ≤ 12", "ให้ n ≤ 12"));
    const adj = Array.from({ length: n }, () => []), edges = [], deg = Array(n).fill(0);
    for (let i = 0; i < n; i++) { const a = t.int(), b = t.int(); adj[a].push(b); adj[b].push(a); edges.push([a, b]); deg[a]++; deg[b]++; }
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 300, 240);
    const removed = Array(n).fill(false), leaves = []; let remaining = n, done = false;
    for (let v = 0; v < n; v++) if (deg[v] === 1) leaves.push(v);
    const view = (cur) => [{ t: "graph", title: L("graph (label = current degree)", "กราฟ (ตัวเลข = degree ปัจจุบัน)"), W: 300, H: 240,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, s: removed[v] ? "" : "deg " + deg[v], c: v === cur ? "cur" : removed[v] ? "dim" : done ? "ok" : leaves.includes(v) ? "vis" : "" })),
        e: edges.map(([a, b]) => ({ a, b, c: removed[a] || removed[b] ? "dim" : done ? "ok" : "" })) },
      { t: "list", title: L("leaves waiting (a stack)", "ใบที่รออยู่ (stack)"), a: leaves.map(String), row: true },
      { t: "vars", v: [["remaining", remaining, done ? "ok" : ""]] }];
    S.frame(L("A node of degree 1 is a dead end: no cycle can pass through it. Collect all such leaves.", "ปมที่ degree 1 เป็นทางตัน: ไม่มีวงวนไหนผ่านได้ เก็บใบแบบนี้ทั้งหมด"), view(-1));
    while (leaves.length) {
      const leaf = leaves.pop(); removed[leaf] = true; remaining--; const nb = [];
      for (const w of adj[leaf]) if (!removed[w]) { deg[w]--; nb.push(w); if (deg[w] === 1) leaves.push(w); }
      deg[leaf] = 0;
      S.frame(L(`remove leaf ${leaf}; neighbour ${nb.join(", ")} loses one degree` + (nb.some(w => deg[w] === 1) ? ` and becomes a new leaf.` : "."), `ลบใบ ${leaf}; เพื่อนบ้าน ${nb.join(", ")} เสีย degree ไปหนึ่ง` + (nb.some(w => deg[w] === 1) ? ` และกลายเป็นใบใหม่` : "")), view(leaf));
    }
    done = true;
    S.frame(L(`No leaves left: every remaining node has degree 2, so they form the cycle. Its size = <b>${remaining}</b> nodes = ${remaining} edges.`, `ไม่มีใบเหลือ: ทุกปมที่เหลือมี degree 2 จึงเป็นวงวน ขนาด = <b>${remaining}</b> ปม = ${remaining} เส้น`), view(-1));
  }
});
