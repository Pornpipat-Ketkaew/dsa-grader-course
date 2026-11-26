VIZ.def("ex00e4", {
  title: VIZ.L("The pruned decision tree", "ต้นไม้การตัดสินใจที่ตัดกิ่งแล้ว"),
  input: "2 4",
  presets: [{ name: VIZ.L("A=2, B=4", "A=2, B=4"), input: "2 4" }, { name: VIZ.L("A=1, B=3", "A=1, B=3"), input: "1 3" }, { name: VIZ.L("A=2, B=5", "A=2, B=5"), input: "2 5" }],
  limit: VIZ.L("B ≤ 5", "B ≤ 5"),
  legend: [["cur", VIZ.L("current call", "การเรียกปัจจุบัน")], ["vis", VIZ.L("on the current path", "อยู่บนเส้นทางปัจจุบัน")], ["ok", VIZ.L("finished barcode", "บาร์โค้ดที่เสร็จ")], ["bad", VIZ.L("choice refused by the rule", "ตัวเลือกที่กฎไม่อนุญาต")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), A = t.int(), B = t.int();
    S.check(A >= 0 && A <= B && B <= 5, L("need 0 ≤ A ≤ B ≤ 5", "ต้องการ 0 ≤ A ≤ B ≤ 5"));
    const T = new VIZ.Tree(), code = Array(B).fill("·"), out = [], path = [];
    const view = () => [T.panel(L("recursion tree (edge = character chosen)", "ต้นไม้ recursion (เส้น = ตัวอักษรที่เลือก)"), { nw: 52 }),
      { t: "arr", title: L("barcode", "barcode"), a: code }, { t: "list", title: L("output", "ผลลัพธ์"), a: [...out] }];
    const mark = (id) => { T.n.forEach(x => { if (x.c === "cur") x.c = path.includes(x.id) ? "vis" : ""; }); path.forEach(p => { if (T.n[p].c !== "ok") T.n[p].c = "vis"; }); T.set(id, "cur"); };
    const gen = (pos, ones, id) => {
      path.push(id); mark(id);
      const left = B - pos, need = A - ones;
      if (pos === B) { out.push(code.join("")); T.set(id, "ok"); T.lab(id, code.join(""));
        S.frame(L(`position = ${B}: the barcode ${code.join("")} is complete (it has exactly ${A} ones, guaranteed by the rule).`, `position = ${B}: บาร์โค้ด ${code.join("")} ครบแล้ว (มีเลข 1 พอดี ${A} ตัว ตามกฎรับประกัน)`), view()); path.pop(); return; }
      S.frame(L(`position ${pos}, onesUsed ${ones}: placesLeft = ${left}, onesLeft = ${need}.`, `position ${pos}, onesUsed ${ones}: placesLeft = ${left}, onesLeft = ${need}`), view());
      for (const ch of ["0", "1"]) {
        const ok = ch === "0" ? need <= left - 1 : need > 0;
        const kid = T.add(id, "", ok ? "" : "bad"); T.edge(kid, ch, ok ? "" : "bad");
        if (!ok) { T.lab(kid, "✕");
          S.frame(ch === "0" ? L(`'0' refused: ${need} ones would have to fit in ${left - 1} cells.`, `ไม่ให้ '0': เลข 1 อีก ${need} ตัวต้องลงใน ${left - 1} ช่อง ซึ่งไม่พอ`)
                             : L(`'1' refused: all ${A} ones are already used.`, `ไม่ให้ '1': ใช้เลข 1 ครบ ${A} ตัวแล้ว`), view()); continue; }
        code[pos] = ch; T.lab(kid, code.slice(0, pos + 1).join(""));
        gen(pos + 1, ones + (ch === "1" ? 1 : 0), kid);
        code[pos] = "·"; mark(id);
      }
      path.pop();
    };
    const root = T.add(null, "start");
    gen(0, 0, root);
    S.frame(L(`Done: ${out.length} barcodes = C(${B}, ${A}). No branch ever reached a dead end.`, `เสร็จ: ${out.length} บาร์โค้ด = C(${B}, ${A}) ไม่มีกิ่งไหนไปถึงทางตันเลย`), view());
  }
});
