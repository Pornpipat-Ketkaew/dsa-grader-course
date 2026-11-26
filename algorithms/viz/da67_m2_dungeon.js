VIZ.def("da67_m2_dungeon", {
  title: VIZ.L("Always explore the cheapest dungeon of the needed type", "สำรวจดันเจียนที่ถูกที่สุดของชนิดที่ต้องการเสมอ"),
  input: "3 5 100 10\n1 0\n4 9\n13 5\n40 0\n2 1\n3 0 9 5\n1 0\n1 1",
  presets: [{ name: VIZ.L("Three bosses", "จอมมารสามตน"), input: "3 5 100 10\n1 0\n4 9\n13 5\n40 0\n2 1\n3 0 9 5\n1 0\n1 1" }, { name: VIZ.L("Runs out of power", "พลังหมด"), input: "3 5 100 10\n1 0\n4 9\n13 5\n95 0\n2 1\n3 0 9 5\n1 0\n1 1" }, { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "1 1 10 2\n1 1\n1 0" }],
  limit: VIZ.L("Z ≤ 10, D ≤ 12", "Z ≤ 10, D ≤ 12"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("dungeon explored now", "ดันเจียนที่สำรวจตอนนี้")], ["dim", VIZ.L("already explored", "สำรวจแล้ว")], ["bad", VIZ.L("failure", "ล้มเหลว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), N = t.int(), D = t.int(); let P = t.int(); const Z = t.int();
    S.check(Z <= 10 && D <= 12, L("keep Z ≤ 10 and D ≤ 12", "ให้ Z ≤ 10 และ D ≤ 12"));
    const cost = Array.from({ length: Z }, () => []);
    for (let i = 0; i < D; i++) { const c = t.int(), z = t.int(); cost[z].push(c); }
    cost.forEach(a => a.sort((x, y) => x - y));
    const next = Array(Z).fill(0), bosses = [];
    for (let b = 0; b < N; b++) { const q = t.int(), s = []; for (let j = 0; j < q; j++) s.push(t.int()); bosses.push(s); }
    let defeated = 0;
    const view = (hz, hi, bad, boss) => {
      const width = Math.max(1, ...cost.map(a => a.length)), c = {};
      cost.forEach((a, z) => a.forEach((_, i) => { if (i < next[z]) c[`${z},${i}`] = "dim"; }));
      if (hz != null) c[`${hz},${hi}`] = bad ? "bad" : "cur";
      const rows = [...Array(Z).keys()].filter(z => cost[z].length || bosses.some(b => b.includes(z)));
      const cc = {}; rows.forEach((z, r) => { for (let i = 0; i <= width; i++) if (c[`${z},${i}`]) cc[`${r},${i}`] = c[`${z},${i}`]; });
      return [{ t: "table", title: L("dungeon costs per item type, sorted (pointer = next unused)", "ค่าความเหนื่อยของดันเจียนแต่ละชนิด เรียงแล้ว (ตัวชี้ = ตัวถัดไปที่ยังไม่ใช้)"), h: [...Array(width).keys()], rh: rows.map(z => "type " + z), corner: "",
          r: rows.map(z => [...Array(width).keys()].map(i => i < cost[z].length ? cost[z][i] + (i === next[z] ? " ◂" : "") : (i === cost[z].length && next[z] === cost[z].length ? "∅ ◂" : ""))), c: cc },
        { t: "list", title: L("bosses (needed item types)", "จอมมาร (ชนิดไอเท็มที่ต้องใช้)"), a: bosses.map((s, b) => `#${b}: ${s.join(", ") || "–"}`), c: Object.fromEntries(bosses.map((_, b) => [b, b < defeated ? "ok" : b === boss ? (bad ? "bad" : "cur") : ""])) },
        { t: "vars", v: [["power", P, P < 0 ? "bad" : "cur"], ["defeated", defeated, "ok"]] }];
    };
    S.frame(L("Group dungeons by item type and sort each group. Items vanish after one boss, so every needed item costs one new dungeon.", "จัดกลุ่มดันเจียนตามชนิดไอเท็มแล้วเรียงแต่ละกลุ่ม ไอเท็มสลายหลังใช้กับจอมมารหนึ่งตน ไอเท็มที่ต้องใช้แต่ละชิ้นจึงต้องสำรวจดันเจียนใหม่หนึ่งแห่ง"), view());
    outer: for (let b = 0; b < N; b++) {
      for (const z of bosses[b]) {
        if (next[z] === cost[z].length) { S.frame(L(`boss #${b} needs type ${z}, but no unexplored dungeon of that type is left → stop.`, `จอมมาร #${b} ต้องใช้ชนิด ${z} แต่ไม่เหลือดันเจียนชนิดนี้ → หยุด`), view(z, next[z], true, b)); break outer; }
        const c = cost[z][next[z]]; P -= c;
        S.frame(L(`boss #${b} needs type ${z}: explore the cheapest unused one, cost ${c} → power ${P}.`, `จอมมาร #${b} ต้องใช้ชนิด ${z}: สำรวจอันที่ถูกที่สุดที่ยังไม่ใช้ ค่า ${c} → พลัง ${P}`), view(z, next[z], P < 0, b));
        next[z]++;
        if (P < 0) { S.frame(L(`power below 0 → boss #${b} cannot be defeated; stop.`, `พลังต่ำกว่า 0 → ปราบจอมมาร #${b} ไม่ได้ หยุด`), view(null, null, true, b)); break outer; }
      }
      defeated++;
      S.frame(L(`boss #${b} defeated.`, `ปราบจอมมาร #${b} ได้`), view());
    }
    S.frame(L(`Answer: <b>${defeated}</b>.`, `คำตอบ: <b>${defeated}</b>`), view());
  }
});
