VIZ.def("d62_q1b_grandfather", {
  title: VIZ.L("Two hops up the family forest", "กระโดดขึ้นสองชั้นในป่าครอบครัว"),
  input: "5 4\n1 2\n1 3\n2 20\n3 30\n2 21\n1 2\n2 30\n30 20\n20 20",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "5 4\n1 2\n1 3\n2 20\n3 30\n2 21\n1 2\n2 30\n30 20\n20 20" },
            { name: VIZ.L("Siblings + strangers", "พี่น้อง + คนแปลกหน้า"), input: "6 4\n7 8\n8 9\n8 10\n7 11\n11 12\n50 51\n9 10\n9 12\n10 51\n99 98" }],
  limit: VIZ.L("N ≤ 20, M ≤ 10", "N ≤ 20, M ≤ 10"),
  legend: [["cur", VIZ.L("first person's chain", "สายของคนแรก")], ["vis", VIZ.L("second person's chain", "สายของคนที่สอง")], ["ok", VIZ.L("common grandfather", "ปู่ร่วมกัน")], ["bad", VIZ.L("missing link", "ลิงก์ที่ขาด")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp);
    const n = t.int(), m = t.int(); S.check(n <= 20 && m <= 10, L("keep N ≤ 20 and M ≤ 10", "ให้ N ≤ 20 และ M ≤ 10"));
    const father = new Map(), ids = [];
    const add = x => { if (!ids.includes(x)) ids.push(x); };
    for (let i = 0; i < n; i++) { const f = t.str(), s = t.str(); father.set(s, f); add(f); add(s); }
    const qs = []; for (let i = 0; i < m; i++) { const a = t.str(), b = t.str(); qs.push([a, b]); add(a); add(b); }
    const lay = VIZ.forest(ids, x => father.has(x) ? father.get(x) : null, 52, 62);
    const draw = (cls, ecls) => ({ t: "graph", title: L("forest (edge = child → father)", "ป่า (เส้น = ลูก → พ่อ)"), W: lay.W, H: lay.H, r: 16,
      n: ids.map(x => ({ id: x, x: lay.pos[x].x, y: lay.pos[x].y, l: x, c: cls[x] || "" })),
      e: [...father].map(([s, f]) => ({ a: s, b: f, d: true, c: ecls[s] || "" })) });
    const mapPanel = (hi) => ({ t: "table", title: L("fatherOf", "fatherOf"), h: ["child", "father"], r: [...father].map(([s, f]) => [s, f]),
      c: Object.fromEntries([...father].map(([s], i) => [i + ",1", hi && hi.includes(s) ? "cur" : ""])) });
    S.frame(L("The map after reading all relations. Every arrow points from a son to his father.", "map หลังอ่านความสัมพันธ์ครบ ลูกศรแต่ละเส้นชี้จากลูกไปหาพ่อ"), [draw({}, {}), mapPanel()]);
    const out = [];
    const gf = x => { const chain = [x]; if (!father.has(x)) return { g: null, chain }; const f = father.get(x); chain.push(f); if (!father.has(f)) return { g: null, chain }; chain.push(father.get(f)); return { g: father.get(f), chain }; };
    for (const [a, b] of qs) {
      const A = gf(a), B = gf(b), cls = {}, ec = {};
      A.chain.forEach((x, i) => { cls[x] = "cur"; if (i < A.chain.length - 1) ec[x] = "cur"; });
      B.chain.forEach((x, i) => { if (!cls[x]) cls[x] = "vis"; if (i < B.chain.length - 1) ec[x] = ec[x] || "vis"; });
      let ans, why;
      if (a === b) { ans = "NO"; why = L(`${a} and ${b} are the same person → NO.`, `${a} กับ ${b} เป็นคนเดียวกัน → NO`); }
      else if (A.g === null) { ans = "NO"; cls[A.chain[A.chain.length - 1]] = "bad"; why = L(`grandfather of ${a}: the chain stops at ${A.chain[A.chain.length - 1]} (no father stored) → unknown → NO.`, `ปู่ของ ${a}: สายหยุดที่ ${A.chain[A.chain.length - 1]} (ไม่มีข้อมูลพ่อ) → ไม่รู้จัก → NO`); }
      else if (B.g === null) { ans = "NO"; cls[B.chain[B.chain.length - 1]] = "bad"; why = L(`grandfather of ${a} is ${A.g}, but the chain of ${b} stops at ${B.chain[B.chain.length - 1]} → NO.`, `ปู่ของ ${a} คือ ${A.g} แต่สายของ ${b} หยุดที่ ${B.chain[B.chain.length - 1]} → NO`); }
      else if (A.g === B.g) { ans = "YES"; cls[A.g] = "ok"; why = L(`${a} → ${A.chain[1]} → <b>${A.g}</b> and ${b} → ${B.chain[1]} → <b>${B.g}</b>. Same grandfather, different people → YES.`, `${a} → ${A.chain[1]} → <b>${A.g}</b> และ ${b} → ${B.chain[1]} → <b>${B.g}</b> ปู่คนเดียวกันและเป็นคนละคน → YES`); }
      else { ans = "NO"; why = L(`grandfathers are ${A.g} and ${B.g}: different → NO.`, `ปู่คือ ${A.g} กับ ${B.g} ต่างกัน → NO`); }
      out.push(`${a} ${b} → ${ans}`);
      S.frame({ en: `query (${a}, ${b}): ` + why.en, th: `คำถาม (${a}, ${b}): ` + why.th },
        [draw(cls, ec), { t: "list", title: L("answers", "คำตอบ"), a: [...out], c: { [out.length - 1]: ans === "YES" ? "ok" : "bad" } }]);
    }
  }
});
