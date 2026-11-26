VIZ.def("da66_m1_line_monopoly", {
  title: VIZ.L("Merging a purchase into the map of blocks", "รวมการซื้อเข้ากับ map ของก้อน"),
  input: "6\n1 10 20\n1 4 7\n2\n1 30 35\n1 5 11\n2",
  presets: [{ name: VIZ.L("Merge example", "ตัวอย่างการรวม"), input: "6\n1 10 20\n1 4 7\n2\n1 30 35\n1 5 11\n2" },
            { name: VIZ.L("Touching blocks", "ก้อนที่ติดกัน"), input: "4\n1 7 8\n1 3 4\n1 5 6\n2" },
            { name: VIZ.L("One big purchase", "ซื้อก้อนใหญ่ครั้งเดียว"), input: "7\n1 5 10\n1 15 20\n1 25 30\n1 35 40\n2\n1 7 37\n2" }],
  limit: VIZ.L("n ≤ 15, cells ≤ 60", "n ≤ 15 ช่อง ≤ 60"),
  legend: [["cur", VIZ.L("new purchase", "การซื้อใหม่")], ["bad", VIZ.L("block being swallowed", "ก้อนที่กำลังถูกกลืน")], ["vis", VIZ.L("block in the map", "ก้อนใน map")], ["ok", VIZ.L("merged block", "ก้อนที่รวมแล้ว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(); S.check(n <= 15, L("keep n ≤ 15", "ให้ n ≤ 15"));
    const acts = []; for (let i = 0; i < n; i++) { const ty = t.int(); if (ty === 1) { const a = t.int(), b = t.int(); S.check(b <= 60, L("cells ≤ 60", "ช่อง ≤ 60")); acts.push([a, b]); } else acts.push(null); }
    const hi = Math.max(10, ...acts.filter(x => x).map(x => x[1])) + 2;
    let owned = []; const out = [];
    const view = (extra, cls) => ({ t: "iv", title: L("owned blocks (top) and the purchase (bottom row)", "ก้อนที่ซื้อแล้ว (บน) และการซื้อ (แถวล่าง)"), lo: 0, hi, tick: hi > 30 ? 5 : 1, full: true,
      iv: owned.map(([s, e], i) => ({ s, e: e + 1, l: `[${s},${e}]`, c: (cls && cls[i]) || "vis", row: 0 })).concat(extra ? [{ s: extra[0], e: extra[1] + 1, l: `[${extra[0]},${extra[1]}]`, c: extra[2] || "cur", row: 1 }] : []) });
    const mapv = () => ({ t: "table", title: L("map owned (start → end)", "map owned (start → end)"), h: ["start", "end"], r: owned.map(([s, e]) => [s, e]) });
    S.frame(L("The map starts empty.", "map เริ่มว่าง"), [view(), mapv()]);
    for (const a of acts) {
      if (!a) { out.push(owned.length); S.frame(L(`query: owned.size() = <b>${owned.length}</b>.`, `ถาม: owned.size() = <b>${owned.length}</b>`), [view(), mapv(), { t: "list", title: L("output", "ผลลัพธ์"), a: out.map(String), c: { [out.length - 1]: "ok" } }]); continue; }
      let [from, to] = a;
      let idx = owned.findIndex(([s]) => s > from);
      if (idx < 0) idx = owned.length;
      let start = idx;
      if (idx > 0 && owned[idx - 1][1] >= from - 1) start = idx - 1;
      S.frame(L(`buy [${from}, ${to}]. upper_bound(${from}) → ${idx < owned.length ? "[" + owned[idx].join(",") + "]" : "end"}` + (start < idx ? `; the block before, [${owned[start].join(",")}], reaches ${owned[start][1]} ≥ ${from - 1}, so start there.` : `; the block before (if any) ends before ${from - 1}.`),
                `ซื้อ [${from}, ${to}] upper_bound(${from}) → ${idx < owned.length ? "[" + owned[idx].join(",") + "]" : "end"}` + (start < idx ? ` ก้อนก่อนหน้า [${owned[start].join(",")}] ยื่นถึง ${owned[start][1]} ≥ ${from - 1} จึงเริ่มที่ก้อนนั้น` : ` ก้อนก่อนหน้า (ถ้ามี) จบก่อน ${from - 1}`)), [view([from, to]), mapv()]);
      while (start < owned.length && owned[start][0] <= to + 1) {
        const [s, e] = owned[start];
        S.frame(L(`[${s},${e}] starts at ${s} ≤ ${to + 1} → swallow it.`, `[${s},${e}] เริ่มที่ ${s} ≤ ${to + 1} → กลืน`), [view([from, to], { [start]: "bad" }), mapv()]);
        from = Math.min(from, s); to = Math.max(to, e); owned.splice(start, 1);
        S.frame(L(`erase it; the purchase grows to [${from}, ${to}].`, `ลบออก การซื้อขยายเป็น [${from}, ${to}]`), [view([from, to]), mapv()]);
      }
      if (start < owned.length) S.frame(L(`next block [${owned[start].join(",")}] starts after ${to + 1} → stop.`, `ก้อนถัดไป [${owned[start].join(",")}] เริ่มหลัง ${to + 1} → หยุด`), [view([from, to]), mapv()]);
      owned.splice(start, 0, [from, to]);
      S.frame(L(`insert owned[${from}] = ${to}. The map has ${owned.length} block(s).`, `ใส่ owned[${from}] = ${to} map มี ${owned.length} ก้อน`), [view(null, { [start]: "ok" }), mapv()]);
    }
  }
});
