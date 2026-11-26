VIZ.def("a62_q1b_chocolate", {
  title: VIZ.L("ways[length] = sum over the size eaten on the last day", "ways[length] = ผลรวมตามจำนวนชิ้นที่กินในวันสุดท้าย"),
  input: "6 2\n1 3",
  presets: [{ name: VIZ.L("S = {1, 3}, n = 6", "S = {1, 3}, n = 6"), input: "6 2\n1 3" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "4 2\n1 3" }, { name: VIZ.L("Sample 2 (Fibonacci)", "ตัวอย่าง 2 (ฟีโบนัชชี)"), input: "10 2\n1 2" }],
  limit: VIZ.L("n ≤ 14", "n ≤ 14"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("ways[length]", "ways[length]")], ["vis", VIZ.L("ways[length − s] being added", "ways[length − s] ที่กำลังบวก")], ["ok", VIZ.L("final", "ค่าสุดท้าย")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), k = t.int();
    S.check(n <= 14, L("keep n ≤ 14", "ให้ n ≤ 14"));
    const sz = []; for (let i = 0; i < k; i++) sz.push(t.int());
    const w = Array(n + 1).fill(""); w[0] = 1;
    const view = (cur, from, s) => { const cl = {}, p = {}; w.forEach((v, i) => { if (v !== "" && i !== cur) cl[i] = "ok"; }); if (cur != null) cl[cur] = "cur"; if (from != null) { cl[from] = "vis"; p[from] = `+ (last day ${s})`; }
      return [{ t: "arr", title: L(`ways[length], allowed sizes {${sz.join(", ")}}`, `ways[length] จำนวนชิ้นที่ยอมได้ {${sz.join(", ")}}`), a: w, c: cl, p }]; };
    S.frame(L("ways[0] = 1: a finished bar has exactly one way to continue (stop).", "ways[0] = 1: แท่งที่กินหมดแล้วมีวิธีเดียวคือหยุด"), view(0));
    for (let len = 1; len <= n; len++) {
      w[len] = 0;
      for (const s of sz) if (s <= len) { w[len] = (w[len] + w[len - s]) % 1000003; S.frame(L(`length ${len}: last day eats ${s} → add ways[${len - s}] = ${w[len - s]} → ${w[len]}.`, `ยาว ${len}: วันสุดท้ายกิน ${s} → บวก ways[${len - s}] = ${w[len - s]} → ${w[len]}`), view(len, len - s, s)); }
    }
    S.frame(L(`Answer ways[${n}] = <b>${w[n]}</b>.`, `คำตอบ ways[${n}] = <b>${w[n]}</b>`), view());
  }
});
