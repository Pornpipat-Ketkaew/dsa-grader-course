VIZ.def("a65_q2a_huge_array", {
  title: VIZ.L("Sort the runs, prefix-sum the counts, binary search the position", "เรียงชุดตัวเลข ทำผลรวมสะสมของจำนวน แล้ว binary search ตำแหน่ง"),
  input: "5 3\n9 1\n4 5\n9 3\n8 3\n7 7\n1\n15\n8",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5 3\n9 1\n4 5\n9 3\n8 3\n7 7\n1\n15\n8" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "5 2\n1 1\n10 1\n5 1\n1 1\n3 1\n5\n1" }],
  limit: VIZ.L("N ≤ 8, total ≤ 30", "N ≤ 8, รวม ≤ 30"),
  maxFrames: 40,
  legend: [["ok", VIZ.L("run holding the position", "ชุดที่มีตำแหน่งนั้น")], ["dim", VIZ.L("last[i] < position", "last[i] < ตำแหน่ง")], ["cur", VIZ.L("the asked position", "ตำแหน่งที่ถาม")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), q = t.int();
    S.check(n >= 1 && n <= 8, L("keep N ≤ 8", "ให้ N ≤ 8"));
    const R = []; for (let i = 0; i < n; i++) R.push([t.int(), t.int()]);
    const total = R.reduce((s, r) => s + r[1], 0); S.check(total <= 30, L("keep the total count ≤ 30", "ให้จำนวนรวม ≤ 30"));
    const raw = R.map(r => `(${r[0]},${r[1]})`).join(" ");
    R.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const last = []; let s = 0; R.forEach(r => { s += r[1]; last.push(s); });
    const huge = []; R.forEach((r, i) => { for (let j = 0; j < r[1]; j++) huge.push(i); });
    const out = [];
    const view = (pos, run) => {
      const c = {}, hc = {};
      if (run != null) { for (let i = 0; i < run; i++) c[i] = "dim"; c[run] = "ok"; huge.forEach((ri, j) => { if (ri === run) hc[j] = "ok"; }); hc[pos - 1] = "cur"; }
      return [{ t: "table", title: L("runs sorted by value", "ชุดตัวเลขเรียงตามค่า"), h: R.map((_, i) => i), rh: ["value", "copies", "last[i]"], corner: "run", r: [R.map(r => r[0]), R.map(r => r[1]), last], c: Object.fromEntries(Object.entries(c).flatMap(([i, v]) => [[`0,${i}`, v], [`1,${i}`, v], [`2,${i}`, v]])) },
        { t: "arr", title: L("the huge array (only drawn here because it is tiny)", "อาร์เรย์ใหญ่ (วาดได้เพราะตัวอย่างเล็ก)"), a: huge.map(i => R[i][0]), c: hc, idx: 1, size: "small" },
        { t: "list", title: L("answers", "คำตอบ"), a: [...out], row: true }];
    };
    S.frame(L(`Runs ${raw}. Sorted by value, the sorted huge array is just these runs one after another. last[i] = running total of copies = the position of the last copy of run i.`, `ชุดตัวเลข ${raw} เมื่อเรียงตามค่า อาร์เรย์ใหญ่ที่เรียงแล้วก็คือชุดเหล่านี้ต่อกัน last[i] = ผลรวมสะสมของจำนวน = ตำแหน่งของสำเนาสุดท้ายของชุด i`), view());
    for (let k = 0; k < q; k++) {
      const pos = t.int(); let run = 0; while (last[run] < pos) run++;
      out.push(String(R[run][0]));
      S.frame(L(`position ${pos}: lower_bound(last, ${pos}) = first run with last ≥ ${pos} → run ${run} (positions ${run ? last[run - 1] + 1 : 1}..${last[run]}), value <b>${R[run][0]}</b>.`, `ตำแหน่ง ${pos}: lower_bound(last, ${pos}) = ชุดแรกที่ last ≥ ${pos} → ชุด ${run} (ตำแหน่ง ${run ? last[run - 1] + 1 : 1}..${last[run]}) ค่า <b>${R[run][0]}</b>`), view(pos, run));
    }
  }
});
