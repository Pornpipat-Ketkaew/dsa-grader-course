VIZ.def("ex01m3", {
  title: VIZ.L("Binary search on the answer: smallest time t with seatedBy(t) ≥ c", "Binary search บนคำตอบ: เวลา t ที่น้อยที่สุดที่ seatedBy(t) ≥ c"),
  input: "3 2\n2 2 5\n6 30",
  presets: [{ name: VIZ.L("Sample (c = 6, 30)", "ตัวอย่าง (c = 6, 30)"), input: "3 2\n2 2 5\n6 30" },
            { name: VIZ.L("Big label", "ลำดับใหญ่"), input: "3 1\n2 3 7\n1000000" }],
  limit: VIZ.L("N ≤ 8, A ≤ 4", "N ≤ 8, A ≤ 4"),
  maxFrames: 120,
  legend: [["bad", VIZ.L("seatedBy(t) < c: too early", "seatedBy(t) < c: เร็วไป")], ["ok", VIZ.L("seatedBy(t) ≥ c: late enough", "seatedBy(t) ≥ c: ช้าพอ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), a = t.int();
    S.check(n >= 1 && n <= 8 && a >= 1 && a <= 4, L("keep N ≤ 8 and A ≤ 4", "ให้ N ≤ 8 และ A ≤ 4"));
    const T = []; for (let i = 0; i < n; i++) T.push(t.int());
    const fastest = Math.min(...T), seated = x => T.reduce((s, ti) => s + Math.floor(x / ti) + 1, 0);
    const out = [], tried = [];
    const view = (x, lo, hi) => [{ t: "table", title: L(x != null ? `seats filled by time t = ${x}` : "chefs", x != null ? `ที่นั่งที่มีคนนั่งแล้วภายในเวลา t = ${x}` : "เชฟ"), h: T.map((_, i) => i + 1), rh: x != null ? ["T", "t / T + 1"] : ["T"], corner: "chef",
        r: x != null ? [T, T.map(ti => Math.floor(x / ti) + 1)] : [T] },
      { t: "table", title: L("tested times", "เวลาที่ลองแล้ว"), h: tried.map(r => r[0]), rh: ["seatedBy(t)"], corner: "t", r: [tried.map(r => r[1])], c: Object.fromEntries(tried.map((r, i) => ["0," + i, r[2] ? "ok" : "bad"])) },
      { t: "vars", v: lo != null ? [["low", lo], ["high", hi]] : [] }, { t: "list", title: L("answers", "คำตอบ"), a: [...out], row: true }];
    S.frame(L("Chef i seats customers at times 0, T, 2T, …, so by time t it has seated ⌊t / T⌋ + 1 people. seatedBy(t) = the sum over chefs never decreases as t grows: binary search for the first t that reaches customer c.", "เชฟ i ให้ลูกค้านั่งที่เวลา 0, T, 2T, … ภายในเวลา t จึงรับไป ⌊t / T⌋ + 1 คน seatedBy(t) = ผลรวมของทุกเชฟ ไม่ลดลงเมื่อ t เพิ่ม จึง binary search หา t แรกที่ถึงลูกค้าลำดับ c"), view());
    for (let q = 0; q < a; q++) {
      const c = t.int(); tried.length = 0;
      let lo = -1, hi = (c - 1) * fastest;
      S.frame(L(`customer c = ${c}. low = −1 (before opening, nobody seated), high = (c − 1)·fastest = ${hi}: the fastest chef alone has seated c people by then.`, `ลูกค้าลำดับ c = ${c} low = −1 (ก่อนเปิดร้าน ยังไม่มีใครนั่ง) high = (c − 1)·fastest = ${hi}: เชฟที่เร็วที่สุดคนเดียวก็รับครบ c คนแล้วในเวลานั้น`), view(null, lo, hi));
      while (hi - lo > 1) {
        const mid = lo + Math.floor((hi - lo) / 2), s = seated(mid), ok = s >= c;
        tried.push([mid, s, ok]);
        S.frame(L(`t = ${mid}: seatedBy = ${s} ${ok ? "≥" : "<"} ${c} → ${ok ? "high" : "low"} = ${mid}.`, `t = ${mid}: seatedBy = ${s} ${ok ? "≥" : "<"} ${c} → ${ok ? "high" : "low"} = ${mid}`), view(mid, lo, hi));
        if (ok) hi = mid; else lo = mid;
      }
      out.push(String(hi));
      S.frame(L(`low and high are neighbours: customer ${c} is seated at time <b>${hi}</b>.`, `low กับ high ติดกันแล้ว: ลูกค้าลำดับ ${c} ได้นั่งเวลา <b>${hi}</b>`), view(hi, lo, hi));
    }
  }
});
