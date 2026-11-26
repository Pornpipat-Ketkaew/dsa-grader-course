VIZ.def("da68_f_internet_provider", {
  title: VIZ.L("Kruskal, then let K modems replace the K − 1 longest tree cables", "Kruskal แล้วให้ modem K เครื่องแทนสายในต้นไม้ที่ยาวที่สุด K − 1 เส้น"),
  input: "9 8 1 3\n1 2 5\n2 3 1\n2 4 2\n2 8 8\n2 6 9\n4 5 4\n6 7 3\n6 9 6",
  presets: [{ name: VIZ.L("Sample 3 (K = 3)", "ตัวอย่าง 3 (K = 3)"), input: "9 8 1 3\n1 2 5\n2 3 1\n2 4 2\n2 8 8\n2 6 9\n4 5 4\n6 7 3\n6 9 6" },
            { name: VIZ.L("Sample 2 (K = 2)", "ตัวอย่าง 2 (K = 2)"), input: "5 6 10 2\n1 2 5\n1 5 7\n2 5 3\n2 4 6\n3 4 2\n4 5 9" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 40,
  legend: [["cur", VIZ.L("route being considered", "เส้นทางที่กำลังพิจารณา")], ["ok", VIZ.L("tree cable (kept)", "สายในต้นไม้ (เก็บไว้)")], ["bad", VIZ.L("skipped: would close a cycle", "ข้าม: จะเกิดวงรอบ")], ["path", VIZ.L("replaced by modems", "ถูกแทนด้วย modem")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), U = t.int(), K = t.int();
    S.check(n >= 1 && n <= 10, L("keep N ≤ 10", "ให้ N ≤ 10"));
    const R = []; for (let i = 0; i < m; i++) R.push({ a: t.int(), b: t.int(), d: t.int(), c: "" });
    const order = R.slice().sort((x, y) => x.d - y.d), par = [...Array(n + 1).keys()], find = x => par[x] === x ? x : (par[x] = find(par[x]));
    const pos = VIZ.circle(n, 300, 240), tree = [];
    const view = () => [{ t: "graph", title: L("possible cable routes (label = length)", "เส้นทางวางสาย (ตัวเลข = ความยาว)"), W: 300, H: 240,
        n: [...Array(n).keys()].map(i => ({ id: i + 1, x: pos[i].x, y: pos[i].y, c: "k" + ((find(i + 1) - 1) % 7 + 1) })), e: R.map(r => ({ a: r.a, b: r.b, w: r.d, c: r.c })) },
      { t: "list", title: L("tree cables, shortest first", "สายในต้นไม้ เรียงจากสั้นไปยาว"), a: tree.map(r => `${r.a}-${r.b}:${r.d}`), c: Object.fromEntries(tree.map((r, i) => [i, r.c === "path" ? "path" : ""])), row: true }];
    S.frame(L("Kruskal: sort the routes by length and take each one unless its two cities are already connected (union-find). Node colour = current component.", "Kruskal: เรียงเส้นทางตามความยาว แล้วเลือกทีละเส้น ยกเว้นเมืองทั้งสองเชื่อมกันอยู่แล้ว (union-find) สีของเมือง = component ปัจจุบัน"), view());
    for (const r of order) {
      const x = find(r.a), y = find(r.b);
      if (x === y) { r.c = "bad"; S.frame(L(`${r.a}–${r.b} (${r.d}): both already in one component → skip.`, `${r.a}–${r.b} (${r.d}): อยู่ใน component เดียวกันแล้ว → ข้าม`), view()); continue; }
      par[x] = y; r.c = "ok"; tree.push(r);
      S.frame(L(`${r.a}–${r.b} (${r.d}): joins two components → keep.`, `${r.a}–${r.b} (${r.d}): เชื่อมสอง component → เก็บไว้`), view());
    }
    const drop = Math.max(0, K - 1);
    for (let i = tree.length - drop; i < tree.length; i++) tree[i].c = "path";
    const kept = tree.slice(0, tree.length - drop).reduce((s, r) => s + r.d, 0);
    S.frame(L(`Removing a tree cable splits the network into one more piece; K modems reconnect K pieces for free. So drop the K − 1 = ${drop} longest tree cable(s): ${tree.slice(tree.length - drop).map(r => r.d).join(", ") || "none"}. Cost = ${kept} m × ${U} = <b>${kept * U}</b>.`, `การถอดสายในต้นไม้หนึ่งเส้นทำให้เครือข่ายแยกเพิ่มหนึ่งชิ้น modem K เครื่องเชื่อม K ชิ้นได้ฟรี จึงถอดสายที่ยาวที่สุด K − 1 = ${drop} เส้น: ${tree.slice(tree.length - drop).map(r => r.d).join(", ") || "ไม่มี"} ค่าใช้จ่าย = ${kept} ม. × ${U} = <b>${kept * U}</b>`), view());
  }
});
