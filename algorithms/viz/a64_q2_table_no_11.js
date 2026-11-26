VIZ.def("a64_q2_table_no_11", {
  title: VIZ.L("Three column states, counted column by column", "สถานะของคอลัมน์สามแบบ นับทีละคอลัมน์"),
  input: "6",
  presets: [{ name: "n = 6", input: "6" }, { name: "n = 3", input: "3" }, { name: "n = 10", input: "10" }],
  limit: VIZ.L("n ≤ 12", "n ≤ 12"),
  maxFrames: 30,
  legend: [["cur", VIZ.L("column just added", "คอลัมน์ที่เพิ่งเพิ่ม")], ["ok", VIZ.L("allowed transition", "การต่อที่อนุญาต")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 12, L("keep n ≤ 12", "ให้ n ≤ 12"));
    const rows = [[], [], [], []];
    const graph = { t: "graph", title: L("which column may follow which", "คอลัมน์ไหนต่อหลังคอลัมน์ไหนได้"), W: 300, H: 240, r: 22,
      n: [{ id: 0, x: 150, y: 190, l: "0/0", s: VIZ.L("empty, may repeat ↻", "ว่าง ต่อตัวเองได้ ↻") }, { id: 1, x: 70, y: 60, l: "1/0", s: "top" }, { id: 2, x: 230, y: 60, l: "0/1", s: "bottom" }],
      e: [{ a: 0, b: 1, d: true, bend: 12, c: "ok" }, { a: 1, b: 0, d: true, bend: 12, c: "ok" }, { a: 0, b: 2, d: true, bend: 12, c: "ok" }, { a: 2, b: 0, d: true, bend: 12, c: "ok" }, { a: 1, b: 2, d: true, bend: 12, c: "ok" }, { a: 2, b: 1, d: true, bend: 12, c: "ok" }] };
    const view = (k) => [graph, { t: "table", title: L("tables of length column, by the state of the last column", "จำนวนตารางยาว column แยกตามสถานะของคอลัมน์สุดท้าย"), h: rows[0].map((_, i) => i + 1), rh: ["ends 0/0", "ends 1/0", "ends 0/1", "total"], corner: "column", r: rows,
      c: k == null ? {} : { [`0,${k}`]: "cur", [`1,${k}`]: "cur", [`2,${k}`]: "cur", [`3,${k}`]: "cur" } }];
    let e = 1, tp = 1, b = 1;
    const push = () => { rows[0].push(e); rows[1].push(tp); rows[2].push(b); rows[3].push((e + tp + b) % 100000007); };
    push();
    S.frame(L("Length 1: one table per state. A 1/1 column is forbidden (two 1s on top of each other), and 1/0 after 1/0 or 0/1 after 0/1 puts two 1s side by side.", "ยาว 1: สถานะละหนึ่งตาราง คอลัมน์ 1/1 ห้าม (1 สองตัวซ้อนกัน) และ 1/0 ต่อ 1/0 หรือ 0/1 ต่อ 0/1 ทำให้ 1 อยู่ติดกันในแถว"), view(0));
    for (let c = 2; c <= n; c++) {
      const ne = (e + tp + b) % 100000007, nt = (e + b) % 100000007, nb = (e + tp) % 100000007;
      const caption = L(`column ${c}: 0/0 ← any (${e}+${tp}+${b} = ${ne}); 1/0 ← 0/0 or 0/1 (${e}+${b} = ${nt}); 0/1 ← 0/0 or 1/0 (${e}+${tp} = ${nb}).`, `คอลัมน์ ${c}: 0/0 ← ได้ทุกแบบ (${e}+${tp}+${b} = ${ne}); 1/0 ← 0/0 หรือ 0/1 (${e}+${b} = ${nt}); 0/1 ← 0/0 หรือ 1/0 (${e}+${tp} = ${nb})`);
      e = ne; tp = nt; b = nb; push();
      S.frame(caption, view(c - 1));
    }
    S.frame(L(`Answer for n = ${n}: <b>${rows[3][n - 1]}</b>.`, `คำตอบเมื่อ n = ${n}: <b>${rows[3][n - 1]}</b>`), view(n - 1));
  }
});
