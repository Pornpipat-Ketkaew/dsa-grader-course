VIZ.def("da68_f2_zero_one_subset_sum", {
  title: VIZ.L("Fill the 1s one by one: ways by sum", "แทนเลข 1 ทีละตัว: นับวิธีตามผลรวม"),
  input: "6 7 6\n1 0 1 0 1 0",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "6 7 6\n1 0 1 0 1 0" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3 2 4\n1 0 1" }, { name: "K = 3, S = 7", input: "4 3 7\n1 1 1 0" }],
  limit: VIZ.L("S ≤ 14", "S ≤ 14"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("ways after this 1", "จำนวนวิธีหลังเลข 1 ตัวนี้")], ["vis", VIZ.L("previous sums it comes from (value 1..K)", "ผลรวมก่อนหน้าที่มาได้ (ค่า 1..K)")], ["ok", VIZ.L("answer", "คำตอบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), K = t.int(), T = t.int();
    S.check(T <= 14, L("keep S ≤ 14", "ให้ S ≤ 14"));
    let ones = 0; for (let i = 0; i < n; i++) ones += t.int();
    const rows = [[1, ...Array(T).fill(0)]], rh = ["0 ones"];
    const view = (c) => [{ t: "table", title: L(`ways[filled][sum], ${ones} ones, values 1..${K}`, `ways[filled][sum] มีเลข 1 ${ones} ตัว ค่า 1..${K}`), h: [...Array(T + 1).keys()], rh, corner: "sum →", r: rows, c: c || {} }];
    S.frame(L(`Zeros add nothing, so only the ${ones} ones matter. Before filling any: one way to have sum 0.`, `เลข 0 ไม่เพิ่มอะไร จึงสนใจแค่เลข 1 ทั้ง ${ones} ตัว ก่อนแทนตัวใด: ผลรวม 0 มีวิธีเดียว`), view());
    for (let f = 1; f <= ones; f++) {
      const prev = rows[rows.length - 1], nx = Array(T + 1).fill(""); rows.push(nx); rh.push(f + (f === 1 ? " one" : " ones"));
      for (let s = 0; s <= T; s++) {
        let v = 0; const c = { [`${f},${s}`]: "cur" };
        for (let x = 1; x <= K && s - x >= 0; x++) { v += prev[s - x]; if (prev[s - x]) c[`${f - 1},${s - x}`] = "vis"; }
        nx[s] = v;
        if (v) S.frame(L(`filled ${f}, sum ${s}: the new 1 becomes x = 1..${K}, so add ways[${f - 1}][${s} − x] → ${v}.`, `แทนแล้ว ${f} ตัว ผลรวม ${s}: เลข 1 ตัวใหม่เป็น x = 1..${K} จึงบวก ways[${f - 1}][${s} − x] → ${v}`), view(c));
      }
    }
    const ans = rows[rows.length - 1][T];
    S.frame(L(`Answer ways[${ones}][${T}] = <b>${ans}</b>.`, `คำตอบ ways[${ones}][${T}] = <b>${ans}</b>`), view({ [`${ones},${T}`]: "ok" }));
  }
});
