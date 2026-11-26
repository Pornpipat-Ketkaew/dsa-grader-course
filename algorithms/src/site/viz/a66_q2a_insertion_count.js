(function () {
  const L = VIZ.L;
  const sample = "6 2\n3 4 6 2 1 5\n6 2";
  const presets = [{ name: L("Sample 1", "ตัวอย่าง 1"), input: sample },
                   { name: L("PDF table (30..60 → 3 4 6 2 1 5)", "ตาราง PDF (30..60 → 3 4 6 2 1 5)"), input: "6 1\n3 4 6 2 1 5\n2" },
                   { name: L("Reversed", "เรียงกลับด้าน"), input: "6 1\n6 5 4 3 2 1\n1" }];
  const read = (inp, S) => {
    const t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 2 && n <= 10, L("keep 2 ≤ n ≤ 10", "ให้ 2 ≤ n ≤ 10"));
    const A = []; for (let i = 0; i < n; i++) A.push(t.int());
    const Q = []; for (let i = 0; i < m; i++) Q.push(t.int());
    S.check([...A].sort((a, b) => a - b).every((v, i) => v === i + 1), L("A must be a permutation of 1..n", "A ต้องเป็น permutation ของ 1..n"));
    return { n, A, Q };
  };
  VIZ.def("a66_q2a_insertion_count:sim", {
    title: L("The PDF's insertion sort, counting line 07 for k = first query", "insertion sort ตาม PDF นับบรรทัด 07 ของ k = คำถามแรก"),
    input: sample, presets, limit: L("n ≤ 10, values 1..n", "n ≤ 10 ค่า 1..n"),
    legend: [["sel", L("k", "k")], ["cur", L("tmp being inserted", "tmp ที่กำลังแทรก")], ["ok", L("sorted part", "ส่วนที่เรียงแล้ว")], ["vis", L("left of k originally", "เดิมอยู่ซ้ายของ k")]],
    run(inp, S) {
      const { n, A, Q } = read(inp, S), k = Q[0], p = A.indexOf(k), left = new Set(A.slice(0, p));
      const a = [...A]; let cnt = 0;
      const view = (pos, hole, extra) => {
        const c = {}; for (let j = pos + 1; j < n; j++) c[j] = "ok";
        a.forEach((v, j) => { if (v === k) c[j] = "sel"; });
        if (hole != null) c[hole] = "cur";
        return [{ t: "arr", title: L("A", "A"), a: a.map((v, j) => j === hole ? "·" : v), c, p: extra || {} },
                { t: "vars", v: [["k", k], [L("line 07 moved k", "บรรทัด 07 เลื่อน k"), cnt, "cur"], [L("larger values left of k", "ค่าที่ใหญ่กว่าทางซ้ายของ k"), A.slice(0, p).filter(x => x > k).join(", ") || "–"]] }];
      };
      S.frame(L(`k = ${k} sits at index ${p}. The sorted suffix starts as just A[${n - 1}].`, `k = ${k} อยู่ที่ index ${p} ส่วนท้ายที่เรียงแล้วเริ่มจาก A[${n - 1}] ตัวเดียว`), view(n - 1));
      for (let pos = n - 2; pos >= 0; pos--) {
        const tmp = a[pos]; let i = pos + 1;
        S.frame(L(`pos = ${pos}: tmp = ${tmp}${left.has(tmp) && tmp > k ? ` (left of k and larger: it will push k)` : ""}.`, `pos = ${pos}: tmp = ${tmp}${left.has(tmp) && tmp > k ? ` (อยู่ซ้ายของ k และใหญ่กว่า: จะผลัก k)` : ""}`), view(pos, pos, { [pos]: "tmp" }));
        while (i < n && a[i] < tmp) {
          const moved = a[i]; a[i - 1] = a[i]; if (moved === k) cnt++;
          S.frame(moved === k ? L(`line 07: A[${i - 1}] = A[${i}] moves <b>k = ${k}</b> left (count ${cnt}).`, `บรรทัด 07: A[${i - 1}] = A[${i}] เลื่อน <b>k = ${k}</b> ไปซ้าย (นับได้ ${cnt})`)
                              : L(`line 07: A[${i - 1}] = A[${i}] moves ${moved} left.`, `บรรทัด 07: A[${i - 1}] = A[${i}] เลื่อน ${moved} ไปซ้าย`), view(pos, i, { [i]: "i" }));
          i++;
        }
        a[i - 1] = tmp;
        S.frame(L(`line 10: put tmp = ${tmp} at index ${i - 1}.`, `บรรทัด 10: วาง tmp = ${tmp} ที่ index ${i - 1}`), view(pos - 1 < -1 ? -1 : pos - 1));
      }
      S.frame(L(`Sorted. Line 07 moved k = ${k} exactly <b>${cnt}</b> times = the number of larger values on its left in the original array.`,
                `เรียงเสร็จ บรรทัด 07 เลื่อน k = ${k} ทั้งหมด <b>${cnt}</b> ครั้ง = จำนวนค่าที่ใหญ่กว่าซึ่งอยู่ทางซ้ายในอาร์เรย์เดิม`), view(-1));
    }
  });
  VIZ.def("a66_q2a_insertion_count:bit", {
    title: L("One scan with a Fenwick tree over the values", "สแกนรอบเดียวด้วย Fenwick tree บนค่า"),
    input: sample, presets, limit: L("n ≤ 10, values 1..n", "n ≤ 10 ค่า 1..n"),
    legend: [["cur", L("cells read by the query", "ช่องที่การถามอ่าน")], ["ok", L("cells updated", "ช่องที่ถูกอัปเดต")]],
    run(inp, S) {
      const { n, A, Q } = read(inp, S);
      const bit = Array(n + 1).fill(0), ans = Array(n + 1).fill("·");
      const rng = v => `${v - (v & -v) + 1}..${v}`;
      const view = (i, c, note) => [
        { t: "arr", title: L("A (scan left → right)", "A (สแกนซ้าย → ขวา)"), a: A, c: Object.fromEntries(A.map((_, j) => [j, j === i ? "cur" : j < i ? "dim" : ""])) },
        { t: "table", title: L("seenCount[node] (Fenwick tree)", "seenCount[node] (Fenwick tree)"), h: Array.from({ length: n }, (_, j) => j + 1), rh: ["node covers", "count"],
          r: [Array.from({ length: n }, (_, j) => rng(j + 1)), bit.slice(1)], c: Object.fromEntries(Object.entries(c).map(([k, v]) => ["1," + (k - 1), v])) },
        { t: "arr", title: L("shiftsOf[value]", "shiftsOf[value]"), a: ans.slice(1), idx: 1 }];
      S.frame(L("All counts start at 0.", "ทุกช่องเริ่มที่ 0"), view(-1, {}));
      for (let i = 0; i < n; i++) {
        const v = A[i]; const qc = {}; let s = 0, path = [];
        for (let x = v; x > 0; x -= x & -x) { qc[x] = "cur"; s += bit[x]; path.push(x); }
        S.frame(L(`index ${i}, value ${v}: countSeenAtMost(${v}) reads nodes ${path.join(" → ")} = ${s}. Seen ${i} values so far, so ${i} − ${s} = <b>${i - s}</b> are larger.`,
                  `index ${i} ค่า ${v}: countSeenAtMost(${v}) อ่าน node ${path.join(" → ")} = ${s} เห็นมาแล้ว ${i} ค่า จึงมี ${i} − ${s} = <b>${i - s}</b> ค่าที่ใหญ่กว่า`), view(i, qc));
        ans[v] = i - s;
        const uc = {}; path = [];
        for (let x = v; x <= n; x += x & -x) { bit[x]++; uc[x] = "ok"; path.push(x); }
        S.frame(L(`shiftsOf[${v}] = ${i - s}. markSeen(${v}) adds 1 to nodes ${path.join(" → ")}.`, `shiftsOf[${v}] = ${i - s} แล้ว markSeen(${v}) บวก 1 ที่ node ${path.join(" → ")}`), view(i, uc));
      }
      S.frame(L(`Table complete. Queries ${Q.join(", ")} → ${Q.map(q => ans[q]).join(", ")}.`, `ตารางครบแล้ว คำถาม ${Q.join(", ")} → ${Q.map(q => ans[q]).join(", ")}`), view(n, {}));
    }
  });
})();
