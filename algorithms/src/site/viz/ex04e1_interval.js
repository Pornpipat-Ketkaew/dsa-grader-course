VIZ.def("ex04e1_interval", {
  title: VIZ.L("Earliest finish first", "เลือกวิชาที่จบเร็วที่สุดก่อน"),
  input: "6\n1 3 0 5 3 5\n4 5 6 7 9 9",
  presets: [{ name: VIZ.L("Six classes", "หกวิชา"), input: "6\n1 3 0 5 3 5\n4 5 6 7 9 9" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3\n1 4 6\n5 7 10" }, { name: VIZ.L("Sample 2 (touching)", "ตัวอย่าง 2 (ชนกันพอดี)"), input: "4\n1 2 3 4\n2 3 4 5" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("being considered", "กำลังพิจารณา")], ["ok", VIZ.L("chosen", "เลือก")], ["bad", VIZ.L("overlaps the last chosen", "ทับกับวิชาที่เลือกล่าสุด")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 10, L("keep N ≤ 10", "ให้ N ≤ 10"));
    const st = [], fi = []; for (let i = 0; i < n; i++) st.push(t.int()); for (let i = 0; i < n; i++) fi.push(t.int());
    const ord = [...Array(n).keys()].sort((a, b) => fi[a] - fi[b] || st[a] - st[b]);
    const cls = Array(n).fill(""); let last = null, chosen = 0;
    const lo = Math.min(...st), hi = Math.max(...fi);
    const view = () => [{ t: "iv", title: L("classes in order of finish time (one row each)", "วิชาเรียงตามเวลาจบ (แถวละวิชา)"), lo, hi, full: true,
        iv: ord.map((c, r) => ({ s: st[c], e: fi[c], l: `#${c + 1} [${st[c]},${fi[c]}]`, c: cls[c], row: r })), marks: last == null ? [] : [{ x: last, l: "lastFinish = " + last, c: "ok" }] },
      { t: "vars", v: [["chosen", chosen, "ok"], ["lastFinish", last == null ? "−∞" : last]] }];
    S.frame(L("Sort by finish time. Walk down the rows; keep a class when it starts at or after lastFinish.", "เรียงตามเวลาจบ ไล่ทีละแถว เก็บวิชาที่เริ่มตอนหรือหลัง lastFinish"), view());
    for (const c of ord) {
      cls[c] = "cur";
      const ok = last == null || st[c] >= last;
      S.frame(ok ? L(`#${c + 1} starts at ${st[c]} ≥ ${last == null ? "−∞" : last} → no overlap, take it.`, `#${c + 1} เริ่มที่ ${st[c]} ≥ ${last == null ? "−∞" : last} → ไม่ทับ เลือก`)
                 : L(`#${c + 1} starts at ${st[c]} < ${last} → overlaps the last chosen class, skip.`, `#${c + 1} เริ่มที่ ${st[c]} < ${last} → ทับวิชาที่เลือกล่าสุด ข้าม`), view());
      if (ok) { cls[c] = "ok"; chosen++; last = fi[c]; } else cls[c] = "bad";
    }
    S.frame(L(`Done: <b>${chosen}</b> classes.`, `เสร็จ: <b>${chosen}</b> วิชา`), view());
  }
});
