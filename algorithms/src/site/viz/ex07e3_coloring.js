VIZ.def("ex07e3_coloring", {
  title: VIZ.L("Branch and bound coloring, most constrained vertex first", "ระบายสีแบบ branch and bound เลือกจุดที่ถูกบังคับมากที่สุดก่อน"),
  input: "5 5\n0 1\n1 2\n2 3\n3 4\n4 0",
  presets: [{ name: VIZ.L("5-cycle", "วง 5 จุด"), input: "5 5\n0 1\n1 2\n2 3\n3 4\n4 0" },
            { name: VIZ.L("Sample (K4)", "ตัวอย่าง (K4)"), input: "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3" },
            { name: VIZ.L("Wheel: 5-cycle + hub", "วงล้อ: วง 5 จุด + ดุม"), input: "6 10\n0 1\n1 2\n2 3\n3 4\n4 0\n5 0\n5 1\n5 2\n5 3\n5 4" }],
  limit: VIZ.L("N ≤ 7", "N ≤ 7"),
  maxFrames: 500,
  legend: [["cur", VIZ.L("vertex being colored", "จุดที่กำลังระบาย")], ["bad", VIZ.L("blocked / cut", "ใช้ไม่ได้ / ถูกตัด")], ["ok", VIZ.L("new best", "ดีที่สุดใหม่")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), E = t.int();
    S.check(n >= 1 && n <= 7, L("keep N ≤ 7", "ให้ N ≤ 7"));
    const adj = Array.from({ length: n }, () => Array(n).fill(false)), deg = Array(n).fill(0), edges = [];
    for (let i = 0; i < E; i++) { const a = t.int(), b = t.int(); if (a !== b && !adj[a][b]) { adj[a][b] = adj[b][a] = true; deg[a]++; deg[b]++; edges.push([a, b]); } }
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 300, 230);
    const color = Array(n).fill(0); let best = n + 1, bestColoring = [];
    const sat = v => new Set([...Array(n).keys()].filter(u => adj[v][u] && color[u]).map(u => color[u])).size;
    const view = (cur, extra) => {
      extra = extra || {};
      return [{ t: "graph", title: L("graph (fill = color number)", "กราฟ (สีพื้น = หมายเลขสี)"), W: 300, H: 230,
        n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, l: String(v), s: color[v] ? "c" + color[v] : "", c: (color[v] ? "k" + color[v] : "") + (v === cur ? " cur" : "") })),
        e: edges.map(([a, b]) => ({ a, b, c: extra.block && ((a === cur && b === extra.block) || (b === cur && a === extra.block)) ? "bad" : "" })) },
        { t: "table", title: L("choosing the next vertex", "การเลือกจุดถัดไป"), h: [...Array(n).keys()], rh: ["color", "saturation", "degree"],
          r: [color.map(c => c || "·"), [...Array(n).keys()].map(v => color[v] ? "–" : sat(v)), deg], c: cur >= 0 ? { [`1,${cur}`]: "cur", [`2,${cur}`]: "cur" } : {} },
        { t: "vars", v: [["colorsUsed", extra.used == null ? "–" : extra.used, "cur"], ["bestColors", best > n ? "∞" : best, "ok"]] }];
    };
    const search = (colored, used) => {
      if (used >= best) { S.frame(L(`${used} colors in use ≥ best ${best} → this branch cannot be better, cut.`, `ใช้ไปแล้ว ${used} สี ≥ best ${best} → กิ่งนี้ดีกว่าไม่ได้ ตัด`), view(-1, { used })); return; }
      if (colored === n) { best = used; bestColoring = [...color]; S.frame(L(`all ${n} vertices colored with ${used} colors → bestColors = ${used}.`, `ระบายครบ ${n} จุดด้วย ${used} สี → bestColors = ${used}`), view(-1, { used })); return; }
      let v = -1;
      for (let u = 0; u < n; u++) { if (color[u]) continue; if (v < 0 || sat(u) > sat(v) || (sat(u) === sat(v) && deg[u] > deg[v])) v = u; }
      S.frame(L(`pick vertex ${v}: largest saturation ${sat(v)} (distinct colors next to it), degree ${deg[v]} breaks ties.`, `เลือกจุด ${v}: saturation มากที่สุด ${sat(v)} (จำนวนสีต่างกันที่อยู่ติด) ใช้ degree ${deg[v]} ตัดสินเมื่อเสมอ`), view(v, { used }));
      for (let c = 1; c <= used; c++) {
        const blocker = [...Array(n).keys()].find(u => adj[v][u] && color[u] === c);
        if (blocker !== undefined) { S.frame(L(`color ${c} for vertex ${v}: neighbor ${blocker} already has it → skip.`, `สี ${c} ให้จุด ${v}: เพื่อนบ้าน ${blocker} ใช้อยู่แล้ว → ข้าม`), view(v, { used, block: blocker })); continue; }
        color[v] = c;
        S.frame(L(`color vertex ${v} with existing color ${c}.`, `ระบายจุด ${v} ด้วยสีเดิม ${c}`), view(v, { used }));
        search(colored + 1, used);
        color[v] = 0;
      }
      color[v] = used + 1;
      S.frame(L(`open a new color ${used + 1} for vertex ${v} (any unused color is equivalent, so only one is tried).`, `เปิดสีใหม่ ${used + 1} ให้จุด ${v} (สีที่ยังไม่ใช้ทุกสีเหมือนกัน จึงลองแค่สีเดียว)`), view(v, { used: used + 1 }));
      search(colored + 1, used + 1);
      color[v] = 0;
    };
    S.frame(L("Start: nothing colored, 0 colors in use, bestColors = ∞.", "เริ่ม: ยังไม่ระบายอะไร ใช้ 0 สี bestColors = ∞"), view(-1, { used: 0 }));
    search(0, 0);
    bestColoring.forEach((c, v) => color[v] = c);
    S.frame(L(`Search finished: minimum <b>${best}</b> colors (the best coloring found is shown).`, `ค้นหาเสร็จ: ใช้น้อยที่สุด <b>${best}</b> สี (แสดงการระบายที่ดีที่สุดที่พบ)`), view(-1));
  }
});
