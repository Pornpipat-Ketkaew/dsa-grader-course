VIZ.def("a62_q2a_line_graph", {
  title: VIZ.L("One traversal per component: max degree and edge count", "ท่องหนึ่งครั้งต่อ component: degree สูงสุดและจำนวนเส้น"),
  input: "9 7\n0 1\n1 2\n3 4\n4 5\n5 3\n6 7\n6 8",
  presets: [{ name: VIZ.L("Path, ring, path drawn as a V", "เส้นตรง, วงแหวน, เส้นตรงที่วาดเป็นรูป V"), input: "9 7\n0 1\n1 2\n3 4\n4 5\n5 3\n6 7\n6 8" },
            { name: VIZ.L("Sample 5 (isolated nodes count)", "ตัวอย่าง 5 (ปมโดดเดี่ยวนับด้วย)"), input: "6 2\n1 2\n3 4" },
            { name: VIZ.L("Sample 6 (K4)", "ตัวอย่าง 6 (K4)"), input: "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3" }],
  limit: VIZ.L("v ≤ 12", "v ≤ 12"),
  maxFrames: 80,
  legend: [["ok", VIZ.L("line component", "component ที่เป็นเส้นตรง")], ["bad", VIZ.L("not a line", "ไม่ใช่เส้นตรง")], ["cur", VIZ.L("component being explored", "component ที่กำลังสำรวจ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), v = t.int(), e = t.int();
    S.check(v >= 1 && v <= 12, L("keep v ≤ 12", "ให้ v ≤ 12"));
    const adj = Array.from({ length: v }, () => []), edges = [];
    for (let i = 0; i < e; i++) { const a = t.int(), b = t.int(); adj[a].push(b); adj[b].push(a); edges.push([a, b]); }
    const pos = v === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(v, 300, 240);
    const verdict = Array(v).fill(""); const rows = []; let count = 0;
    const view = (curSet) => [{ t: "graph", title: L("graph (label under a node = its degree)", "กราฟ (ตัวเลขใต้ปม = degree)"), W: 300, H: 240,
        n: [...Array(v).keys()].map(x => ({ id: x, x: pos[x].x, y: pos[x].y, s: "deg " + adj[x].length, c: curSet && curSet.has(x) ? "cur" : verdict[x] })),
        e: edges.map(([a, b]) => ({ a, b, c: curSet && curSet.has(a) ? "cur" : verdict[a] })) },
      { t: "table", title: L("components found", "component ที่พบ"), h: ["nodes", "max degree", "edges", "nodes − 1", "line?"], r: rows.map(r => r.slice(1)), rh: rows.map(r => r[0]), corner: "start", c: Object.fromEntries(rows.map((r, i) => [i + ",4", r[5] === "yes" ? "ok" : "bad"])) },
      { t: "vars", v: [["lineComponents", count, "ok"]] }];
    S.frame(L("A line = a path: no node with degree > 2, and no cycle (edges = nodes − 1). Check both per component.", "เส้นตรง = path: ไม่มีปมที่ degree > 2 และไม่มีวงรอบ (เส้น = ปม − 1) ตรวจทั้งสองข้อในแต่ละ component"), view(null));
    const seen = Array(v).fill(false);
    for (let s = 0; s < v; s++) {
      if (seen[s]) continue;
      const comp = [], st = [s]; seen[s] = true;
      while (st.length) { const x = st.pop(); comp.push(x); for (const y of adj[x]) if (!seen[y]) { seen[y] = true; st.push(y); } }
      const set = new Set(comp), nodes = comp.length, maxd = Math.max(...comp.map(x => adj[x].length)), ed = comp.reduce((a, x) => a + adj[x].length, 0) / 2;
      const ok = maxd <= 2 && ed === nodes - 1;
      S.frame(L(`DFS from ${s} reaches {${comp.sort((a, b) => a - b).join(", ")}}: ${nodes} nodes, max degree ${maxd}, degree sum / 2 = ${ed} edges.`, `DFS จาก ${s} ไปถึง {${comp.join(", ")}}: ${nodes} ปม, degree สูงสุด ${maxd}, ผลรวม degree / 2 = ${ed} เส้น`), view(set));
      rows.push([String(s), nodes, maxd, ed, nodes - 1, ok ? "yes" : "no"]); if (ok) count++;
      comp.forEach(x => verdict[x] = ok ? "ok" : "bad");
      const why = ok ? L("degrees ≤ 2 and a tree → a line.", "degree ≤ 2 และเป็นต้นไม้ → เส้นตรง") : maxd > 2 ? L(`a node has degree ${maxd} > 2 → it branches, not a line.`, `มีปมที่ degree ${maxd} > 2 → แตกกิ่ง ไม่ใช่เส้นตรง`) : L(`${ed} edges = nodes: one edge too many → a ring, not a line.`, `${ed} เส้น = จำนวนปม: เกินมาหนึ่งเส้น → วงแหวน ไม่ใช่เส้นตรง`);
      S.frame(why, view(null));
    }
    S.frame(L(`Done: <b>${count}</b> line component(s).`, `เสร็จ: <b>${count}</b> component ที่เป็นเส้นตรง`), view(null));
  }
});
