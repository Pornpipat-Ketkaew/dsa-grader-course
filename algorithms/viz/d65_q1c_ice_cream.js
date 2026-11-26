VIZ.def("d65_q1c_ice_cream", {
  title: VIZ.L("Savings as a prefix sum; a scam just raises the target", "เงินเก็บคือผลรวมสะสม การโดนหลอกแค่ทำให้เป้าสูงขึ้น"),
  input: "2 5 3\n4 2\n6 5\n11 3\n12 3\n13 3\n200 4\n200 5",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "2 5 3\n4 2\n6 5\n11 3\n12 3\n13 3\n200 4\n200 5" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2 7 3\n4 2\n6 5\n1 1000\n3 1000\n4 1000\n12 1000\n13 1000\n14 1000\n15 1000" }],
  limit: VIZ.L("answers ≤ 60, m ≤ 8", "คำตอบ ≤ 60, m ≤ 8"),
  maxFrames: 40,
  legend: [["cur", VIZ.L("scam day", "วันที่โดนหลอก")], ["ok", VIZ.L("first day reaching the target", "วันแรกที่ถึงเป้า")], ["vis", VIZ.L("below the target", "ต่ำกว่าเป้า")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), start = t.int();
    S.check(m >= 1 && m <= 8, L("keep m ≤ 8", "ให้ m ≤ 8"));
    const ch = {}; for (let i = 0; i < n; i++) { const a = t.int(), s = t.int(); ch[a] = s; }
    const Q = []; for (let i = 0; i < m; i++) Q.push([t.int(), t.int()]);
    const D = 61, rate = [], saved = []; let r = start;
    for (let d = 0; d < D; d++) { if (ch[d]) r = ch[d]; rate.push(r); saved.push((d ? saved[d - 1] : 0) + r); }
    const out = [];
    const view = (x, target, ans) => {
      // columns: the first days, plus a few days around the scam day and the answer
      const want = new Set(); for (let d = 0; d < 10; d++) want.add(d);
      [x, ans].forEach(v => { if (v != null) for (let d = v - 2; d <= v + 1; d++) if (d >= 0 && d < D) want.add(d); });
      const days = [...want].sort((p, q) => p - q), cols = [];
      days.forEach((d, i) => { if (i && d !== days[i - 1] + 1) cols.push(null); cols.push(d); });
      const c = {};
      cols.forEach((d, i) => { if (d == null) return; if (target != null && saved[d] < target) c["1," + i] = "vis"; if (d === ans) c["1," + i] = "ok"; if (d === x) c["0," + i] = "cur"; });
      return [{ t: "table", title: L("day by day (… = days skipped in this picture)", "รายวัน (… = วันที่ข้ามในภาพนี้)"), h: cols.map(d => d == null ? "…" : d), rh: ["rate", "savedBy"], corner: "day",
          r: [cols.map(d => d == null ? "…" : rate[d]), cols.map(d => d == null ? "…" : saved[d])], c },
        { t: "vars", v: target != null ? [["target", target]] : [] }, { t: "list", title: L("answers", "คำตอบ"), a: [...out], row: true }]; };
    S.frame(L("savedBy[day] = money at the end of the day if nothing is stolen: a prefix sum of the daily rates, built once for every day. It strictly increases, so 'first day with savedBy ≥ target' is a lower_bound.", "savedBy[day] = เงินตอนจบวันถ้าไม่โดนขโมย: ผลรวมสะสมของอัตรารายวัน สร้างครั้งเดียวสำหรับทุกวัน มันเพิ่มขึ้นเสมอ 'วันแรกที่ savedBy ≥ เป้า' จึงเป็น lower_bound"), view());
    for (const [P, x] of Q) {
      const sx = x < D ? saved[x] : saved[D - 1] + (x - D + 1) * rate[D - 1];
      const target = P + (sx >= P ? 0 : sx);
      let ans = 0; while (ans < D && saved[ans] < target) ans++;
      S.check(ans < D, L("this demo only draws answers up to day 60", "ตัวอย่างนี้วาดคำตอบได้ถึงวันที่ 60 เท่านั้น"));
      out.push(String(ans));
      S.frame(sx >= P ? L(`P = ${P}, scam on day ${x}: savedBy[${x}] = ${sx} ≥ ${P}, so he buys before the scam. Target = ${P}; first day with savedBy ≥ ${P} is <b>${ans}</b>.`, `P = ${P} โดนหลอกวันที่ ${x}: savedBy[${x}] = ${sx} ≥ ${P} จึงซื้อก่อนโดนหลอก เป้า = ${P} วันแรกที่ savedBy ≥ ${P} คือ <b>${ans}</b>`)
        : L(`P = ${P}, scam on day ${x}: savedBy[${x}] = ${sx} < ${P}, and those ${sx} are lost. After that he needs P more, i.e. savedBy ≥ ${P} + ${sx} = ${target}. First such day: <b>${ans}</b>.`, `P = ${P} โดนหลอกวันที่ ${x}: savedBy[${x}] = ${sx} < ${P} และเงิน ${sx} นั้นหายไป หลังจากนั้นต้องเก็บอีก P จึงต้องมี savedBy ≥ ${P} + ${sx} = ${target} วันแรกแบบนั้น: <b>${ans}</b>`), view(x, target, ans));
    }
  }
});
