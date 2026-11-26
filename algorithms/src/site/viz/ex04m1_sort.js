VIZ.def("ex04m1_sort", {
  title: VIZ.L("Zones, the 3×3 table, then the swaps themselves", "โซน ตาราง 3×3 แล้วดูการสลับจริง"),
  input: "7\n2 2 1 3 2 1 3",
  presets: [{ name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "7\n2 2 1 3 2 1 3" },
            { name: VIZ.L("Pure 3-cycle", "วงสามตัวล้วน"), input: "3\n3 1 2" },
            { name: VIZ.L("Mixed", "ผสม"), input: "12\n3 3 2 1 2 3 1 1 2 3 1 2" }],
  limit: VIZ.L("N ≤ 16", "N ≤ 16"),
  legend: [["ok", VIZ.L("in its zone", "อยู่ในโซนถูก")], ["bad", VIZ.L("misplaced", "ผิดโซน")], ["cur", VIZ.L("being swapped", "กำลังสลับ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 16, L("keep N ≤ 16", "ให้ N ≤ 16"));
    const a = []; for (let i = 0; i < n; i++) { const v = t.int(); S.check(v >= 1 && v <= 3, L("values must be 1, 2 or 3", "ค่าต้องเป็น 1, 2 หรือ 3")); a.push(v); }
    const cnt = [0, 0, 0, 0]; a.forEach(v => cnt[v]++);
    const e1 = cnt[1], e2 = cnt[1] + cnt[2], zone = i => i < e1 ? 1 : i < e2 ? 2 : 3;
    const zl = Array.from({ length: n }, (_, i) => "z" + zone(i));
    const M = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let swaps = 0;
    const arr = (hi, extraC) => { const c = {}; a.forEach((v, i) => c[i] = v === zone(i) ? "ok" : "bad"); (hi || []).forEach(i => c[i] = "cur"); return { t: "arr", title: L("array (top: zone of each position)", "อาร์เรย์ (บน: โซนของแต่ละตำแหน่ง)"), a, c, il: zl }; };
    const tab = (hc) => ({ t: "table", title: L("misplaced[zone][value]", "misplaced[zone][value]"), h: ["holds 1", "holds 2", "holds 3"], rh: ["zone 1", "zone 2", "zone 3"],
      r: [1, 2, 3].map(z => [1, 2, 3].map(v => M[z][v])), c: Object.assign({}, ...[1, 2, 3].map(z => ({ [(z - 1) + "," + (z - 1)]: "dim" })), hc || {}) });
    S.frame(L(`Counts: 1 → ${cnt[1]}, 2 → ${cnt[2]}, 3 → ${cnt[3]}. So zone 1 = [0, ${e1}), zone 2 = [${e1}, ${e2}), zone 3 = [${e2}, ${n}).`,
              `นับได้: 1 → ${cnt[1]}, 2 → ${cnt[2]}, 3 → ${cnt[3]} ดังนั้น โซน 1 = [0, ${e1}), โซน 2 = [${e1}, ${e2}), โซน 3 = [${e2}, ${n})`), [arr(), tab()]);
    for (let i = 0; i < n; i++) { M[zone(i)][a[i]]++; }
    S.frame(L("Fill the table: one count per position (zone, value). Off-diagonal cells are the misplaced elements.", "เติมตาราง: นับทีละตำแหน่ง (โซน, ค่า) ช่องนอกเส้นทแยงคือตัวที่ผิดที่"), [arr(), tab()]);
    const pairs = Math.min(M[1][2], M[2][1]) + Math.min(M[1][3], M[3][1]) + Math.min(M[2][3], M[3][2]);
    const wrong = M[1][2] + M[2][1] + M[1][3] + M[3][1] + M[2][3] + M[3][2];
    S.frame(L(`pairSwaps = min(${M[1][2]},${M[2][1]}) + min(${M[1][3]},${M[3][1]}) + min(${M[2][3]},${M[3][2]}) = ${pairs}. Misplaced total = ${wrong}, so ${wrong - 2 * pairs} remain in 3-cycles → ${(wrong - 2 * pairs) / 3 * 2} more swaps. Answer <b>${pairs + (wrong - 2 * pairs) / 3 * 2}</b>. Now watch it happen.`,
              `pairSwaps = min(${M[1][2]},${M[2][1]}) + min(${M[1][3]},${M[3][1]}) + min(${M[2][3]},${M[3][2]}) = ${pairs} ผิดที่ทั้งหมด ${wrong} ตัว จึงเหลือ ${wrong - 2 * pairs} ตัวในวงสามตัว → สลับเพิ่ม ${(wrong - 2 * pairs) / 3 * 2} ครั้ง คำตอบ <b>${pairs + (wrong - 2 * pairs) / 3 * 2}</b> มาดูการสลับจริงกัน`),
      [arr(), tab({ "0,1": "cur", "1,0": "cur", "0,2": "vis", "2,0": "vis", "1,2": "path", "2,1": "path" })]);
    const find = (z, v) => { for (let i = 0; i < n; i++) if (zone(i) === z && a[i] === v) return i; return -1; };
    const doSwap = (i, j, cap) => {
      S.frame(cap, [arr([i, j]), { t: "vars", v: [["swaps", swaps]] }]);
      [a[i], a[j]] = [a[j], a[i]]; swaps++;
      S.frame(L(`swapped → swaps = ${swaps}`, `สลับแล้ว → swaps = ${swaps}`), [arr([i, j]), { t: "vars", v: [["swaps", swaps, "cur"]] }]);
    };
    for (const [x, y] of [[1, 2], [1, 3], [2, 3]]) {
      while (true) { const i = find(x, y), j = find(y, x); if (i < 0 || j < 0) break;
        doSwap(i, j, L(`2-cycle: a ${y} in zone ${x} and a ${x} in zone ${y} → one swap fixes both.`, `วงสองตัว: เลข ${y} ในโซน ${x} และเลข ${x} ในโซน ${y} → สลับครั้งเดียวแก้ได้ทั้งคู่`)); }
    }
    while (true) {
      let i = find(1, 2), j, k;
      if (i >= 0) { j = find(2, 3); k = find(3, 1); } else { i = find(1, 3); if (i < 0) break; j = find(3, 2); k = find(2, 1); }
      const one = a[i] === 2 ? find(3, 1) : find(2, 1);
      doSwap(i, one, L(`3-cycle: no pair left. Swap to put a 1 into zone 1 (one element fixed) ...`, `วงสามตัว: ไม่มีคู่เหลือ สลับเพื่อให้เลข 1 เข้าโซน 1 (แก้ได้หนึ่งตัว) ...`));
      let p = -1, q = -1; for (const [x, y] of [[2, 3], [3, 2]]) { const u = find(x, y), w = find(y, x); if (u >= 0 && w >= 0) { p = u; q = w; break; } }
      if (p >= 0) doSwap(p, q, L(`... which leaves a 2-cycle: one more swap fixes the other two.`, `... เหลือเป็นวงสองตัว สลับอีกครั้งแก้อีกสองตัว`));
    }
    S.frame(L(`Sorted with <b>${swaps}</b> swaps, matching the formula.`, `เรียงเสร็จด้วยการสลับ <b>${swaps}</b> ครั้ง ตรงกับสูตร`), [arr(), { t: "vars", v: [["swaps", swaps, "ok"]] }]);
  }
});
