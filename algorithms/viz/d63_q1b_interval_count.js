VIZ.def("d63_q1b_interval_count", {
  title: VIZ.L("Count in a range = upper_bound − lower_bound on the sorted values", "นับในช่วง = upper_bound − lower_bound บนค่าที่เรียงแล้ว"),
  input: "5 5 1\n1 3 5 9 10\n1 2 3 7 20",
  presets: [{ name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "5 5 1\n1 3 5 9 10\n1 2 3 7 20" },
            { name: VIZ.L("Sample 3 (unsorted input)", "ตัวอย่าง 3 (ข้อมูลไม่เรียง)"), input: "3 5 0\n4 8 2\n1 2 3 4 5" }],
  limit: VIZ.L("n ≤ 16, m ≤ 8", "n ≤ 16, m ≤ 8"),
  maxFrames: 60,
  legend: [["ok", VIZ.L("inside [p − k, p + k]", "อยู่ใน [p − k, p + k]")], ["cur", VIZ.L("first = lower_bound(p − k)", "first = lower_bound(p − k)")], ["bad", VIZ.L("pastLast = upper_bound(p + k)", "pastLast = upper_bound(p + k)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int();
    S.check(n >= 1 && n <= 16 && m >= 1 && m <= 8, L("keep n ≤ 16 and m ≤ 8", "ให้ n ≤ 16 และ m ≤ 8"));
    const raw = []; for (let i = 0; i < n; i++) raw.push(t.int());
    const A = raw.slice().sort((x, y) => x - y), out = [];
    const view = (first, past) => { const c = {}, p = {};
      if (first != null) { for (let i = first; i < past; i++) c[i] = "ok"; if (first < n) c[first] = first < past ? "ok" : "cur"; p[first] = "first"; p[past] = (p[past] ? p[past] + "," : "") + "pastLast"; if (past < n && past !== first) c[past] = "bad"; }
      return [{ t: "arr", title: L("values, sorted", "ค่า เรียงแล้ว"), a: [...A, "end"], c: Object.assign({ [n]: "dim" }, c), p },
        { t: "list", title: L("answers", "คำตอบ"), a: [...out], row: true }]; };
    S.frame(L(`Sort once: ${raw.join(" ")} → ${A.join(" ")}. In sorted order the values of any range [lo, hi] sit next to each other.`, `เรียงครั้งเดียว: ${raw.join(" ")} → ${A.join(" ")} เมื่อเรียงแล้ว ค่าในช่วง [lo, hi] ใด ๆ จะอยู่ติดกันเป็นก้อนเดียว`), view());
    for (let q = 0; q < m; q++) {
      const p = t.int(), lo = p - k, hi = p + k;
      let first = 0; while (first < n && A[first] < lo) first++;
      let past = 0; while (past < n && A[past] <= hi) past++;
      out.push(String(past - first));
      S.frame(L(`p = ${p}: range [${lo}, ${hi}]. first = first value ≥ ${lo} (index ${first}); pastLast = first value > ${hi} (index ${past}). Count = ${past} − ${first} = <b>${past - first}</b>.`, `p = ${p}: ช่วง [${lo}, ${hi}] first = ค่าแรกที่ ≥ ${lo} (ดัชนี ${first}); pastLast = ค่าแรกที่ > ${hi} (ดัชนี ${past}) จำนวน = ${past} − ${first} = <b>${past - first}</b>`), view(first, past));
    }
  }
});
