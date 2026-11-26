VIZ.def("a64_q4_path_sum", {
  title: VIZ.L("Growing simple paths with a range bound", "ต่อ simple path ทีละเส้นพร้อมขอบเขตช่วงค่า"),
  input: "4 4\n10 20 30 40 50 60 70 80\n0 1 10\n0 2 15\n1 2 5\n0 3 35",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "4 4\n10 20 30 40 50 60 70 80\n0 1 10\n0 2 15\n1 2 5\n0 3 35" },
            { name: VIZ.L("Square with a diagonal", "สี่เหลี่ยมมีเส้นทแยง"), input: "4 5\n3 6 9 12 14 17 2 20\n0 1 3\n1 2 4\n2 3 5\n3 0 6\n0 2 2" }],
  limit: VIZ.L("n ≤ 6", "n ≤ 6"),
  maxFrames: 400,
  legend: [["path", VIZ.L("current path", "เส้นทางปัจจุบัน")], ["cur", VIZ.L("path end", "ปลายเส้นทาง")], ["ok", VIZ.L("query answered YES", "คำถามที่ตอบ YES แล้ว")], ["bad", VIZ.L("cut: no open query in range", "ตัด: ไม่มีคำถามที่ยังเปิดอยู่ในช่วง")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 1 && n <= 6, L("keep n ≤ 6", "ให้ n ≤ 6"));
    const target = [], found = Array(8).fill(false);
    for (let q = 0; q < 8; q++) target.push(t.int());
    const nb = Array.from({ length: n }, () => []), edges = [], heavy = Array(n).fill(0);
    for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(), w = t.int(); if (a === b) continue; nb[a].push([b, w]); nb[b].push([a, w]); edges.push([a, b, w]); heavy[a] = Math.max(heavy[a], w); heavy[b] = Math.max(heavy[b], w); }
    nb.forEach(l => l.sort((x, y) => y[1] - x[1]));
    const pos = VIZ.circle(n, 300, 220);
    let open = 8, rest = heavy.reduce((a, b) => a + b, 0);
    const on = Array(n).fill(false), path = [];
    const view = (sum, lo, hi, cut) => {
      const inPath = new Set(); for (let i = 1; i < path.length; i++) inPath.add(Math.min(path[i - 1], path[i]) + "-" + Math.max(path[i - 1], path[i]));
      return [{ t: "graph", title: L("graph (node label below = heaviest edge)", "กราฟ (ตัวเลขใต้โหนด = เส้นที่หนักที่สุด)"), W: 300, H: 220,
          n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, l: String(v), s: "max " + heavy[v], c: v === path[path.length - 1] ? (cut ? "bad" : "cur") : on[v] ? "path" : "" })),
          e: edges.map(([a, b, w]) => ({ a, b, w, c: inPath.has(Math.min(a, b) + "-" + Math.max(a, b)) ? "path" : "" })) },
        { t: "table", title: L("the 8 queries", "คำถามทั้ง 8 ข้อ"), h: target.map((_, q) => "K" + (q + 1)), rh: ["target", "answer"], r: [target, found.map(f => f ? "YES" : "·")],
          c: Object.fromEntries(target.flatMap((k, q) => found[q] ? [[`0,${q}`, "ok"], [`1,${q}`, "ok"]] : (lo != null && lo <= k && k <= hi ? [[`0,${q}`, "cur"]] : []))) },
        { t: "vars", v: [["path", path.join("→") || "–", "path"], ["pathWeight", sum == null ? "–" : sum], ["remainingGain", rest], [L("reachable range", "ช่วงที่ไปถึงได้"), lo == null ? "–" : `${lo}..${hi}`, cut ? "bad" : "cur"], ["open", open]] }];
    };
    const ext = (node, sum) => {
      const lo = sum, hi = sum + rest;
      const any = target.some((k, q) => !found[q] && lo <= k && k <= hi);
      if (!any) { S.frame(L(`path ${path.join("→")} weight ${sum}: every longer path stays in ${lo}..${hi} and no open query is there → cut.`, `เส้นทาง ${path.join("→")} น้ำหนัก ${sum}: เส้นทางที่ยาวขึ้นอยู่ในช่วง ${lo}..${hi} และไม่มีคำถามที่ยังเปิดอยู่ในช่วงนี้ → ตัด`), view(sum, lo, hi, true)); return; }
      const hit = target.map((k, q) => !found[q] && k === sum ? q : -1).filter(q => q >= 0);
      hit.forEach(q => { found[q] = true; open--; });
      S.frame(hit.length ? L(`path ${path.join("→")} has weight ${sum} → answers ${hit.map(q => "K" + (q + 1)).join(", ")} = YES.`, `เส้นทาง ${path.join("→")} น้ำหนัก ${sum} → ตอบ ${hit.map(q => "K" + (q + 1)).join(", ")} = YES`)
        : L(`path ${path.join("→")} weight ${sum}; reachable range ${lo}..${hi} still holds an open query → keep extending (heaviest edge first).`, `เส้นทาง ${path.join("→")} น้ำหนัก ${sum} ช่วงที่ไปถึงได้ ${lo}..${hi} ยังมีคำถามเปิดอยู่ → ต่อไป (เส้นหนักก่อน)`), view(sum, lo, hi));
      for (const [nx, w] of nb[node]) {
        if (open === 0) return;
        if (on[nx]) continue;
        on[nx] = true; rest -= heavy[nx]; path.push(nx);
        ext(nx, sum + w);
        on[nx] = false; rest += heavy[nx]; path.pop();
      }
    };
    S.frame(L("remainingGain starts as the sum of every node's heaviest edge. Each node's edges are sorted heaviest first.", "remainingGain เริ่มจากผลรวมของเส้นที่หนักที่สุดของทุกโหนด เส้นของแต่ละโหนดเรียงจากหนักไปเบา"), view());
    for (let s = 0; s < n && open > 0; s++) {
      on[s] = true; rest -= heavy[s]; path.push(s);
      ext(s, 0);
      on[s] = false; rest += heavy[s]; path.pop();
    }
    S.frame(L(`Finished: ${found.map(f => f ? "YES" : "NO").join(" ")}.`, `เสร็จ: ${found.map(f => f ? "YES" : "NO").join(" ")}`), view());
  }
});
