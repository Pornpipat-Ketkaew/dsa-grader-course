VIZ.def("da67_f_one_two_apart", {
  title: VIZ.L("State = the last two values", "สถานะ = สองค่าสุดท้าย"),
  input: "5",
  presets: [{ name: "n = 5", input: "5" }, { name: "n = 3", input: "3" }, { name: "n = 8", input: "8" }],
  limit: VIZ.L("n ≤ 10", "n ≤ 10"),
  maxFrames: 30,
  legend: [["cur", VIZ.L("new state (last, value)", "สถานะใหม่ (last, value)")], ["bad", VIZ.L("forbidden pair", "คู่ที่ห้าม")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 2 && n <= 10, L("keep 2 ≤ n ≤ 10", "ให้ 2 ≤ n ≤ 10"));
    const clash = (a, b) => (a === 1 && b === 2) || (a === 2 && b === 1);
    let w = [0, 1, 2].map(p => [0, 1, 2].map(l => clash(p, l) ? 0 : 1));
    const view = (cap, len, hl) => { const c = {}; for (let p = 0; p < 3; p++) for (let l = 0; l < 3; l++) if (clash(p, l)) c[p + "," + l] = "bad"; if (hl) c[hl] = "cur";
      return [{ t: "grid", title: L(`ways[previous][last], length ${len}`, `ways[previous][last] ยาว ${len}`), g: w.map(r => r.map(String)), c, rl: ["prev 0", "prev 1", "prev 2"], cl: ["last 0", "last 1", "last 2"] },
        { t: "vars", v: [["total", w.flat().reduce((a, b) => a + b, 0) % 100000007, "ok"]] }]; };
    S.frame(L("Length 2: every pair except 1-2 and 2-1. A new value must not clash with either of the last two values, so those two are the state.", "ยาว 2: ทุกคู่ยกเว้น 1-2 และ 2-1 ค่าใหม่ต้องไม่ชนกับสองค่าสุดท้าย สองค่านี้จึงเป็นสถานะ"), view(null, 2));
    for (let len = 3; len <= n; len++) {
      const g = [0, 1, 2].map(() => [0, 0, 0]);
      for (let p = 0; p < 3; p++) for (let l = 0; l < 3; l++) for (let v = 0; v < 3; v++) if (!clash(p, v) && !clash(l, v)) g[l][v] = (g[l][v] + w[p][l]) % 100000007;
      w = g;
      S.frame(L(`length ${len}: new[last][value] += old[previous][last] whenever value clashes with neither previous nor last. Example: new[0][1] comes from old[0][0] and old[1][0] (a 2 two steps back is forbidden).`, `ยาว ${len}: new[last][value] += old[previous][last] เมื่อ value ไม่ชนกับทั้ง previous และ last ตัวอย่าง: new[0][1] มาจาก old[0][0] และ old[1][0] (2 ที่อยู่ห่างสองช่องห้าม)`), view(null, len, "0,1"));
    }
    S.frame(L(`Answer for n = ${n}: <b>${w.flat().reduce((a, b) => a + b, 0) % 100000007}</b>.`, `คำตอบเมื่อ n = ${n}: <b>${w.flat().reduce((a, b) => a + b, 0) % 100000007}</b>`), view(null, n));
  }
});
