VIZ.def("da68_f_game_of_trades", {
  title: VIZ.L("Best other buyer per unit, then the K best units", "ผู้ซื้อที่ดีที่สุดที่ไม่ใช่ผู้ขาย แล้วเลือก K หน่วยที่ดีที่สุด"),
  input: "3 2 3\n1 5\n2 1\n5 3\n2 7\n1 3\n4 2\n1 1\n2 1\n0 3",
  presets: [{ name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3 2 3\n1 5\n2 1\n5 3\n2 7\n1 3\n4 2\n1 1\n2 1\n0 3" }, { name: VIZ.L("Sample 1 with K = 10", "ตัวอย่าง 1 แต่ K = 10"), input: "3 2 10\n1 5\n2 1\n5 3\n2 7\n1 3\n4 2\n1 1\n2 1\n0 3" }],
  limit: VIZ.L("N, M ≤ 5", "N, M ≤ 5"),
  maxFrames: 80,
  legend: [["ok", VIZ.L("best buyer", "ผู้ซื้อที่ดีที่สุด")], ["vis", VIZ.L("second-best buyer", "ผู้ซื้อที่ดีอันดับสอง")], ["cur", VIZ.L("seller being priced", "ผู้ขายที่กำลังคิดกำไร")], ["sel", VIZ.L("units taken", "หน่วยที่เลือก")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), N = t.int(), M = t.int(); let K = t.int();
    S.check(N <= 5 && M <= 5, L("keep N, M ≤ 5", "ให้ N, M ≤ 5"));
    const rd = () => Array.from({ length: N }, () => Array.from({ length: M }, () => t.int()));
    const X = rd(), Y = rd(), Z = rd();
    const units = {}; let shown = -1, prof = Array(N).fill(""), seller = -1, b1 = -1, b2 = -1;
    const bucketsView = (takeFrom) => { const ks = Object.keys(units).map(Number).sort((a, b) => b - a);
      return { t: "table", title: L("units by profit (counting buckets)", "จำนวนหน่วยตามกำไร (ถังนับ)"), h: ks.length ? ks : ["–"], rh: ["units"], corner: "profit", r: [ks.length ? ks.map(k => units[k]) : ["–"]], c: Object.fromEntries(ks.map((k, i) => [`0,${i}`, takeFrom && takeFrom[k] ? "sel" : ""])) }; };
    const view = (extra, takeFrom) => {
      const p = [];
      if (shown >= 0) {
        const j = shown, c = {};
        for (let i = 0; i < N; i++) { if (i === b1) c[`1,${i}`] = "ok"; else if (i === b2) c[`1,${i}`] = "vis"; if (i === seller) { c[`0,${i}`] = "cur"; c[`3,${i}`] = "cur"; } }
        p.push({ t: "table", title: L(`item ${j}: one column per NPC`, `สินค้า ${j}: คอลัมน์ละ NPC`), h: [...Array(N).keys()].map(i => "NPC " + i), rh: ["X (we buy)", "Y (we sell)", "Z (stock)", "profit/unit"], r: [X.map(r => r[j]), Y.map(r => r[j]), Z.map(r => r[j]), prof], c });
      }
      p.push(bucketsView(takeFrom));
      p.push({ t: "vars", v: [["K left", K], ...(extra || [])] });
      return p;
    };
    S.frame(L("Every unit is independent: it is bought from one NPC and sold to the best-paying other NPC.", "ทุกหน่วยเป็นอิสระต่อกัน: ซื้อจาก NPC หนึ่งตัวแล้วขายให้ NPC ตัวอื่นที่ให้ราคาดีที่สุด"), view());
    for (let j = 0; j < M; j++) {
      shown = j; prof = Array(N).fill(""); seller = -1; b1 = -1; b2 = -1;
      for (let i = 0; i < N; i++) { if (b1 < 0 || Y[i][j] > Y[b1][j]) { b2 = b1; b1 = i; } else if (b2 < 0 || Y[i][j] > Y[b2][j]) b2 = i; }
      S.frame(L(`item ${j}: best buyer NPC ${b1} pays ${Y[b1][j]}, second best ${b2 < 0 ? "none" : "NPC " + b2 + " pays " + Y[b2][j]}.`, `สินค้า ${j}: ผู้ซื้อที่ดีที่สุด NPC ${b1} จ่าย ${Y[b1][j]} อันดับสอง ${b2 < 0 ? "ไม่มี" : "NPC " + b2 + " จ่าย " + Y[b2][j]}`), view());
      for (let i = 0; i < N; i++) {
        seller = i;
        const to = i === b1 ? (b2 < 0 ? 0 : Y[b2][j]) : Y[b1][j], p = to - X[i][j];
        prof[i] = p > 0 ? p : "✗";
        if (p > 0 && Z[i][j] > 0) units[p] = (units[p] || 0) + Z[i][j];
        S.frame(i === b1 ? L(`seller NPC ${i} is itself the best buyer, so it sells to the second best: ${to} − ${X[i][j]} = ${p}${p > 0 ? `, add ${Z[i][j]} unit(s) to bucket ${p}` : ", no profit"}.`, `ผู้ขาย NPC ${i} เป็นผู้ซื้อที่ดีที่สุดเอง จึงขายให้อันดับสอง: ${to} − ${X[i][j]} = ${p}${p > 0 ? ` เพิ่ม ${Z[i][j]} หน่วยในถัง ${p}` : " ไม่มีกำไร"}`)
          : L(`seller NPC ${i}: ${to} − ${X[i][j]} = ${p}${p > 0 ? `, add ${Z[i][j]} unit(s) to bucket ${p}` : ", no profit"}.`, `ผู้ขาย NPC ${i}: ${to} − ${X[i][j]} = ${p}${p > 0 ? ` เพิ่ม ${Z[i][j]} หน่วยในถัง ${p}` : " ไม่มีกำไร"}`), view());
      }
    }
    shown = -1; let total = 0; const taken = {};
    for (const p of Object.keys(units).map(Number).sort((a, b) => b - a)) {
      if (K <= 0) break;
      const take = Math.min(K, units[p]); total += take * p; K -= take; taken[p] = true;
      S.frame(L(`bucket ${p}: take ${take} unit(s) → +${take * p}, total ${total}.`, `ถัง ${p}: เลือก ${take} หน่วย → +${take * p} รวม ${total}`), view([["profit", total, "ok"]], taken));
    }
    S.frame(L(`Answer: <b>${total}</b>.`, `คำตอบ: <b>${total}</b>`), view([["profit", total, "ok"]], taken));
  }
});
