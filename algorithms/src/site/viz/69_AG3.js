VIZ.def("69_AG3", {
  title: VIZ.L("Maximum spanning tree: Kruskal with the longest wires first", "ต้นไม้ทอดข้ามที่มากที่สุด: Kruskal เริ่มจากลวดที่ยาวที่สุด"),
  input: "5 7\n12 46 -3 -20 67\n0 1 30\n0 2 20\n0 4 18\n1 4 12\n2 3 24\n2 4 14\n3 4 27",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5 7\n12 46 -3 -20 67\n0 1 30\n0 2 20\n0 4 18\n1 4 12\n2 3 24\n2 4 14\n3 4 27" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2 1\n20 45\n0 1 60" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("line being considered", "เส้นที่กำลังพิจารณา")], ["ok", VIZ.L("taken into the network", "ใช้ในเครือข่าย")], ["bad", VIZ.L("skipped: would close a loop", "ข้าม: จะเกิดวงวน")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 2 && n <= 10, L("keep 2 ≤ N ≤ 10", "ให้ 2 ≤ N ≤ 10"));
    const H = []; for (let i = 0; i < n; i++) H.push(t.int());
    const R = []; for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(), d = t.int(); R.push({ a, b, d, len: Math.hypot(d, H[a] - H[b]), c: "" }); }
    const order = R.slice().sort((x, y) => y.len - x.len), par = [...Array(n).keys()], find = x => par[x] === x ? x : (par[x] = find(par[x]));
    const pos = VIZ.circle(n, 300, 240); let wire = 0, taken = 0;
    const view = () => [{ t: "graph", title: L("trees (under: height); label = wire length", "ต้นไม้ (ข้างล่าง: ความสูง); ตัวเลข = ความยาวลวด"), W: 300, H: 240,
        n: [...Array(n).keys()].map(i => ({ id: i, x: pos[i].x, y: pos[i].y, s: "h " + H[i], c: "k" + (find(i) % 7 + 1) })), e: R.map(r => ({ a: r.a, b: r.b, w: r.len.toFixed(1), c: r.c })) },
      { t: "table", title: L("lines, longest first", "เส้น เรียงจากยาวไปสั้น"), h: ["D", "ΔH", "√(D²+ΔH²)"], rh: order.map(r => r.a + "–" + r.b), corner: "line",
        r: order.map(r => [r.d, Math.abs(H[r.a] - H[r.b]), r.len.toFixed(2)]), c: Object.fromEntries(order.map((r, i) => [i + ",2", r.c])) },
      { t: "vars", v: [["wire", wire.toFixed(2), "ok"], ["lines taken", taken + " / " + (n - 1)]] }];
    S.frame(L("Wire length of a line = √(D² + ΔH²) (ground distance and height difference). Sort the lines longest first; take each one unless its two trees are already in one network (union-find). Node colour = current network.", "ความยาวลวดของเส้น = √(D² + ΔH²) (ระยะพื้นและผลต่างความสูง) เรียงเส้นจากยาวไปสั้น เลือกทีละเส้น ยกเว้นต้นไม้ทั้งสองอยู่ในเครือข่ายเดียวกันแล้ว (union-find) สีของต้นไม้ = เครือข่ายปัจจุบัน"), view());
    for (const r of order) {
      const x = find(r.a), y = find(r.b);
      r.c = "cur";
      if (x === y) { r.c = "bad"; S.frame(L(`${r.a}–${r.b} (${r.len.toFixed(2)}): already in one network → a loop, skip.`, `${r.a}–${r.b} (${r.len.toFixed(2)}): อยู่ในเครือข่ายเดียวกันแล้ว → เกิดวงวน ข้าม`), view()); continue; }
      par[x] = y; r.c = "ok"; wire += r.len; taken++;
      S.frame(L(`${r.a}–${r.b} (${r.len.toFixed(2)}): joins two networks → take it. Wire = ${wire.toFixed(2)}.`, `${r.a}–${r.b} (${r.len.toFixed(2)}): เชื่อมสองเครือข่าย → ใช้ ลวดรวม = ${wire.toFixed(2)}`), view());
    }
    S.frame(L(`All trees are in one network with ${taken} lines and no loop: total wire <b>${wire.toFixed(2)}</b>.`, `ต้นไม้ทั้งหมดอยู่ในเครือข่ายเดียวด้วย ${taken} เส้นและไม่มีวงวน: ลวดรวม <b>${wire.toFixed(2)}</b>`), view());
  }
});
