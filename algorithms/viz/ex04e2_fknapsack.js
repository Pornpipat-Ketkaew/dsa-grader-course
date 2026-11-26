VIZ.def("ex04e2_fknapsack", {
  title: VIZ.L("Best value per unit of weight first", "หยิบของที่คุ้มต่อน้ำหนักที่สุดก่อน"),
  input: "5.5 4\n2 3 4 5\n1 2 3 4",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5.5 4\n2 3 4 5\n1 2 3 4" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "6 3\n5 3 3\n4 3 3" }, { name: VIZ.L("Everything fits", "ใส่ได้ทั้งหมด"), input: "100 2\n3 4\n1 2" }],
  limit: VIZ.L("N ≤ 8", "N ≤ 8"),
  maxFrames: 40,
  legend: [["cur", VIZ.L("item being considered", "ของที่กำลังพิจารณา")], ["ok", VIZ.L("taken whole", "หยิบทั้งชิ้น")], ["vis", VIZ.L("taken partly", "หยิบบางส่วน")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), W = t.num(), n = t.int();
    S.check(n >= 1 && n <= 8, L("keep N ≤ 8", "ให้ N ≤ 8"));
    const v = [], w = []; for (let i = 0; i < n; i++) v.push(t.num()); for (let i = 0; i < n; i++) w.push(t.num());
    const ord = [...Array(n).keys()].sort((a, b) => v[b] * w[a] - v[a] * w[b]);
    const frac = Array(n).fill(null); let room = W, total = 0, cur = -1;
    const f = x => (Math.round(x * 10000) / 10000).toString();
    const view = () => {
      const seg = []; let x = 0;
      ord.forEach(i => { if (frac[i] > 0) { seg.push({ s: x, e: x + frac[i] * w[i], l: `#${i + 1}`, c: frac[i] < 1 ? "vis" : "ok", row: 0 }); x += frac[i] * w[i]; } });
      return [{ t: "table", title: L("items sorted by price / weight (best first)", "ของเรียงตาม price / weight (คุ้มที่สุดก่อน)"), h: ["item", "price", "weight", "price/weight", "taken"],
          r: ord.map(i => [`#${i + 1}`, v[i], w[i], f(v[i] / w[i]), frac[i] == null ? "" : frac[i] === 1 ? "all" : frac[i] === 0 ? "0" : f(frac[i])]),
          c: Object.fromEntries(ord.flatMap((i, r) => [0, 1, 2, 3, 4].map(cc => [`${r},${cc}`, i === cur ? "cur" : frac[i] === 1 ? "ok" : frac[i] > 0 ? "vis" : ""]))) },
        { t: "iv", title: L(`the bag, capacity ${W}`, `กระเป๋า ความจุ ${W}`), lo: 0, hi: W, iv: seg.length ? seg : [{ s: 0, e: 0, l: "", row: 0 }], full: true },
        { t: "vars", v: [["room", f(room)], ["total", f(total), "ok"]] }];
    };
    S.frame(L("Sort by price per unit weight, best first (compare v[a]·w[b] with v[b]·w[a], no division).", "เรียงตามราคาต่อหน่วยน้ำหนัก คุ้มที่สุดก่อน (เทียบ v[a]·w[b] กับ v[b]·w[a] ไม่ต้องหาร)"), view());
    for (const i of ord) {
      if (room <= 0) break;
      cur = i;
      if (w[i] <= room) { frac[i] = 1; total += v[i]; room -= w[i]; S.frame(L(`#${i + 1} (weight ${w[i]}) fits in room → take all of it, +${v[i]}.`, `#${i + 1} (หนัก ${w[i]}) ใส่ได้ทั้งชิ้น → หยิบทั้งหมด +${v[i]}`), view()); }
      else { const x = room / w[i]; frac[i] = x; total += v[i] * x; S.frame(L(`#${i + 1} (weight ${w[i]}) does not fit in room ${f(room)} → take the fraction ${f(room)}/${w[i]} = ${f(x)}, +${f(v[i] * x)}. The bag is full.`, `#${i + 1} (หนัก ${w[i]}) ใส่ไม่พอในที่ว่าง ${f(room)} → หยิบสัดส่วน ${f(room)}/${w[i]} = ${f(x)} ได้ +${f(v[i] * x)} กระเป๋าเต็ม`), view()); room = 0; }
    }
    cur = -1;
    S.frame(L(`Answer: <b>${total.toFixed(4)}</b>.`, `คำตอบ: <b>${total.toFixed(4)}</b>`), view());
  }
});
