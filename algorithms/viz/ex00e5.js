VIZ.def("ex00e5", {
  title: VIZ.L("All n-bit strings, carrying (run, found)", "ทุกสตริง n บิต พร้อมส่ง (run, found) ลงไป"),
  input: "4 2",
  presets: [{ name: VIZ.L("n=3, k=2", "n=3, k=2"), input: "3 2" }, { name: VIZ.L("n=4, k=2", "n=4, k=2"), input: "4 2" }],
  limit: VIZ.L("n ≤ 4", "n ≤ 4"),
  legend: [["cur", VIZ.L("current call", "การเรียกปัจจุบัน")], ["vis", VIZ.L("found = true on this node", "found = true ที่โหนดนี้")], ["ok", VIZ.L("printed", "พิมพ์")], ["dim", VIZ.L("leaf, not printed", "ใบที่ไม่พิมพ์")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), k = t.int();
    S.check(n >= 1 && n <= 4 && k >= 0 && k <= n, L("need 1 ≤ n ≤ 4, 0 ≤ k ≤ n", "ต้องการ 1 ≤ n ≤ 4, 0 ≤ k ≤ n"));
    const T = new VIZ.Tree(), out = [];
    let prev = null;
    const view = () => [T.panel(L("recursion tree: label = bits / run / found", "ต้นไม้ recursion: ป้าย = bits / run / found"), { nw: 50, gx: 4 }), { t: "list", title: L("output (in order)", "ผลลัพธ์ (ตามลำดับ)"), a: [...out] }];
    const gen = (bits, run, found, id) => {
      if (prev !== null && T.n[prev].c === "cur") T.set(prev, found ? "vis" : "");
      T.set(id, "cur"); prev = id;
      if (bits.length === n) {
        if (found) out.push(bits);
        S.frame(found ? L(`leaf ${bits}: found = true → print.`, `ใบ ${bits}: found = true → พิมพ์`) : L(`leaf ${bits}: never had ${k} ones in a row → skip.`, `ใบ ${bits}: ไม่เคยมีเลข 1 ติดกัน ${k} ตัว → ข้าม`), view());
        T.set(id, found ? "ok" : "dim"); prev = null; return;
      }
      S.frame(L(`bits "${bits || "∅"}", currentRun = ${run}, found = ${found}.`, `bits "${bits || "∅"}", currentRun = ${run}, found = ${found}`), view());
      const z = T.add(id, `${bits}0 ${0} ${found ? "T" : "F"}`); T.edge(z, "0");
      gen(bits + "0", 0, found, z);
      const nf = found || run + 1 >= k;
      const o = T.add(id, `${bits}1 ${run + 1} ${nf ? "T" : "F"}`); T.edge(o, "1");
      if (!found && nf) { S.frame(L(`'1' makes a run of ${run + 1} = k → found becomes true for the whole subtree.`, `'1' ทำให้ได้ก้อนยาว ${run + 1} = k → found เป็นจริงทั้งกิ่งย่อย`), view()); }
      gen(bits + "1", run + 1, nf, o);
    };
    gen("", 0, k === 0, T.add(null, `∅ 0 ${k === 0 ? "T" : "F"}`));
    S.frame(L(`Done: ${out.length} strings, already in increasing order.`, `เสร็จ: ${out.length} สตริง เรียงจากน้อยไปมากอยู่แล้ว`), view());
  }
});
