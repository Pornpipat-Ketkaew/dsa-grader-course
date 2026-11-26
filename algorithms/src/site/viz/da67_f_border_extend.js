VIZ.def("da67_f_border_extend", {
  title: VIZ.L("Multi-source BFS from all land, stopped at distance k", "BFS หลายต้นทางจากแผ่นดินทั้งหมด หยุดที่ระยะ k"),
  input: "5 5 2\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 1 0\n0 1 0 0 0\n0 0 0 0 0",
  presets: [{ name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "5 5 2\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 1 0\n0 1 0 0 0\n0 0 0 0 0" },
            { name: VIZ.L("Sample 4", "ตัวอย่าง 4"), input: "4 6 2\n0 1 1 1 1 0\n0 0 1 0 1 1\n0 0 0 1 0 0\n0 0 0 1 0 0" }],
  limit: VIZ.L("R, C ≤ 10", "R, C ≤ 10"),
  maxFrames: 40,
  legend: [["sel", VIZ.L("original land", "แผ่นดินเดิม")], ["cur", VIZ.L("reached in this layer", "ไปถึงในชั้นนี้")], ["ok", VIZ.L("filled earlier (shows its distance)", "ถมแล้ว (แสดงระยะ)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int(), k = t.int();
    S.check(R >= 1 && R <= 10 && C >= 1 && C <= 10, L("keep R, C ≤ 10", "ให้ R, C ≤ 10"));
    const g = [], dist = []; let q = [];
    for (let r = 0; r < R; r++) { g.push([]); dist.push([]); for (let c = 0; c < C; c++) { const x = t.int(); g[r].push(x); dist[r].push(x === 1 ? 0 : -1); if (x === 1) q.push([r, c]); } }
    let filled = 0;
    const view = (d, final) => { const c = {}; const grid = g.map((row, r) => row.map((x, cc) => { const k_ = r + "," + cc;
        if (x === 1) { c[k_] = "sel"; return final ? "1" : "■"; } if (dist[r][cc] < 0) return final ? "0" : ""; c[k_] = dist[r][cc] === d && !final ? "cur" : "ok"; return final ? "2" : String(dist[r][cc]); }));
      return [{ t: "grid", title: final ? L("output map", "แผนที่ผลลัพธ์") : L("distance from the nearest land", "ระยะจากแผ่นดินที่ใกล้ที่สุด"), g: grid, c, rl: Array.from({ length: R }, (_, i) => i + 1), cl: Array.from({ length: C }, (_, i) => i + 1) }, { t: "vars", v: [["layer", d], ["k", k], ["filled", filled, "ok"]] }]; };
    S.frame(L("All land cells enter the queue at distance 0 together. BFS layers then give every water cell its distance to the NEAREST land.", "ทุกช่องแผ่นดินเข้าคิวที่ระยะ 0 พร้อมกัน ชั้นของ BFS จึงให้ระยะไปยังแผ่นดินที่ใกล้ที่สุดแก่ทุกช่องน้ำ"), view(0));
    for (let d = 1; d <= k && q.length; d++) {
      const nq = [];
      for (const [r, c] of q) for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { const a = r + dr, b = c + dc; if (a < 0 || a >= R || b < 0 || b >= C || dist[a][b] >= 0) continue; dist[a][b] = d; nq.push([a, b]); }
      q = nq; filled += q.length;
      S.frame(L(`layer ${d}: ${q.length} water cell(s) are exactly ${d} step(s) from land → they will be filled.` + (d === k ? ` This is layer k: these cells are not expanded.` : ""), `ชั้น ${d}: ช่องน้ำ ${q.length} ช่องห่างจากแผ่นดิน ${d} ก้าวพอดี → จะถูกถม` + (d === k ? ` นี่คือชั้น k: ไม่ขยายต่อ` : "")), view(d));
    }
    S.frame(L(`Print the map: land stays 1, every reached water cell becomes 2, the rest stays 0.`, `พิมพ์แผนที่: แผ่นดินยังเป็น 1 ช่องน้ำที่ไปถึงเป็น 2 ที่เหลือเป็น 0`), view(-1, true));
  }
});
