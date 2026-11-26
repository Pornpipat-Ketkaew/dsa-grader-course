VIZ.def("a66_q1a_day_cover", {
  title: VIZ.L("Invite or skip each student, with a bound", "เชิญหรือข้ามนิสิตทีละคน พร้อมขอบเขตตัดกิ่ง"),
  input: "5 4\n3 1 3 5\n3 1 2 3\n2 2 5\n2 3 4",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5 4\n3 1 3 5\n3 1 2 3\n2 2 5\n2 3 4" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2 3\n1 1\n1 2\n2 1 2" }],
  limit: VIZ.L("n ≤ 12, m ≤ 5", "n ≤ 12, m ≤ 5"),
  maxFrames: 300,
  legend: [["cur", VIZ.L("current decision", "การตัดสินใจปัจจุบัน")], ["vis", VIZ.L("invited / covered", "ถูกเชิญ / ครอบคลุมแล้ว")], ["ok", VIZ.L("new best", "ดีที่สุดใหม่")], ["bad", VIZ.L("cut", "ถูกตัด")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n <= 12 && m <= 5, L("keep n ≤ 12 and m ≤ 5", "ให้ n ≤ 12 และ m ≤ 5"));
    const free = [];
    for (let s = 0; s < m; s++) { const k = t.int(), row = Array(n).fill(false); for (let i = 0; i < k; i++) row[t.int() - 1] = true; free.push(row); }
    let best = m + 1; const inv = Array(m).fill(false), T = new VIZ.Tree(), path = [];
    const mark = id => { T.n.forEach(x => { if (x.c === "cur" || x.c === "vis") x.c = ""; }); path.forEach(p => T.set(p, "vis")); T.set(id, "cur"); };
    const view = (cur, cov) => {
      const g = free.map(r => r.map(x => x ? "■" : "")), c = {};
      for (let s = 0; s < m; s++) for (let d = 0; d < n; d++) if (free[s][d]) c[s + "," + d] = s === cur ? "cur" : inv[s] ? "vis" : "";
      return [{ t: "grid", title: L("free days (row = student, column = day)", "วันว่าง (แถว = นิสิต, คอลัมน์ = วัน)"), g, c, rl: free.map((_, s) => (inv[s] ? "✓ " : "") + "s" + s), cl: free[0].map((_, d) => d + 1) },
        { t: "arr", title: L("covered", "ครอบคลุมแล้ว"), a: cov.map(x => x ? "■" : "·"), idx: 1, c: Object.fromEntries(cov.map((x, d) => [d, x ? "vis" : ""])) },
        T.panel(L("decision tree (edge +s / −s = invite / skip, node = invited)", "ต้นไม้การตัดสินใจ (เส้น +s / −s = เชิญ / ข้าม, โหนด = จำนวนที่เชิญ)"), { nw: 34, gx: 4 }),
        { t: "vars", v: [["bestCount", best > m ? "∞" : best, "ok"]] }];
    };
    const choose = (s, invited, cov, id) => {
      path.push(id); mark(id);
      if (invited >= best) { T.set(id, "bad"); S.frame(L(`invited ${invited} ≥ best ${best}: this branch cannot be better → cut.`, `เชิญแล้ว ${invited} ≥ best ${best}: กิ่งนี้ดีกว่าไม่ได้ → ตัด`), view(-1, cov)); path.pop(); return; }
      if (cov.every(x => x)) { best = invited; T.set(id, "ok"); S.frame(L(`every day covered with ${invited} student(s) → bestCount = ${invited}. Inviting more can only be worse: return.`, `ครอบคลุมทุกวันด้วย ${invited} คน → bestCount = ${invited} เชิญเพิ่มมีแต่แย่ลง: return`), view(-1, cov)); path.pop(); return; }
      if (s === m) { T.set(id, "bad"); S.frame(L("no students left but some day is still empty → dead end.", "ไม่เหลือนิสิตแล้วแต่ยังมีวันว่าง → ทางตัน"), view(-1, cov)); path.pop(); return; }
      inv[s] = true;
      const a = T.add(id, invited + 1); T.edge(a, "+s" + s);
      const cov2 = cov.map((x, d) => x || free[s][d]);
      S.frame(L(`student ${s}: invite (covered |= free days of s${s}).`, `นิสิต ${s}: เชิญ (covered |= วันว่างของ s${s})`), view(s, cov2));
      choose(s + 1, invited + 1, cov2, a);
      inv[s] = false; mark(id);
      const b = T.add(id, invited); T.edge(b, "−s" + s);
      S.frame(L(`student ${s}: skip (covered unchanged).`, `นิสิต ${s}: ข้าม (covered ไม่เปลี่ยน)`), view(s, cov));
      choose(s + 1, invited, cov, b);
      mark(id); path.pop();
    };
    const root = T.add(null, 0), empty = Array(n).fill(false);
    S.frame(L("Students are decided in input order: invite first, then skip. bestCount starts above any real answer.", "ตัดสินใจนิสิตตามลำดับอินพุต: ลองเชิญก่อน แล้วค่อยข้าม bestCount เริ่มที่ค่ามากกว่าคำตอบจริงทุกค่า"), view(-1, empty));
    choose(0, 0, empty, root);
    S.frame(L(`Search finished: answer <b>${best}</b>.`, `ค้นหาเสร็จ: คำตอบ <b>${best}</b>`), view(-1, empty));
  }
});
