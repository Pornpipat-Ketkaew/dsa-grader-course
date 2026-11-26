VIZ.def("da67_f_travelling_tourist", {
  title: VIZ.L("Site-to-site fares, then a DP over visited sets", "ค่าเดินทางระหว่างสถานที่ แล้ว DP บนเซตที่ไปแล้ว"),
  input: "4 6 4\n1 2 3 4\n1 2 38\n1 4 97\n2 4 47\n3 4 38\n2 3 24\n1 3 75",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "4 6 4\n1 2 3 4\n1 2 38\n1 4 97\n2 4 47\n3 4 38\n2 3 24\n1 3 75" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3 3 3\n1 2 3\n1 2 15\n1 3 4\n2 3 7" }, { name: VIZ.L("Sample 4", "ตัวอย่าง 4"), input: "5 5 3\n2 3 5\n1 2 1\n2 3 7\n3 4 250\n4 5 18\n1 5 4" }],
  limit: VIZ.L("k ≤ 4, n ≤ 10", "k ≤ 4, n ≤ 10"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("state being extended", "สถานะที่กำลังขยาย")], ["ok", VIZ.L("improved", "ดีขึ้น")], ["sel", VIZ.L("answer", "คำตอบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int();
    S.check(k <= 4 && n <= 10, L("keep k ≤ 4 and n ≤ 10", "ให้ k ≤ 4 และ n ≤ 10"));
    const site = []; for (let i = 0; i < k; i++) site.push(t.int());
    const INF = 1e18, d = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === j ? 0 : INF));
    for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(), c = t.int(); d[a][b] = d[b][a] = Math.min(d[a][b], c); }
    for (let x = 1; x <= n; x++) for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) if (d[i][x] + d[x][j] < d[i][j]) d[i][j] = d[i][x] + d[x][j];
    const F = site.map(a => site.map(b => d[a][b]));
    const full = (1 << k) - 1, best = Array.from({ length: full + 1 }, () => Array(k).fill(INF));
    for (let i = 0; i < k; i++) best[1 << i][i] = 0;
    const bin = v => [...Array(k).keys()].map(i => v >> i & 1 ? site[i] : "·").join(" ");
    const view = (c) => [{ t: "table", title: L("fare[from][to] between sites (one Dijkstra per site)", "fare[from][to] ระหว่างสถานที่ (Dijkstra หนึ่งครั้งต่อสถานที่)"), h: site, rh: site, corner: "", r: F },
      { t: "table", title: L("best[visited][last] (rows: visited set, columns: last site)", "best[visited][last] (แถว: เซตที่ไปแล้ว, คอลัมน์: สถานที่สุดท้าย)"), h: site, rh: [...Array(full).keys()].map(v => bin(v + 1)), corner: "visited \\ last",
        r: [...Array(full).keys()].map(v => best[v + 1].map((x, i) => (v + 1) >> i & 1 ? (x >= INF ? "∞" : x) : "")), c: c || {} }];
    S.frame(L("Only the k sites matter: compute the cheapest fare between every pair of sites (Dijkstra from each), then forget the rest of the network.", "สนใจแค่ k สถานที่: หาค่าเดินทางถูกที่สุดระหว่างทุกคู่ (Dijkstra จากแต่ละที่) แล้วลืมเครือข่ายที่เหลือ"), view());
    for (let v = 1; v <= full; v++) for (let last = 0; last < k; last++) {
      if (!(v >> last & 1) || best[v][last] >= INF) continue;
      const c = { [`${v - 1},${last}`]: "cur" }; const changes = [];
      for (let nx = 0; nx < k; nx++) { if (v >> nx & 1) continue; const g = v | (1 << nx), cand = best[v][last] + F[last][nx]; if (cand < best[g][nx]) { best[g][nx] = cand; c[`${g - 1},${nx}`] = "ok"; changes.push(`${site[nx]}: ${cand}`); } }
      if (changes.length) S.frame(L(`from {${bin(v)}} at ${site[last]}: go to each unvisited site → ${changes.join(", ")}.`, `จาก {${bin(v)}} ที่ ${site[last]}: ไปทุกที่ที่ยังไม่ไป → ${changes.join(", ")}`), view(c));
    }
    const ans = Math.min(...best[full]), at = best[full].indexOf(ans);
    S.frame(L(`Answer = min over the full row = <b>${ans}</b>.`, `คำตอบ = ค่าน้อยสุดในแถวที่ไปครบ = <b>${ans}</b>`), view({ [`${full - 1},${at}`]: "sel" }));
  }
});
