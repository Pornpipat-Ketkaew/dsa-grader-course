VIZ.def("da68_m_count_value", {
  title: VIZ.L("Copy the mapped values, sort them, count each range with two bounds", "คัดลอกค่าใน map ออกมา เรียง แล้วนับแต่ละช่วงด้วยขอบสองข้าง"),
  input: "5 3\n10 5\n2 6\n9 9\n-1 0\n4 2\n-10 10\n0 5\n1 10",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "5 3\n10 5\n2 6\n9 9\n-1 0\n4 2\n-10 10\n0 5\n1 10" }],
  limit: VIZ.L("N ≤ 14, M ≤ 8", "N ≤ 14, M ≤ 8"),
  maxFrames: 40,
  legend: [["ok", VIZ.L("value inside [A, B]", "ค่าอยู่ใน [A, B]")], ["cur", VIZ.L("first = lower_bound(A)", "first = lower_bound(A)")], ["bad", VIZ.L("pastLast = upper_bound(B)", "pastLast = upper_bound(B)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 1 && n <= 14 && m >= 1 && m <= 8, L("keep N ≤ 14 and M ≤ 8", "ให้ N ≤ 14 และ M ≤ 8"));
    const M = new Map(); for (let i = 0; i < n; i++) { const k = t.int(), v = t.int(); M.set(k, v); }
    const keys = [...M.keys()].sort((a, b) => a - b), V = keys.map(k => M.get(k)).sort((a, b) => a - b), N = V.length, out = [];
    const mapPanel = { t: "table", title: L("the map (sorted by key, not by value)", "map (เรียงตาม key ไม่ใช่ value)"), h: keys, rh: ["value"], corner: "key", r: [keys.map(k => M.get(k))] };
    const view = (first, past) => { const c = { [N]: "dim" }, p = {};
      if (first != null) { for (let i = first; i < past; i++) c[i] = "ok"; p[first] = "first"; p[past] = (p[past] ? p[past] + "," : "") + "pastLast"; if (past < N && past !== first) c[past] = "bad"; if (first === past && first < N) c[first] = "cur"; }
      return [mapPanel, { t: "arr", title: L("values, sorted", "ค่า เรียงแล้ว"), a: [...V, "end"], c, p }, { t: "list", title: L("result", "ผลลัพธ์"), a: [...out], row: true }]; };
    S.frame(L(`The map is ordered by key, so its values are in no useful order. Copy the ${N} values out and sort them: ${V.join(" ")}.`, `map เรียงตาม key ค่าของมันจึงไม่ได้เรียงแบบที่ใช้ได้ คัดลอกค่า ${N} ตัวออกมาแล้วเรียง: ${V.join(" ")}`), view());
    for (let q = 0; q < m; q++) {
      const a = t.int(), b = t.int();
      let first = 0; while (first < N && V[first] < a) first++;
      let past = 0; while (past < N && V[past] <= b) past++;
      const cnt = Math.max(0, past - first); out.push(String(cnt));
      S.frame(L(`[${a}, ${b}]: first value ≥ ${a} at ${first}, first value > ${b} at ${past}. Count = ${past} − ${first} = <b>${cnt}</b>.`, `[${a}, ${b}]: ค่าแรกที่ ≥ ${a} อยู่ที่ ${first} ค่าแรกที่ > ${b} อยู่ที่ ${past} จำนวน = ${past} − ${first} = <b>${cnt}</b>`), view(first, past));
    }
  }
});
