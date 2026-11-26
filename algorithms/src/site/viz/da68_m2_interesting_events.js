VIZ.def("da68_m2_interesting_events", {
  title: VIZ.L("Sweeping +1/−1 events, then answering queries", "กวาดเหตุการณ์ +1/−1 แล้วตอบคำถาม"),
  input: "3 2\n1 4\n3 6\n4 8\n5\n2\n4\n6\n8\n9",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "3 2\n1 4\n3 6\n4 8\n5\n2\n4\n6\n8\n9" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3 1\n1 3\n2 5\n4 6\n5\n1\n2\n3\n5\n7" },
            { name: VIZ.L("Two stretches", "สองช่วง"), input: "5 2\n1 3\n2 4\n6 9\n8 12\n10 11\n4\n3\n5\n9\n11" }],
  limit: VIZ.L("n ≤ 10, days ≤ 40", "n ≤ 10 วัน ≤ 40"),
  legend: [["vis", VIZ.L("booth open", "บูธที่เปิด")], ["ok", VIZ.L("interesting stretch", "ช่วงน่าสนใจ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), k = t.int();
    S.check(n >= 1 && n <= 10, L("keep n ≤ 10", "ให้ n ≤ 10"));
    const B = []; for (let i = 0; i < n; i++) { const l = t.int(), r = t.int(); S.check(r <= 40, L("days ≤ 40", "วัน ≤ 40")); B.push([l, r]); }
    const q = t.int(), Q = []; for (let i = 0; i < q; i++) Q.push(t.int());
    const hi = Math.max(...B.map(b => b[1]), ...Q) + 2;
    const ev = []; B.forEach(([l, r]) => { ev.push([l, 1]); ev.push([r + 1, -1]); }); ev.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const from = [], until = [];
    const ivs = (day, extra) => {
      const iv = B.map(([l, r], i) => ({ s: l, e: r + 1, l: `[${l},${r}]`, c: day != null && l <= day && day <= r ? "vis" : "", row: i }));
      from.forEach((f, i) => iv.push({ s: f, e: until[i] == null ? (day != null ? day : f) + 0.001 : until[i], l: "≥ k", c: "ok", row: n }));
      return { t: "iv", title: L("booths (bar = open days) and interesting stretches", "บูธ (แท่ง = วันที่เปิด) และช่วงน่าสนใจ"), iv, lo: 0, hi, tick: hi > 20 ? 5 : 1, marks: extra || [], full: true };
    };
    const lists = (cnt) => ({ t: "vars", v: [["k", k], ["openNow", cnt, "cur"], ["from", "[" + from.join(", ") + "]"], ["until", "[" + until.join(", ") + "]"]] });
    S.frame(L(`Events: ${ev.map(e => `(${e[0]},${e[1] > 0 ? "+1" : "−1"})`).join(" ")}, sorted by day.`, `เหตุการณ์: ${ev.map(e => `(${e[0]},${e[1] > 0 ? "+1" : "−1"})`).join(" ")} เรียงตามวัน`), [ivs(null), lists(0)]);
    let cnt = 0;
    for (let i = 0; i < ev.length;) {
      const day = ev[i][0], was = cnt >= k; const parts = [];
      while (i < ev.length && ev[i][0] === day) { cnt += ev[i][1]; parts.push(ev[i][1] > 0 ? "+1" : "−1"); i++; }
      const now = cnt >= k; let msg = { en: "", th: "" };
      if (!was && now) { from.push(day); msg = L(` Count reached ${k}: a stretch starts at day ${day}.`, ` จำนวนถึง ${k}: ช่วงเริ่มที่วัน ${day}`); }
      if (was && !now) { until.push(day); msg = L(` Count fell below ${k}: the stretch ends before day ${day}.`, ` จำนวนลดต่ำกว่า ${k}: ช่วงจบก่อนวัน ${day}`); }
      S.frame({ en: `day ${day}: apply ${parts.join(", ")} → openNow = ${cnt}.` + msg.en, th: `วัน ${day}: ใส่ ${parts.join(", ")} → openNow = ${cnt}` + msg.th },
        [ivs(day, [{ x: day, l: "day " + day }]), lists(cnt)]);
    }
    const out = [];
    for (const x of Q) {
      let i = -1; for (let j = 0; j < from.length; j++) if (from[j] <= x) i = j;
      const yes = i >= 0 && x < until[i];
      out.push(`${x} → ${yes ? "YES" : "NO"}`);
      S.frame(i < 0 ? L(`query ${x}: no stretch starts on or before ${x} → NO.`, `คำถาม ${x}: ไม่มีช่วงที่เริ่มไม่หลัง ${x} → NO`)
                    : L(`query ${x}: upper_bound(from, ${x}) − 1 = ${i} → stretch [${from[i]}, ${until[i]}). ${x} ${yes ? "<" : "≥"} ${until[i]} → ${yes ? "YES" : "NO"}.`,
                        `คำถาม ${x}: upper_bound(from, ${x}) − 1 = ${i} → ช่วง [${from[i]}, ${until[i]}) และ ${x} ${yes ? "<" : "≥"} ${until[i]} → ${yes ? "YES" : "NO"}`),
        [ivs(null, [{ x: x + 0.5, l: "x = " + x, c: yes ? "ok" : "bad" }]), { t: "list", title: L("answers", "คำตอบ"), a: [...out], c: { [out.length - 1]: yes ? "ok" : "bad" } }]);
    }
  }
});
