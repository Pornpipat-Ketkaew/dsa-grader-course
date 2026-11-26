VIZ.def("a62_q1a_recur", {
  title: VIZ.L("Filling H(a, b) quarter by quarter", "เติม H(a, b) ทีละส่วนสี่"),
  input: "2 1",
  presets: [{ name: "H(2,1)", input: "2 1" }, { name: "H(3,3)", input: "3 3" }, { name: "H(1,0)", input: "1 0" }],
  limit: VIZ.L("a ≤ 3", "a ≤ 3"),
  maxFrames: 400,
  legend: [["cur", VIZ.L("block of the current call", "บล็อกของการเรียกปัจจุบัน")], ["vis", VIZ.L("blocks of the calls still open", "บล็อกของการเรียกที่ยังไม่จบ")], ["ok", VIZ.L("just written", "เพิ่งเขียน")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), a = t.int(), b = t.int();
    S.check(a >= 0 && a <= 3, L("keep a ≤ 3", "ให้ a ≤ 3"));
    const side = 1 << a, M = Array.from({ length: side }, () => Array(side).fill(""));
    const stack = [];
    const view = (hl) => {
      const c = {};
      stack.forEach(([lv, , top, left], i) => { const s = 1 << lv; for (let r = top; r < top + s; r++) for (let q = left; q < left + s; q++) c[r + "," + q] = i === stack.length - 1 ? "cur" : "vis"; });
      if (hl) c[hl[0] + "," + hl[1]] = "ok";
      return [{ t: "grid", title: L(`H(${a}, ${b}), ${side} × ${side}`, `H(${a}, ${b}) ขนาด ${side} × ${side}`), g: M, c, rl: true, cl: true },
        { t: "list", title: L("open calls build(level, value, top, left)", "การเรียกที่ยังไม่จบ build(level, value, top, left)"), a: stack.map(([lv, v, tp, lf]) => `build(${lv}, ${v}, ${tp}, ${lf})`), c: { [stack.length - 1]: "cur" } }];
    };
    const names = [L("top-left = H(level−1, value)", "ซ้ายบน = H(level−1, value)"), L("top-right = H(level−1, value−1)", "ขวาบน = H(level−1, value−1)"), L("bottom-left = H(level−1, value+1)", "ซ้ายล่าง = H(level−1, value+1)"), L("bottom-right = H(level−1, value)", "ขวาล่าง = H(level−1, value)")];
    const build = (lv, v, top, left, why) => {
      stack.push([lv, v, top, left]);
      if (lv === 0) { M[top][left] = v; S.frame(L(`base case: H(0, ${v}) = [${v}] → write ${v} at (${top}, ${left}).`, `กรณีฐาน: H(0, ${v}) = [${v}] → เขียน ${v} ที่ (${top}, ${left})`), view([top, left])); stack.pop(); return; }
      const h = 1 << (lv - 1);
      S.frame(why ? L(`${why.en}: build(${lv}, ${v}) covers rows ${top}..${top + 2 * h - 1}, columns ${left}..${left + 2 * h - 1}; split into four ${h}×${h} quarters.`, `${why.th}: build(${lv}, ${v}) ครอบคลุมแถว ${top}..${top + 2 * h - 1} คอลัมน์ ${left}..${left + 2 * h - 1} แบ่งเป็นสี่ส่วนขนาด ${h}×${h}`)
        : L(`build(${a}, ${b}) for the whole matrix; split into four ${h}×${h} quarters.`, `build(${a}, ${b}) สำหรับทั้งเมทริกซ์ แบ่งเป็นสี่ส่วนขนาด ${h}×${h}`), view());
      build(lv - 1, v, top, left, names[0]);
      build(lv - 1, v - 1, top, left + h, names[1]);
      build(lv - 1, v + 1, top + h, left, names[2]);
      build(lv - 1, v, top + h, left + h, names[3]);
      stack.pop();
    };
    build(a, b, 0, 0, null);
    S.frame(L("Done: every cell was written exactly once.", "เสร็จ: ทุกช่องถูกเขียนครั้งเดียวพอดี"), view());
  }
});
