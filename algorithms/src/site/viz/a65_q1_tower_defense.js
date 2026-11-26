VIZ.def("a65_q1_tower_defense", {
  title: VIZ.L("Choosing a target for every tower, with a bound", "เลือกเป้าให้ป้อมทุกป้อม พร้อมขอบเขตตัดกิ่ง"),
  input: "10 3 3 2\n3 5 8\n1 2 1\n4 6 7",
  presets: [{ name: VIZ.L("Shared monsters", "มอนสเตอร์ที่ยิงร่วมกัน"), input: "10 3 3 2\n3 5 8\n1 2 1\n4 6 7" }, { name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "100 3 3 1\n80 70 60\n1 1 1\n70 71 69" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "10 1 2 1\n1\n10\n2 5" }],
  limit: VIZ.L("m ≤ 4, k ≤ 4", "m ≤ 4, k ≤ 4"),
  maxFrames: 500,
  legend: [["cur", VIZ.L("current call / tower", "การเรียก / ป้อมปัจจุบัน")], ["vis", VIZ.L("current path", "เส้นทางปัจจุบัน")], ["ok", VIZ.L("new best", "ดีที่สุดใหม่")], ["bad", VIZ.L("cut by the bound", "ถูกตัดด้วยขอบเขต")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int(), w = t.int();
    S.check(m >= 1 && m <= 4 && k >= 1 && k <= 4, L("keep m ≤ 4 and k ≤ 4", "ให้ m ≤ 4 และ k ≤ 4"));
    const at = [], power = [], tw = [];
    for (let i = 0; i < m; i++) at.push(t.int());
    for (let i = 0; i < m; i++) power.push(t.int());
    for (let i = 0; i < k; i++) tw.push(t.int());
    const total = power.reduce((a, b) => a + b, 0);
    let best = 0, curTower = -1;
    const lo = Math.max(1, Math.min(...at, ...tw.map(x => x - w)) - 1), hi = Math.min(n, Math.max(...at, ...tw.map(x => x + w)) + 1);
    const T = new VIZ.Tree(), path = [];
    const mark = id => { T.n.forEach(x => { if (x.c === "cur" || x.c === "vis") x.c = ""; }); path.forEach(p => T.set(p, "vis")); T.set(id, "cur"); };
    const view = () => [
      { t: "iv", title: L("road: tower ranges [t−w, t+w] and monsters", "ถนน: ระยะยิงของป้อม [t−w, t+w] และมอนสเตอร์"), lo, hi, full: true,
        iv: [...tw.map((x, i) => ({ s: x - w, e: x + w, l: `T${i}@${x}`, c: i === curTower ? "cur" : "", row: i })),
             ...at.map((x, j) => ({ s: x - 0.3, e: x + 0.3, l: `M${j} (${power[j]})`, c: power[j] ? "sel" : "dim", row: k + j }))] },
      T.panel(L("decision tree (edge = target of the tower, node = useful hits so far)", "ต้นไม้การตัดสินใจ (เส้น = เป้าของป้อม, โหนด = จำนวนการยิงที่มีผล)"), { nw: 40, gx: 4 }),
      { t: "arr", title: L("power[monster]", "power[monster]"), a: [...power], c: Object.fromEntries(power.map((x, j) => [j, x ? "" : "dim"])) },
      { t: "vars", v: [["tower", curTower < k && curTower >= 0 ? curTower : "–", "cur"], ["bestHits", best, "ok"], [L("answer = total − best", "คำตอบ = รวม − best"), `${total} − ${best} = ${total - best}`]] }];
    const shoot = (tower, hits, id) => {
      path.push(id); curTower = tower; mark(id);
      if (hits + (k - tower) <= best) {
        T.set(id, "bad");
        S.frame(L(`tower ${tower}: hits ${hits} + ${k - tower} remaining tower(s) ≤ best ${best} → this branch cannot win, cut.`, `ป้อม ${tower}: ยิงได้ ${hits} + เหลือ ${k - tower} ป้อม ≤ best ${best} → กิ่งนี้ชนะไม่ได้ ตัดทิ้ง`), view());
        path.pop(); return;
      }
      if (tower === k) {
        best = hits; T.set(id, "ok");
        S.frame(L(`all towers decided with ${hits} useful hits → new bestHits = ${hits}.`, `ตัดสินใจครบทุกป้อม ยิงได้ผล ${hits} ครั้ง → bestHits ใหม่ = ${hits}`), view());
        path.pop(); return;
      }
      S.frame(L(`tower ${tower} at ${tw[tower]} covers ${tw[tower] - w}..${tw[tower] + w}. Try every monster in range that still has power, then "no useful hit".`, `ป้อม ${tower} ที่ ${tw[tower]} ยิงได้ช่วง ${tw[tower] - w}..${tw[tower] + w} ลองทุกมอนสเตอร์ในระยะที่ยังมีพลัง แล้วลอง "ไม่ยิงโดนอะไรที่มีผล"`), view());
      for (let j = 0; j < m; j++) {
        if (power[j] > 0 && Math.abs(at[j] - tw[tower]) <= w) {
          power[j]--;
          const kid = T.add(id, hits + 1); T.edge(kid, "M" + j);
          shoot(tower + 1, hits + 1, kid);
          power[j]++; curTower = tower; mark(id);
        }
      }
      const kid = T.add(id, hits); T.edge(kid, "–");
      shoot(tower + 1, hits, kid);
      curTower = tower; mark(id);
      path.pop();
    };
    const root = T.add(null, 0);
    S.frame(L(`Total power ${total}. Every useful hit removes exactly 1, so minimizing the remaining power = maximizing useful hits.`, `พลังรวม ${total} การยิงที่มีผลแต่ละครั้งลดพลังได้ 1 พอดี การทำให้พลังเหลือน้อยที่สุด = ทำให้ยิงได้ผลมากที่สุด`), view());
    shoot(0, 0, root);
    curTower = -1;
    S.frame(L(`Search finished: bestHits = ${best}, answer ${total} − ${best} = <b>${total - best}</b>.`, `ค้นหาเสร็จ: bestHits = ${best} คำตอบ ${total} − ${best} = <b>${total - best}</b>`), view());
  }
});
