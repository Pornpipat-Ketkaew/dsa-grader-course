VIZ.def("ex00e3", {
  title: VIZ.L("Filling the boxes 1..n", "เติมกล่อง 1..n"),
  input: "4\n4 1 3 2",
  presets: [
    { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "4\n4 1 3 2" },
    { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "7\n-1 -2 3 0 2 3 4" },
    { name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "5\n5 4 3 1 3" },
  ],
  limit: VIZ.L("n ≤ 20", "n ≤ 20"),
  legend: [["ok", VIZ.L("box already filled", "กล่องที่ใช้แล้ว")], ["cur", VIZ.L("current value", "ค่าปัจจุบัน")], ["bad", VIZ.L("failure", "จุดที่ผิด")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp);
    const n = t.int(); S.check(n >= 1 && n <= 20, L("keep n between 1 and 20", "ให้ n อยู่ระหว่าง 1 ถึง 20"));
    const d = []; for (let i = 0; i < n; i++) d.push(t.int());
    const seen = Array(n + 1).fill(false);
    const view = (i, extra, box, boxCls) => {
      const sc = {}; for (let v = 1; v <= n; v++) if (seen[v]) sc[v - 1] = "ok";
      if (box != null) sc[box - 1] = boxCls;
      const dc = {}; for (let j = 0; j < i; j++) dc[j] = "dim"; if (i < n) dc[i] = extra || "cur";
      const p = {}; if (i < n) p[i] = "index";
      return [
        { t: "arr", title: L("input d₁..dₙ", "ข้อมูล d₁..dₙ"), a: d, c: dc, p, idx: 1 },
        { t: "arr", title: L("seen[1..n]", "seen[1..n]"), a: seen.slice(1).map(x => x ? "✓" : "·"), c: sc, idx: 1 },
      ];
    };
    S.frame(L(`n = ${n}. All boxes 1..${n} start empty.`, `n = ${n} กล่อง 1..${n} ว่างทั้งหมดตอนเริ่ม`), view(0));
    for (let i = 0; i < n; i++) {
      const v = d[i];
      if (v < 1 || v > n) {
        S.frame(L(`index ${i + 1}: value ${v} is outside 1..${n}. f(${i + 1}) is not in A, so the answer is <b>NO</b>. Stop.`,
                  `index ${i + 1}: ค่า ${v} อยู่นอก 1..${n} แปลว่า f(${i + 1}) ไม่อยู่ใน A คำตอบคือ <b>NO</b> หยุดทันที`), view(i, "bad"));
        return;
      }
      if (seen[v]) {
        S.frame(L(`index ${i + 1}: value ${v} is in range, but box ${v} is already filled. Two indices map to ${v}, so f is not 1-1: <b>NO</b>.`,
                  `index ${i + 1}: ค่า ${v} อยู่ในช่วง แต่กล่อง ${v} ถูกใช้ไปแล้ว มีสอง index ส่งไปที่ ${v} จึงไม่ใช่ 1-1: <b>NO</b>`), view(i, "bad", v, "bad"));
        return;
      }
      S.frame(L(`index ${i + 1}: value ${v} is in 1..${n} and box ${v} is empty.`, `index ${i + 1}: ค่า ${v} อยู่ใน 1..${n} และกล่อง ${v} ยังว่าง`), view(i, "cur", v, "cur"));
      seen[v] = true;
      S.frame(L(`Mark seen[${v}] = true.`, `ตั้ง seen[${v}] = true`), view(i, "cur", v, "ok"));
    }
    S.frame(L(`All ${n} values were in range and distinct, so all ${n} boxes are filled (pigeonhole). Answer: <b>YES</b>.`,
              `ทั้ง ${n} ค่าอยู่ในช่วงและไม่ซ้ำ กล่องทั้ง ${n} ใบจึงถูกใช้ครบ (หลักรังนกพิราบ) คำตอบ: <b>YES</b>`), view(n));
  }
});
