VIZ.def("a60a_q3_component", {
  title: VIZ.L("Counting components: a new DFS from every node not reached yet", "นับ component: เริ่ม DFS ใหม่จากทุกปมที่ยังไม่ถูกไปถึง"),
  input: "10 7\n1 2\n2 3\n3 4\n1 3\n2 4\n5 6\n6 7",
  presets: [{ name: VIZ.L("Sample 5", "ตัวอย่าง 5"), input: "10 7\n1 2\n2 3\n3 4\n1 3\n2 4\n5 6\n6 7" },
            { name: VIZ.L("Sample 4", "ตัวอย่าง 4"), input: "5 2\n1 2\n4 5" }],
  limit: VIZ.L("v ≤ 10", "v ≤ 10"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("node being expanded", "ปมที่กำลังขยาย")], ["vis", VIZ.L("on the stack", "อยู่ใน stack")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), v = t.int(), e = t.int();
    S.check(v >= 1 && v <= 10, L("keep v ≤ 10", "ให้ v ≤ 10"));
    const adj = Array.from({ length: v + 1 }, () => []), edges = [];
    for (let i = 0; i < e; i++) { const a = t.int(), b = t.int(); adj[a].push(b); adj[b].push(a); edges.push([a, b]); }
    // lay out each component in its own small circle so the picture shows the answer's structure
    const par = [...Array(v + 1).keys()], find = x => par[x] === x ? x : (par[x] = find(par[x]));
    edges.forEach(([a, b]) => { par[find(a)] = find(b); });
    const groups = []; const gi = {}; for (let i = 1; i <= v; i++) { const r = find(i); if (!(r in gi)) { gi[r] = groups.length; groups.push([]); } groups[gi[r]].push(i); }
    const pos = []; let x = 0, y = 0, rowH = 0, W = 0;
    groups.forEach(g => { const rad = g.length === 1 ? 0 : 18 + 9 * g.length, w = 2 * rad + 50;
      if (x + w > 420 && x > 0) { x = 0; y += rowH; rowH = 0; }
      g.forEach((node, k) => { const ang = -Math.PI / 2 + 2 * Math.PI * k / g.length; pos[node - 1] = { x: Math.round(x + w / 2 + rad * Math.cos(ang)), y: Math.round(y + 25 + rad + rad * Math.sin(ang)) }; });
      x += w; W = Math.max(W, x); rowH = Math.max(rowH, 2 * rad + 60); });
    const H = y + rowH;
    const comp = Array(v + 1).fill(0); let count = 0; const stack = [];
    const view = (cur) => [{ t: "graph", title: L("graph (fill = component number)", "กราฟ (สีพื้น = หมายเลข component)"), W: Math.max(W, 120), H,
        n: [...Array(v).keys()].map(i => ({ id: i + 1, x: pos[i].x, y: pos[i].y, s: comp[i + 1] ? "C" + comp[i + 1] : "", c: (comp[i + 1] ? "k" + ((comp[i + 1] - 1) % 7 + 1) : "") + (i + 1 === cur ? " cur" : stack.includes(i + 1) ? " vis" : "") })),
        e: edges.map(([a, b]) => ({ a, b, c: cur && (a === cur || b === cur) ? "cur" : "" })) },
      { t: "list", title: L("stack (top at the right)", "stack (บนสุดอยู่ขวา)"), a: stack.map(String), row: true },
      { t: "vars", v: [["components", count, "ok"]] }];
    S.frame(L("Scan start = 1..v. A node that is still unvisited cannot be connected to any component found so far, so it opens a new one.", "ไล่ start = 1..v ปมที่ยังไม่ถูกเยี่ยมเชื่อมกับ component ที่เจอแล้วไม่ได้ จึงเปิด component ใหม่"), view(0));
    for (let s = 1; s <= v; s++) {
      if (comp[s]) continue;
      count++; comp[s] = count; stack.push(s);
      S.frame(L(`start = ${s} is unvisited → component #${count}; push ${s}.`, `start = ${s} ยังไม่ถูกเยี่ยม → component ที่ ${count}; push ${s}`), view(0));
      while (stack.length) {
        const node = stack.pop(), pushed = [];
        for (const nx of adj[node]) if (!comp[nx]) { comp[nx] = count; stack.push(nx); pushed.push(nx); }
        S.frame(L(`pop ${node}: ` + (pushed.length ? `mark and push its unvisited neighbours ${pushed.join(", ")}.` : "no unvisited neighbours."), `pop ${node}: ` + (pushed.length ? `ทำเครื่องหมายและ push เพื่อนบ้านที่ยังไม่ถูกเยี่ยม ${pushed.join(", ")}` : "ไม่มีเพื่อนบ้านที่ยังไม่ถูกเยี่ยม")), view(node));
      }
      S.frame(L(`stack empty: component #${count} is complete.`, `stack ว่าง: component ที่ ${count} ครบแล้ว`), view(0));
    }
    S.frame(L(`Done: <b>${count}</b> components.`, `เสร็จ: <b>${count}</b> component`), view(0));
  }
});
