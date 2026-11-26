VIZ.def("da68_f2_sackknap", {
  title: VIZ.L("0/1 knapsack, exact weight, minimum price", "0/1 knapsack น้ำหนักพอดี ราคาน้อยที่สุด"),
  input: "3 10\n5 100\n5 50\n2 20",
  presets: [{ name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3 10\n5 100\n5 50\n2 20" }, { name: VIZ.L("Impossible", "เป็นไปไม่ได้"), input: "3 7\n2 10\n4 10\n6 10" }, { name: VIZ.L("Four items", "สี่ชิ้น"), input: "4 8\n3 30\n4 20\n5 25\n1 4" }],
  limit: VIZ.L("V ≤ 14", "V ≤ 14"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("cheapest[total]", "cheapest[total]")], ["vis", VIZ.L("cheapest[total − weight] (without this item)", "cheapest[total − weight] (ยังไม่มีชิ้นนี้)")], ["ok", VIZ.L("improved", "ดีขึ้น")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), V = t.int();
    S.check(V <= 14 && n <= 8, L("keep V ≤ 14 and n ≤ 8", "ให้ V ≤ 14 และ n ≤ 8"));
    const best = Array(V + 1).fill("∞"); best[0] = 0;
    const view = (cur, from, ok, item) => { const c = {}, p = {}; if (cur != null) { c[cur] = ok ? "ok" : "cur"; c[from] = "vis"; p[from] = "+" + item; }
      return [{ t: "arr", title: L("cheapest[weight] (∞ = not reachable)", "cheapest[weight] (∞ = ไปไม่ถึง)"), a: [...best], c, p }]; };
    S.frame(L("cheapest[0] = 0 (take nothing); every other weight is unreachable so far.", "cheapest[0] = 0 (ไม่หยิบอะไร) น้ำหนักอื่นยังไปไม่ถึง"), view());
    for (let i = 0; i < n; i++) {
      const w = t.int(), p = t.int();
      S.frame(L(`item ${i}: weight ${w}, price ${p}. Walk total from ${V} DOWN to ${w}, so cheapest[total − ${w}] still means "without item ${i}".`, `ชิ้น ${i}: หนัก ${w} ราคา ${p} ไล่ total จาก ${V} ลง ไปถึง ${w} เพื่อให้ cheapest[total − ${w}] ยังหมายถึง "ไม่มีชิ้น ${i}"`), view());
      for (let s = V; s >= w; s--) {
        const wo = best[s - w]; if (wo === "∞") continue;
        const better = best[s] === "∞" || wo + p < best[s];
        const old = best[s]; if (better) best[s] = wo + p;
        S.frame(better ? L(`total ${s}: ${wo} + ${p} = ${wo + p} < ${old} → update.`, `total ${s}: ${wo} + ${p} = ${wo + p} < ${old} → อัปเดต`) : L(`total ${s}: ${wo} + ${p} = ${wo + p} ≥ ${old} → keep.`, `total ${s}: ${wo} + ${p} = ${wo + p} ≥ ${old} → คงเดิม`), view(s, s - w, better, "item " + i));
      }
    }
    S.frame(L(`Answer cheapest[${V}] = <b>${best[V] === "∞" ? -1 : best[V]}</b>.`, `คำตอบ cheapest[${V}] = <b>${best[V] === "∞" ? -1 : best[V]}</b>`), view());
  }
});
