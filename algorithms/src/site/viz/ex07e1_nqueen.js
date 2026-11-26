VIZ.def("ex07e1_nqueen", {
  title: VIZ.L("Placing one queen per row", "วางราชินีแถวละหนึ่งตัว"),
  input: "4",
  presets: [{ name: VIZ.L("n = 4", "n = 4"), input: "4" }, { name: VIZ.L("n = 5", "n = 5"), input: "5" }],
  limit: VIZ.L("n ≤ 6", "n ≤ 6"),
  maxFrames: 450,
  legend: [["sel", VIZ.L("queen", "ราชินี")], ["bad", VIZ.L("attacked square", "ช่องที่ถูกโจมตี")], ["cur", VIZ.L("square being tried", "ช่องที่กำลังลอง")], ["ok", VIZ.L("solution", "คำตอบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(); S.check(n >= 1 && n <= 6, L("keep n ≤ 6", "ให้ n ≤ 6"));
    const col = [], cu = Array(n).fill(false), d1 = Array(2 * n).fill(false), d2 = Array(2 * n).fill(false);
    let ways = 0;
    const view = (row, tryCol, verdict) => {
      const g = [], c = {};
      for (let r = 0; r < n; r++) { g.push([]); for (let q = 0; q < n; q++) {
        g[r].push(col[r] === q ? "♛" : "");
        if (col[r] === q) c[r + "," + q] = verdict === "ok" ? "ok" : "sel";
        else if (r >= col.length && (cu[q] || d1[r + q] || d2[r - q + n - 1])) c[r + "," + q] = "bad";
      } }
      if (tryCol != null) c[row + "," + tryCol] = verdict === "bad" ? "bad" : "cur";
      return [{ t: "grid", title: L("board (red = attacked by placed queens)", "กระดาน (แดง = ถูกราชินีที่วางแล้วโจมตี)"), g, c, rl: true, cl: true },
        { t: "table", title: L("flags", "ธง"), h: Array.from({ length: 2 * n - 1 }, (_, i) => i), rh: ["column", "row+col (/)", "row−col+n−1 (\\)"],
          r: [Array.from({ length: 2 * n - 1 }, (_, i) => i < n ? (cu[i] ? "■" : "·") : ""), d1.slice(0, 2 * n - 1).map(x => x ? "■" : "·"), d2.slice(0, 2 * n - 1).map(x => x ? "■" : "·")] },
        { t: "vars", v: [["row", row], ["ways", ways, "ok"]] }];
    };
    const place = (row) => {
      if (row === n) { ways++; S.frame(L(`row = n: every row has a queen → solution #${ways}.`, `row = n: ทุกแถวมีราชินีแล้ว → คำตอบที่ ${ways}`), view(row, null, "ok")); return; }
      for (let q = 0; q < n; q++) {
        if (cu[q] || d1[row + q] || d2[row - q + n - 1]) {
          const why = cu[q] ? L("column", "คอลัมน์") : d1[row + q] ? L("/ diagonal", "แนวทแยง /") : L("\\ diagonal", "แนวทแยง \\");
          S.frame(L(`row ${row}, column ${q}: attacked (${why.en} used).`, `แถว ${row} คอลัมน์ ${q}: ถูกโจมตี (${why.th} ถูกใช้แล้ว)`), view(row, q, "bad")); continue; }
        col.push(q); cu[q] = d1[row + q] = d2[row - q + n - 1] = true;
        S.frame(L(`row ${row}, column ${q}: safe → place a queen, set column[${q}], /[${row + q}], \\[${row - q + n - 1}].`, `แถว ${row} คอลัมน์ ${q}: ปลอดภัย → วางราชินี ตั้ง column[${q}], /[${row + q}], \\[${row - q + n - 1}]`), view(row + 1));
        place(row + 1);
        col.pop(); cu[q] = d1[row + q] = d2[row - q + n - 1] = false;
        S.frame(L(`back in row ${row}: remove the queen from column ${q}, clear its three flags.`, `กลับมาที่แถว ${row}: เอาราชินีออกจากคอลัมน์ ${q} ล้างธงทั้งสาม`), view(row));
      }
    };
    place(0);
    S.frame(L(`Search complete: <b>${ways}</b> ways.`, `ค้นหาครบ: <b>${ways}</b> วิธี`), view(0));
  }
});
