VIZ.def("a65_q3a_expressway", {
  title: VIZ.L("Floyd–Warshall with stop-overs added in province order: phase k = year k", "Floyd–Warshall ที่เพิ่มจุดแวะตามลำดับจังหวัด: เฟส k = ปีที่ k"),
  input: "5 10\n2 1 6 2 7\n3 1 1 3 1 2 9\n2 1 2 2 5",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "5 10\n2 1 6 2 7\n3 1 1 3 1 2 9\n2 1 2 2 5" }],
  limit: VIZ.L("n ≤ 7", "n ≤ 7"),
  maxFrames: 40,
  legend: [["cur", VIZ.L("improved in this phase", "ดีขึ้นในเฟสนี้")], ["sel", VIZ.L("cost[1][2] = the year's answer", "cost[1][2] = คำตอบของปีนั้น")], ["vis", VIZ.L("row/column of the new stop-over", "แถว/คอลัมน์ของจุดแวะใหม่")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), c12 = t.int();
    S.check(n >= 3 && n <= 7, L("keep 3 ≤ n ≤ 7", "ให้ 3 ≤ n ≤ 7"));
    const INF = Infinity, d = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === j ? 0 : INF)), roads = [[1, 2, c12]];
    d[1][2] = d[2][1] = c12;
    for (let y = 3; y <= n; y++) { const k = t.int(); for (let j = 0; j < k; j++) { const a = t.int(), p = t.int(); roads.push([y, a, p]); if (p < d[y][a]) d[y][a] = d[a][y] = p; } }
    const pos = VIZ.circle(n, 260, 220), answers = [];
    const view = (via, imp) => { const c = {}; for (let i = 1; i <= n; i++) for (let j = 1; j <= n; j++) { const k = (i - 1) + "," + (j - 1); if (imp && imp.has(i + "," + j)) c[k] = "cur"; else if (i === via || j === via) c[k] = "vis"; } c["0,1"] = "sel";
      return [{ t: "graph", title: via ? L(`roads; provinces ≤ ${via} may be used as stop-overs`, `ถนน; ใช้จังหวัด ≤ ${via} เป็นจุดแวะได้`) : L("all roads (read at once)", "ถนนทั้งหมด (อ่านครั้งเดียว)"), W: 260, H: 220,
          n: [...Array(n).keys()].map(i => ({ id: i + 1, x: pos[i].x, y: pos[i].y, c: via && i + 1 === via ? "cur" : via && i + 1 < via ? "ok" : "" })),
          e: roads.map(([a, b, w]) => ({ a, b, w, c: via && a <= via && b <= via ? "ok" : "" })) },
        { t: "table", title: L("cost[a][b]", "cost[a][b]"), h: [...Array(n).keys()].map(i => i + 1), rh: [...Array(n).keys()].map(i => String(i + 1)), corner: "a\\b", r: [...Array(n).keys()].map(i => [...Array(n).keys()].map(j => d[i + 1][j + 1] === INF ? "∞" : d[i + 1][j + 1])), c },
        { t: "list", title: L("printed so far", "พิมพ์แล้ว"), a: answers.map(String), row: true }]; };
    S.frame(L("Read every road first. Then run Floyd–Warshall with stop-overs 1, 2, 3, … in this order. After phase k, cost[a][b] only uses stop-overs ≤ k.", "อ่านถนนทั้งหมดก่อน แล้วรัน Floyd–Warshall โดยเพิ่มจุดแวะ 1, 2, 3, … ตามลำดับนี้ หลังเฟส k cost[a][b] ใช้แค่จุดแวะ ≤ k"), view(0));
    for (let k = 1; k <= n; k++) {
      const imp = new Set();
      for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++) if (d[a][k] + d[k][b] < d[a][b]) { d[a][b] = d[a][k] + d[k][b]; imp.add(a + "," + b); }
      if (k >= 3) answers.push(d[1][2]);
      S.frame(k >= 3 ? L(`phase ${k}: allow stop-over ${k}. A 1 → 2 route with stop-overs ≤ ${k} uses only provinces 1..${k}: exactly the network of year ${k}. Year ${k} answer = cost[1][2] = <b>${d[1][2]}</b>.`, `เฟส ${k}: อนุญาตให้แวะ ${k} เส้นทาง 1 → 2 ที่แวะได้แค่ ≤ ${k} ใช้เฉพาะจังหวัด 1..${k}: คือเครือข่ายของปีที่ ${k} พอดี คำตอบปีที่ ${k} = cost[1][2] = <b>${d[1][2]}</b>`)
        : L(`phase ${k}: allow stop-over ${k}` + (imp.size ? ` (improves ${[...imp].join(" ")}).` : "."), `เฟส ${k}: อนุญาตให้แวะ ${k}` + (imp.size ? ` (ดีขึ้น ${[...imp].join(" ")})` : "")), view(k, imp));
    }
    S.frame(L(`Output: <b>${answers.join(" ")}</b>.`, `ผลลัพธ์: <b>${answers.join(" ")}</b>`), view(0));
  }
});
