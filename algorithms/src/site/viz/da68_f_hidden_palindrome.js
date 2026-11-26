VIZ.def("da68_f_hidden_palindrome", {
  title: VIZ.L("Interval DP: best(left, right) from shorter intervals", "DP บนช่วง: best(left, right) จากช่วงที่สั้นกว่า"),
  input: "7\nabcbdab",
  presets: [{ name: "abcbdab", input: "7\nabcbdab" }, { name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "5\nabcab" }, { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5\nabvba" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("best[left][right]", "best[left][right]")], ["ok", VIZ.L("ends match: inside + 2", "ปลายตรงกัน: ข้างใน + 2")], ["vis", VIZ.L("ends differ: drop one end", "ปลายต่างกัน: ตัดปลายหนึ่งข้าง")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), s = t.str();
    S.check(n <= 10 && s.length === n, L("keep N ≤ 10 and |string| = N", "ให้ N ≤ 10 และความยาวสตริง = N"));
    const B = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => j < i ? "·" : ""));
    const base = {}; for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) base[i + "," + j] = "empty";
    const view = (c) => [{ t: "grid", title: L("best[left][right] (row = left, column = right)", "best[left][right] (แถว = left, คอลัมน์ = right)"), g: B, c: Object.assign({}, base, c || {}), rl: [...s].map((ch, i) => i + " " + ch), cl: [...s].map((ch, i) => i + " " + ch) }];
    S.frame(L("Rows are filled from the bottom (left = N−1) up, each row left to right, so the row below and the cell to the left are ready.", "เติมแถวจากล่าง (left = N−1) ขึ้นบน แต่ละแถวจากซ้ายไปขวา แถวข้างล่างและช่องทางซ้ายจึงพร้อมเสมอ"), view());
    for (let i = n - 1; i >= 0; i--) {
      B[i][i] = 1; S.frame(L(`best[${i}][${i}] = 1: one letter '${s[i]}'.`, `best[${i}][${i}] = 1: ตัวอักษรเดียว '${s[i]}'`), view({ [i + "," + i]: "cur" }));
      for (let j = i + 1; j < n; j++) {
        if (s[i] === s[j]) { const inside = j === i + 1 ? 0 : B[i + 1][j - 1]; B[i][j] = inside + 2; S.frame(L(`'${s[i]}' = '${s[j]}': wrap the inside → ${inside} + 2 = ${B[i][j]}.`, `'${s[i]}' = '${s[j]}': ครอบข้างใน → ${inside} + 2 = ${B[i][j]}`), view(Object.assign({ [i + "," + j]: "cur" }, j > i + 1 ? { [(i + 1) + "," + (j - 1)]: "ok" } : {}))); }
        else { B[i][j] = Math.max(B[i + 1][j], B[i][j - 1]); S.frame(L(`'${s[i]}' ≠ '${s[j]}': max(drop left ${B[i + 1][j]}, drop right ${B[i][j - 1]}) = ${B[i][j]}.`, `'${s[i]}' ≠ '${s[j]}': max(ตัดซ้าย ${B[i + 1][j]}, ตัดขวา ${B[i][j - 1]}) = ${B[i][j]}`), view({ [i + "," + j]: "cur", [(i + 1) + "," + j]: "vis", [i + "," + (j - 1)]: "vis" })); }
      }
    }
    S.frame(L(`Answer best[0][${n - 1}] = <b>${B[0][n - 1]}</b>.`, `คำตอบ best[0][${n - 1}] = <b>${B[0][n - 1]}</b>`), view({ ["0," + (n - 1)]: "ok" }));
  }
});
