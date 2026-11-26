VIZ.def("ex03e1_lcs", {
  title: VIZ.L("Filling the LCS table", "เติมตาราง LCS"),
  input: "abcbdab\nbdcaba",
  presets: [{ name: "abcbdab / bdcaba", input: "abcbdab\nbdcaba" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "acbdegcedbg\nbegcfeubk" }, { name: "aaa / bbb", input: "aaa\nbbb" }],
  limit: VIZ.L("lengths ≤ 12", "ความยาว ≤ 12"),
  maxFrames: 200,
  legend: [["cur", VIZ.L("lcs[i][j]", "lcs[i][j]")], ["ok", VIZ.L("letters match: diagonal + 1", "ตัวอักษรตรงกัน: ทแยง + 1")], ["vis", VIZ.L("no match: max of up / left", "ไม่ตรง: max ของบน / ซ้าย")], ["path", VIZ.L("one LCS (traced back)", "LCS หนึ่งชุด (ย้อนรอย)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), a = t.str(), b = t.str();
    S.check(a.length <= 12 && b.length <= 12, L("keep both lengths ≤ 12", "ให้ความยาวทั้งสอง ≤ 12"));
    const n = a.length, m = b.length, T = Array.from({ length: n + 1 }, (_, i) => Array.from({ length: m + 1 }, (_, j) => i === 0 || j === 0 ? 0 : ""));
    const view = (c, cap) => [{ t: "grid", title: L("lcs[i][j] (rows: prefixes of the first string, columns: of the second)", "lcs[i][j] (แถว: prefix ของสตริงแรก, คอลัมน์: ของสตริงที่สอง)"), g: T, c: c || {}, rl: ["∅", ...a], cl: ["∅", ...b] }];
    S.frame(L("Row 0 and column 0 are 0: an empty prefix has no common subsequence.", "แถว 0 และคอลัมน์ 0 เป็น 0: prefix ว่างไม่มี subsequence ร่วม"), view());
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) { T[i][j] = T[i - 1][j - 1] + 1; if (n * m <= 64 || j === m) S.frame(L(`'${a[i - 1]}' = '${b[j - 1]}': lcs[${i}][${j}] = lcs[${i - 1}][${j - 1}] + 1 = ${T[i][j]}.`, `'${a[i - 1]}' = '${b[j - 1]}': lcs[${i}][${j}] = lcs[${i - 1}][${j - 1}] + 1 = ${T[i][j]}`), view({ [i + "," + j]: "cur", [(i - 1) + "," + (j - 1)]: "ok" })); }
      else { T[i][j] = Math.max(T[i - 1][j], T[i][j - 1]); if (n * m <= 64 || j === m) S.frame(L(`'${a[i - 1]}' ≠ '${b[j - 1]}': lcs[${i}][${j}] = max(${T[i - 1][j]}, ${T[i][j - 1]}) = ${T[i][j]}.`, `'${a[i - 1]}' ≠ '${b[j - 1]}': lcs[${i}][${j}] = max(${T[i - 1][j]}, ${T[i][j - 1]}) = ${T[i][j]}`), view({ [i + "," + j]: "cur", [(i - 1) + "," + j]: "vis", [i + "," + (j - 1)]: "vis" })); }
    }
    const path = {}; let i = n, j = m, s = "";
    while (i > 0 && j > 0) { if (a[i - 1] === b[j - 1]) { path[i + "," + j] = "path"; s = a[i - 1] + s; i--; j--; } else if (T[i - 1][j] >= T[i][j - 1]) i--; else j--; }
    S.frame(L(`Answer lcs[${n}][${m}] = <b>${T[n][m]}</b>. Tracing the matches back gives one LCS: "${s}".`, `คำตอบ lcs[${n}][${m}] = <b>${T[n][m]}</b> ย้อนรอยจุดที่ตรงกันได้ LCS หนึ่งชุด: "${s}"`), view(path));
  }
});
