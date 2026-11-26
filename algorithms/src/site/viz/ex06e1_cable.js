VIZ.def("ex06e1_cable", {
  title: VIZ.L("Prim (array version): grow one tree by the cheapest link", "Prim (แบบอาร์เรย์): ขยายต้นไม้ต้นเดียวด้วยสายที่ถูกที่สุด"),
  input: "5\n4 3 6 7\n4 2 5\n6 5\n7",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5\n4 3 6 7\n4 2 5\n6 5\n7" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "4\n1 3 4\n2 7\n6" }],
  limit: VIZ.L("N ≤ 7", "N ≤ 7"),
  maxFrames: 40,
  legend: [["cur", VIZ.L("joins the tree now", "เข้าต้นไม้ตอนนี้")], ["ok", VIZ.L("in the tree / tree cable", "อยู่ในต้นไม้ / สายของต้นไม้")], ["vis", VIZ.L("current cheapest link of an outside centre", "สายที่ถูกที่สุดตอนนี้ของศูนย์ที่อยู่นอกต้นไม้")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 2 && n <= 7, L("keep 2 ≤ N ≤ 7", "ให้ 2 ≤ N ≤ 7"));
    const w = Array.from({ length: n }, () => Array(n).fill(0));
    for (let a = 0; a < n - 1; a++) for (let b = a + 1; b < n; b++) w[a][b] = w[b][a] = t.int();
    const pos = VIZ.circle(n, 300, 240), best = Array(n).fill(Infinity), from = Array(n).fill(-1), inT = Array(n).fill(false); best[0] = 0; let total = 0;
    const view = (cur) => { const e = []; for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) { const tree = (from[b] === a && inT[b]) || (from[a] === b && inT[a]); const link = (!inT[b] && from[b] === a) || (!inT[a] && from[a] === b); e.push({ a, b, w: w[a][b], c: tree ? "ok" : link ? "vis" : "dim" }); }
      return [{ t: "graph", title: L("all possible cables (a complete graph)", "สายที่เป็นไปได้ทั้งหมด (กราฟสมบูรณ์)"), W: 300, H: 240, n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, s: inT[v] ? "" : "link " + (best[v] === Infinity ? "∞" : best[v]), c: v === cur ? "cur" : inT[v] ? "ok" : "" })), e },
        { t: "arr", title: L("cheapestLink[v]", "cheapestLink[v]"), a: best.map((b, v) => inT[v] ? "✓" : b === Infinity ? "∞" : b), c: Object.fromEntries(inT.map((x, v) => [v, v === cur ? "cur" : x ? "ok" : ""])), idx: 0 },
        { t: "vars", v: [["total", total, "ok"]] }]; };
    S.frame(L("Start the tree at centre 0 (cost 0). cheapestLink[v] = cheapest cable from v to the tree so far.", "เริ่มต้นไม้ที่ศูนย์ 0 (ราคา 0) cheapestLink[v] = สายที่ถูกที่สุดจาก v ไปยังต้นไม้ตอนนี้"), view(-1));
    for (let r = 0; r < n; r++) {
      let u = -1; for (let v = 0; v < n; v++) if (!inT[v] && (u < 0 || best[v] < best[u])) u = v;
      inT[u] = true; total += best[u];
      const msg = []; for (let v = 0; v < n; v++) if (!inT[v] && w[u][v] < best[v]) { best[v] = w[u][v]; from[v] = u; msg.push(`${v}: ${w[u][v]}`); }
      S.frame(L(`take centre ${u}` + (r ? ` with its cheapest link ${from[u]}–${u} (cost ${w[from[u]][u]})` : "") + `; total = ${total}. ` + (msg.length ? `Cables from ${u} give cheaper links: ${msg.join(", ")}.` : ""), `เลือกศูนย์ ${u}` + (r ? ` ด้วยสายที่ถูกที่สุด ${from[u]}–${u} (ราคา ${w[from[u]][u]})` : "") + ` รวม = ${total} ` + (msg.length ? `สายจาก ${u} ให้ราคาที่ถูกลง: ${msg.join(", ")}` : "")), view(u));
    }
    S.frame(L(`All ${n} centres are in the tree: minimum total = <b>${total}</b>.`, `ศูนย์ทั้ง ${n} อยู่ในต้นไม้แล้ว: ราคารวมน้อยที่สุด = <b>${total}</b>`), view(-1));
  }
});
