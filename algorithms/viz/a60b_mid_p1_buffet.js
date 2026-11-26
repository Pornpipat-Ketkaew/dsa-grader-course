VIZ.def("a60b_mid_p1_buffet", {
  title: VIZ.L("Leftmost dark food decides the next lamp", "อาหารที่มืดซ้ายสุดกำหนดตำแหน่งหลอดไฟถัดไป"),
  input: "5 1 10\n1 2 3 5 6",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5 1 10\n1 2 3 5 6" }, { name: VIZ.L("Sample 1 (w = 0)", "ตัวอย่าง 1 (w = 0)"), input: "3 0 10\n1 3 4" }, { name: VIZ.L("Spread out", "กระจาย"), input: "7 2 20\n2 3 9 10 14 18 20" }],
  limit: VIZ.L("n ≤ 30", "n ≤ 30"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("leftmost dark food", "อาหารที่มืดซ้ายสุด")], ["path", VIZ.L("lamp", "หลอดไฟ")], ["ok", VIZ.L("lit food", "อาหารที่สว่างแล้ว")], ["vis", VIZ.L("lit cell", "ช่องที่สว่าง")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), f = t.int(), w = t.int(), n = t.int();
    S.check(n <= 30, L("keep n ≤ 30", "ให้ n ≤ 30"));
    const food = []; for (let i = 0; i < f; i++) food.push(t.int()); food.sort((a, b) => a - b);
    const isFood = new Set(food), lamps = []; let lit = 0;
    const view = (cur) => {
      const c = {};
      for (let x = 1; x <= n; x++) if (x <= lit) c[x - 1] = isFood.has(x) ? "ok" : "vis";
      lamps.forEach(x => { if (x <= n) c[x - 1] = "path"; });
      if (cur != null) c[cur - 1] = "cur";
      return [{ t: "arr", title: L("table cells (🍲 = food, 💡 = lamp)", "ช่องบนโต๊ะ (🍲 = อาหาร, 💡 = หลอดไฟ)"), a: [...Array(n).keys()].map(i => (lamps.includes(i + 1) ? "💡" : "") + (isFood.has(i + 1) ? "🍲" : "")), idx: 1, c },
        { t: "vars", v: [["lamps", lamps.length, "path"], ["litUpTo", lit]] }];
    };
    S.frame(L("Sort the food cells. Scan left to right; litUpTo = 0 means nothing is lit yet.", "เรียงช่องอาหาร ไล่จากซ้ายไปขวา litUpTo = 0 แปลว่ายังไม่มีอะไรสว่าง"), view());
    for (const x of food) {
      if (x <= lit) { S.frame(L(`food at ${x} ≤ litUpTo ${lit}: already lit.`, `อาหารที่ ${x} ≤ litUpTo ${lit}: สว่างแล้ว`), view()); continue; }
      S.frame(L(`food at ${x} is dark. Some lamp must cover it, and it is the leftmost dark food, so put the lamp as far right as possible: ${x} + ${w} = ${x + w}.`, `อาหารที่ ${x} ยังมืด ต้องมีหลอดไฟครอบคลุมมัน และมันคืออาหารที่มืดซ้ายสุด จึงวางหลอดไฟไปทางขวาให้มากที่สุด: ${x} + ${w} = ${x + w}`), view(x));
      lamps.push(x + w); lit = x + 2 * w;
      S.frame(L(`lamp at ${x + w} lights ${x}..${x + 2 * w} → litUpTo = ${lit}.`, `หลอดไฟที่ ${x + w} ส่องช่อง ${x}..${x + 2 * w} → litUpTo = ${lit}`), view());
    }
    S.frame(L(`Done: <b>${lamps.length}</b> lamps.`, `เสร็จ: <b>${lamps.length}</b> ดวง`), view());
  }
});
