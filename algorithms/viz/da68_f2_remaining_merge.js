VIZ.def("da68_f2_remaining_merge", {
  title: VIZ.L("Merge sort, counting the leftover appends", "Merge sort พร้อมนับการต่อท้ายส่วนที่เหลือ"),
  input: "5\n0 1 1 0 1",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5\n0 1 1 0 1" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3\n3 1 2" }, { name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "7\n0 0 0 0 0 0 0" }, { name: "8 random", input: "8\n5 2 7 1 8 3 6 4" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 300,
  legend: [["vis", VIZ.L("left half", "ครึ่งซ้าย")], ["path", VIZ.L("right half", "ครึ่งขวา")], ["cur", VIZ.L("element being appended", "ตัวที่กำลังต่อท้าย")], ["ok", VIZ.L("leftover append (counted)", "ต่อท้ายส่วนที่เหลือ (นับ)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 10, L("keep N ≤ 10", "ให้ N ≤ 10"));
    const A = []; for (let i = 0; i < n; i++) A.push(t.int());
    let count = 0;
    const view = (l, m, r, i, j, B, hl, hlc) => {
      const c = {}, p = {};
      if (l != null) { for (let x = l; x <= m; x++) c[x] = "vis"; for (let x = m + 1; x <= r; x++) c[x] = "path"; if (i <= m) p[i] = "read1"; if (j <= r) p[j] = (p[j] ? p[j] + "," : "") + "read2"; }
      if (hl != null) c[hl] = hlc;
      return [{ t: "arr", title: L("values", "values"), a: [...A], c, p },
        { t: "arr", title: L("buffer (merged run)", "buffer (ผลการรวม)"), a: l == null ? ["–"] : [...B, ...Array(r - l + 1 - B.length).fill("")], idx: l == null ? false : l, c: B && B.length ? { [B.length - 1]: hlc || "cur" } : {} },
        { t: "vars", v: [[L("leftover appends", "จำนวนการต่อท้ายส่วนที่เหลือ"), count, "ok"]] }];
    };
    const merge = (l, m, r) => {
      let i = l, j = m + 1; const B = [];
      S.frame(L(`merge [${l}..${m}] with [${m + 1}..${r}].`, `merge [${l}..${m}] กับ [${m + 1}..${r}]`), view(l, m, r, i, j, B));
      while (i <= m && j <= r) {
        if (A[i] <= A[j]) { B.push(A[i]); S.frame(L(`main loop: ${A[i]} ≤ ${A[j]} → take from the left (not counted).`, `ลูปหลัก: ${A[i]} ≤ ${A[j]} → หยิบจากซ้าย (ไม่นับ)`), view(l, m, r, i, j, B, i, "cur")); i++; }
        else { B.push(A[j]); S.frame(L(`main loop: ${A[i]} > ${A[j]} → take from the right (not counted).`, `ลูปหลัก: ${A[i]} > ${A[j]} → หยิบจากขวา (ไม่นับ)`), view(l, m, r, i, j, B, j, "cur")); j++; }
      }
      while (i <= m) { B.push(A[i]); count++; S.frame(L(`line 11: left leftover ${A[i]} appended → count ${count}.`, `บรรทัด 11: ส่วนที่เหลือทางซ้าย ${A[i]} → นับเป็น ${count}`), view(l, m, r, i, j, B, i, "ok")); i++; }
      while (j <= r) { B.push(A[j]); count++; S.frame(L(`line 14: right leftover ${A[j]} appended → count ${count}.`, `บรรทัด 14: ส่วนที่เหลือทางขวา ${A[j]} → นับเป็น ${count}`), view(l, m, r, i, j, B, j, "ok")); j++; }
      for (let x = l; x <= r; x++) A[x] = B[x - l];
    };
    const sort = (l, r) => { if (l >= r) return; const m = Math.floor((l + r) / 2); sort(l, m); sort(m + 1, r); merge(l, m, r); };
    S.frame(L("Run merge sort exactly as written; only the two leftover loops are counted.", "รัน merge sort ตามที่เขียนไว้ทุกบรรทัด นับเฉพาะสองลูปส่วนที่เหลือ"), view());
    sort(0, n - 1);
    S.frame(L(`Sorted. Lines 11 and 14 ran <b>${count}</b> times.`, `เรียงเสร็จ บรรทัด 11 และ 14 ทำงาน <b>${count}</b> ครั้ง`), view());
  }
});
