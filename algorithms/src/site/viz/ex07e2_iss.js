VIZ.def("ex07e2_iss", {
  title: VIZ.L("Allow part sizes one at a time", "อนุญาตขนาดชิ้นทีละขนาด"),
  input: "6",
  presets: [{ name: "N = 6", input: "6" }, { name: "N = 5", input: "5" }, { name: "N = 8", input: "8" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("ways[sum] being updated", "ways[sum] ที่กำลังอัปเดต")], ["vis", VIZ.L("ways[sum − part] (already allows part)", "ways[sum − part] (ใช้ part ได้แล้ว)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 10, L("keep N ≤ 10", "ให้ N ≤ 10"));
    const w = Array(n + 1).fill(0); w[0] = 1; const rows = [[...w]], rh = ["parts: none"];
    const view = (part, sum) => { const c = {}; const r = rows.length - 1; if (sum != null) { c[`${r},${sum}`] = "cur"; c[`${r},${sum - part}`] = "vis"; }
      return [{ t: "table", title: L("ways[sum] after allowing parts 1..part (one row per part)", "ways[sum] หลังอนุญาตชิ้น 1..part (แถวละ part)"), h: [...Array(n + 1).keys()], rh, corner: "sum →", r: rows, c }]; };
    S.frame(L("Before any part is allowed only the empty sequence exists: ways[0] = 1.", "ก่อนอนุญาตชิ้นใด มีแค่ลำดับว่าง: ways[0] = 1"), view());
    for (let p = 1; p <= n; p++) {
      rows.push([...w]); rh.push("parts 1.." + p);
      for (let s = p; s <= n; s++) { w[s] += w[s - p]; rows[rows.length - 1] = [...w];
        S.frame(L(`part ${p}, sum ${s}: sequences ending in ${p} = ways[${s - p}] (which may already end in ${p}) → ways[${s}] = ${w[s]}.`, `part ${p}, sum ${s}: ลำดับที่จบด้วย ${p} = ways[${s - p}] (ซึ่งอาจจบด้วย ${p} อยู่แล้ว) → ways[${s}] = ${w[s]}`), view(p, s)); }
    }
    S.frame(L(`Answer ways[${n}] = <b>${w[n]}</b>.`, `คำตอบ ways[${n}] = <b>${w[n]}</b>`), view());
  }
});
