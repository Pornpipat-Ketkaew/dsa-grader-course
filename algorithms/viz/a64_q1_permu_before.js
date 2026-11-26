VIZ.def("a64_q1_permu_before", {
  title: VIZ.L("Lexicographic permutations with precedence pruning", "สร้าง permutation ตามพจนานุกรมพร้อมตัดกิ่งตามลำดับก่อนหลัง"),
  input: "4 2\n3 2\n2 1",
  presets: [{ name: VIZ.L("Sample 4", "ตัวอย่าง 4"), input: "4 2\n3 2\n2 1" }, { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "3 1\n1 2" }, { name: VIZ.L("Sample 5", "ตัวอย่าง 5"), input: "4 2\n3 2\n0 1" }],
  limit: VIZ.L("n ≤ 4", "n ≤ 4"),
  maxFrames: 400,
  legend: [["cur", VIZ.L("current call", "การเรียกปัจจุบัน")], ["vis", VIZ.L("current path", "เส้นทางปัจจุบัน")], ["ok", VIZ.L("printed permutation", "permutation ที่พิมพ์")], ["bad", VIZ.L("pruned: predecessor not placed yet", "ตัดกิ่ง: ตัวที่ต้องมาก่อนยังไม่ถูกวาง")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 1 && n <= 4, L("keep n ≤ 4", "ให้ n ≤ 4"));
    const pre = Array(n).fill(-1), rules = [];
    for (let i = 0; i < m; i++) { const a = t.int(), b = t.int(); pre[b] = a; rules.push(`${a}→${b}`); }
    const used = Array(n).fill(false), perm = [], out = [], T = new VIZ.Tree(), path = [];
    const view = () => [T.panel(L("recursion tree (pruned choices shown with ✕)", "ต้นไม้ recursion (ตัวเลือกที่ถูกตัดแสดงด้วย ✕)"), { nw: 44, gx: 4 }),
      { t: "arr", title: L("used[value]", "used[value]"), a: used.map(x => x ? "✓" : "·"), c: Object.fromEntries(used.map((x, i) => [i, x ? "ok" : ""])) },
      { t: "arr", title: L("mustComeAfter[value]", "mustComeAfter[value]"), a: pre.map(x => x < 0 ? "–" : x) },
      { t: "list", title: L("printed", "พิมพ์แล้ว"), a: [...out] }];
    const mark = id => { T.n.forEach(x => { if (x.c === "cur" || x.c === "vis") x.c = ""; }); path.forEach(p => T.set(p, "vis")); T.set(id, "cur"); };
    const gen = (pos, id) => {
      path.push(id); mark(id);
      if (pos === n) { out.push(perm.join(" ")); T.set(id, "ok"); S.frame(L(`complete: print ${perm.join(" ")}.`, `ครบ: พิมพ์ ${perm.join(" ")}`), view()); path.pop(); return; }
      for (let v = 0; v < n; v++) {
        if (used[v]) continue;
        if (pre[v] >= 0 && !used[pre[v]]) {
          const x = T.add(id, v + "✕", "bad");
          S.frame(L(`position ${pos}: ${v} needs ${pre[v]} first, which is not placed → prune (the whole subtree is skipped).`, `ตำแหน่ง ${pos}: ${v} ต้องมี ${pre[v]} ก่อน แต่ยังไม่ถูกวาง → ตัดกิ่ง (ข้ามทั้งกิ่งย่อย)`), view());
          continue;
        }
        used[v] = true; perm.push(v);
        const kid = T.add(id, perm.join("")); mark(kid);
        S.frame(L(`position ${pos}: place ${v}` + (pre[v] >= 0 ? ` (its predecessor ${pre[v]} is already placed).` : "."), `ตำแหน่ง ${pos}: วาง ${v}` + (pre[v] >= 0 ? ` (ตัวที่ต้องมาก่อนคือ ${pre[v]} ถูกวางแล้ว)` : "")), view());
        gen(pos + 1, kid);
        used[v] = false; perm.pop(); mark(id);
      }
      path.pop();
    };
    const root = T.add(null, "start");
    S.frame(L(`Rules: ${rules.join(", ") || "none"}. Values are tried 0, 1, …, n−1 at every position.`, `กฎ: ${rules.join(", ") || "ไม่มี"} ลองค่า 0, 1, …, n−1 ทุกตำแหน่ง`), view());
    gen(0, root);
    S.frame(L(`Done: ${out.length} permutation(s), in lexicographic order.`, `เสร็จ: ${out.length} permutation เรียงตามพจนานุกรม`), view());
  }
});
