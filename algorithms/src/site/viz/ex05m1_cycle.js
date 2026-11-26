VIZ.def("ex05m1_cycle", {
  title: VIZ.L("BFS with parents: a discovered neighbour that is not my parent closes a cycle", "BFS พร้อม parent: เพื่อนบ้านที่ถูกค้นพบแล้วและไม่ใช่ parent ปิดวงรอบ"),
  input: "7 7\n0 1\n1 2\n2 3\n0 4\n4 5\n5 3\n6 0",
  presets: [{ name: VIZ.L("Cycle 0-1-2-3-5-4", "วงรอบ 0-1-2-3-5-4"), input: "7 7\n0 1\n1 2\n2 3\n0 4\n4 5\n5 3\n6 0" },
            { name: VIZ.L("Sample graph 3 (triangle + isolated)", "กราฟตัวอย่าง 3 (สามเหลี่ยม + ปมเดี่ยว)"), input: "4 3\n0 1\n1 2\n2 0" },
            { name: VIZ.L("A tree: no cycle", "ต้นไม้: ไม่มีวงรอบ"), input: "6 5\n0 1\n0 2\n1 3\n1 4\n2 5" }],
  limit: VIZ.L("one graph, N ≤ 10", "กราฟเดียว N ≤ 10"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("node being expanded", "ปมที่กำลังขยาย")], ["ok", VIZ.L("BFS tree edge", "เส้นของต้นไม้ BFS")], ["bad", VIZ.L("non-tree edge = cycle", "เส้นนอกต้นไม้ = วงรอบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), e = t.int();
    S.check(n >= 1 && n <= 10, L("keep N ≤ 10", "ให้ N ≤ 10"));
    const adj = Array.from({ length: n }, () => []), edges = [];
    for (let i = 0; i < e; i++) { const a = t.int(), b = t.int(); adj[a].push(b); adj[b].push(a); edges.push([a, b]); }
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 300, 240);
    const parent = Array(n).fill(-2), queue = [];
    const view = (cur, bad, look) => [{ t: "graph", title: L("graph", "กราฟ"), W: 300, H: 240,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, c: v === cur ? "cur" : parent[v] !== -2 ? "vis" : "", s: parent[v] === -1 ? "root" : parent[v] >= 0 ? "p=" + parent[v] : "" })),
        e: edges.map(([a, b]) => ({ a, b, c: bad && ((bad[0] === a && bad[1] === b) || (bad[0] === b && bad[1] === a)) ? "bad" : parent[b] === a || parent[a] === b ? "ok" : look && ((look[0] === a && look[1] === b) || (look[0] === b && look[1] === a)) ? "cur" : "" })) },
      { t: "arr", title: L("parent[v]  (−2 = undiscovered, −1 = root)", "parent[v]  (−2 = ยังไม่ค้นพบ, −1 = ราก)"), a: parent.map(String), c: cur >= 0 ? { [cur]: "cur" } : {}, idx: 0 },
      { t: "list", title: L("queue", "คิว"), a: queue.map(String), row: true }];
    S.frame(L("Run BFS from every undiscovered vertex and remember each vertex's parent.", "รัน BFS จากทุกจุดที่ยังไม่ถูกค้นพบ และจำ parent ของแต่ละจุด"), view(-1));
    for (let s = 0; s < n; s++) {
      if (parent[s] !== -2) continue;
      parent[s] = -1; queue.push(s);
      S.frame(L(`vertex ${s} is undiscovered: it roots a new BFS.`, `จุด ${s} ยังไม่ถูกค้นพบ: เป็นรากของ BFS ใหม่`), view(s));
      for (let read = queue.length - 1; read < queue.length; read++) {
        const u = queue[read];
        for (const w of adj[u]) {
          if (parent[w] === -2) { parent[w] = u; queue.push(w); S.frame(L(`${u} – ${w}: ${w} is new → tree edge, parent[${w}] = ${u}.`, `${u} – ${w}: ${w} ยังใหม่ → เส้นของต้นไม้ parent[${w}] = ${u}`), view(u)); }
          else if (w === parent[u]) S.frame(L(`${u} – ${w}: this is the edge back to my own parent → ignore.`, `${u} – ${w}: เป็นเส้นกลับไปหา parent ของตัวเอง → ข้าม`), view(u, null, [u, w]));
          else { S.frame(L(`${u} – ${w}: ${w} is already discovered and is not ${u}'s parent → a second path between them → <b>YES</b>, cycle.`, `${u} – ${w}: ${w} ถูกค้นพบแล้วและไม่ใช่ parent ของ ${u} → มีเส้นทางที่สองระหว่างกัน → <b>YES</b> มีวงรอบ`), view(u, [u, w])); return; }
        }
      }
    }
    S.frame(L("Every edge was a tree edge or the edge back to a parent: the graph is a forest → <b>NO</b>.", "ทุกเส้นเป็นเส้นของต้นไม้หรือเส้นกลับไปหา parent: กราฟเป็นป่า → <b>NO</b>"), view(-1));
  }
});
