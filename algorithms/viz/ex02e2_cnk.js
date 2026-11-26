VIZ.def("ex02e2_cnk", {
  title: VIZ.L("Filling Pascal's triangle row by row", "เติมสามเหลี่ยมปาสคาลทีละแถว"),
  input: "6 3",
  presets: [{ name: "C(6, 3)", input: "6 3" }, { name: "C(5, 2)", input: "5 2" }, { name: "C(8, 4)", input: "8 4" }],
  limit: VIZ.L("N ≤ 8", "N ≤ 8"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("entry being computed", "ช่องที่กำลังคำนวณ")], ["vis", VIZ.L("the two entries it adds", "สองช่องที่นำมาบวก")], ["ok", VIZ.L("answer", "คำตอบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), k = t.int();
    S.check(n >= 1 && n <= 8 && k >= 0 && k <= n, L("need 0 ≤ K ≤ N ≤ 8", "ต้องมี 0 ≤ K ≤ N ≤ 8"));
    const g = Array.from({ length: n + 1 }, () => Array(n + 1).fill(""));
    const view = (r, c) => { const cl = {}; if (r != null) { cl[r + "," + c] = "cur"; if (c > 0 && c < r) { cl[(r - 1) + "," + (c - 1)] = "vis"; cl[(r - 1) + "," + c] = "vis"; } } if (g[n][k] !== "" && r == null) cl[n + "," + k] = "ok";
      return [{ t: "grid", title: L("choose[row][column] = C(row, column)", "choose[row][column] = C(row, column)"), g, c: cl, rl: true, cl: true }]; };
    S.frame(L("Row r needs only row r − 1, so fill rows top to bottom.", "แถว r ต้องใช้แค่แถว r − 1 จึงเติมจากแถวบนลงล่าง"), view());
    for (let r = 0; r <= n; r++) {
      g[r][0] = g[r][r] = 1;
      S.frame(L(`row ${r}: C(${r}, 0) = C(${r}, ${r}) = 1.`, `แถว ${r}: C(${r}, 0) = C(${r}, ${r}) = 1`), view(r, r));
      for (let c = 1; c < r; c++) { g[r][c] = g[r - 1][c - 1] + g[r - 1][c]; S.frame(L(`C(${r}, ${c}) = C(${r - 1}, ${c - 1}) + C(${r - 1}, ${c}) = ${g[r - 1][c - 1]} + ${g[r - 1][c]} = ${g[r][c]}.`, `C(${r}, ${c}) = C(${r - 1}, ${c - 1}) + C(${r - 1}, ${c}) = ${g[r - 1][c - 1]} + ${g[r - 1][c]} = ${g[r][c]}`), view(r, c)); }
    }
    S.frame(L(`Answer C(${n}, ${k}) = <b>${g[n][k]}</b>.`, `คำตอบ C(${n}, ${k}) = <b>${g[n][k]}</b>`), view());
  }
});
