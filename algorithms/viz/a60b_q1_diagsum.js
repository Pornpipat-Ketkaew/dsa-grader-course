VIZ.def("a60b_q1_diagsum", {
  title: VIZ.L("Kadane along every diagonal", "Kadane ไปตามทุกเส้นทแยง"),
  input: "4\n1 2 3 4\n-2 -5 2 -5\n6 3 -7 1\n3 -2 7 -9",
  presets: [{ name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "4\n1 2 3 4\n-2 -5 2 -5\n6 3 -7 1\n3 -2 7 -9" },
            { name: VIZ.L("All negative", "ติดลบทั้งหมด"), input: "3\n-1 -4 -2\n-3 -1 -5\n-2 -6 -1" }],
  limit: VIZ.L("n ≤ 6", "n ≤ 6"),
  legend: [["vis", VIZ.L("current diagonal", "เส้นทแยงปัจจุบัน")], ["cur", VIZ.L("current cell", "ช่องปัจจุบัน")], ["path", VIZ.L("piece counted in bestEndingHere", "ช่วงใน bestEndingHere")], ["ok", VIZ.L("best piece so far", "ช่วงดีที่สุดจนถึงตอนนี้")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(); S.check(n >= 1 && n <= 6, L("keep n ≤ 6", "ให้ n ≤ 6"));
    const A = []; for (let r = 0; r < n; r++) { A.push([]); for (let c = 0; c < n; c++) A[r].push(t.int()); }
    let best = A[0][0], bestCells = [[0, 0]];
    const view = (shift, cr, cc, piece, endHere) => {
      const c = {};
      for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) if (q - r === shift) c[r + "," + q] = "vis";
      bestCells.forEach(([r, q]) => c[r + "," + q] = "ok");
      (piece || []).forEach(([r, q]) => c[r + "," + q] = "path");
      if (cr != null) c[cr + "," + cc] = "cur";
      return [{ t: "grid", title: L("table", "ตาราง"), g: A, c, rl: true, cl: true },
              { t: "vars", v: [["shift", shift], ["bestEndingHere", endHere == null ? "–" : endHere, "cur"], ["best", best, "ok"]] }];
    };
    S.frame(L("best starts as table[0][0]. Diagonals go from shift = −(n−1) (bottom-left) to n−1 (top-right).", "best เริ่มที่ table[0][0] เส้นทแยงไล่จาก shift = −(n−1) (ล่างซ้าย) ถึง n−1 (บนขวา)"), view(-(n - 1)));
    for (let shift = -(n - 1); shift <= n - 1; shift++) {
      let r = Math.max(0, -shift), c = r + shift, end = A[r][c], piece = [[r, c]];
      if (end > best) { best = end; bestCells = [...piece]; }
      S.frame(L(`shift ${shift}: start at (${r},${c}). bestEndingHere = ${end}.`, `shift ${shift}: เริ่มที่ (${r},${c}) bestEndingHere = ${end}`), view(shift, r, c, piece, end));
      for (r++, c++; r < n && c < n; r++, c++) {
        const x = A[r][c], ext = end + x;
        let cap;
        if (ext >= x) { end = ext; piece.push([r, c]); cap = L(`(${r},${c}) = ${x}: extend, since ${end - x} + ${x} = ${ext} ≥ ${x}.`, `(${r},${c}) = ${x}: ต่อช่วง เพราะ ${end - x} + ${x} = ${ext} ≥ ${x}`); }
        else { cap = L(`(${r},${c}) = ${x}: previous piece is ${end} < 0, start fresh: ${x}.`, `(${r},${c}) = ${x}: ช่วงก่อนหน้าได้ ${end} < 0 จึงเริ่มใหม่: ${x}`); end = x; piece = [[r, c]]; }
        if (end > best) { best = end; bestCells = [...piece]; cap = { en: cap.en + ` New best = ${best}.`, th: cap.th + ` best ใหม่ = ${best}` }; }
        S.frame(cap, view(shift, r, c, piece, end));
      }
    }
    S.frame(L(`All ${2 * n - 1} diagonals done. Answer <b>${best}</b>.`, `ครบทั้ง ${2 * n - 1} เส้นทแยง คำตอบ <b>${best}</b>`), view(99));
  }
});
