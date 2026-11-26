VIZ.def("a60a_q3_xor_road", {
  title: VIZ.L("Maximum spanning tree with Prim: always take the MOST beautiful link", "ต้นไม้ทอดข้ามที่มากที่สุดด้วย Prim: เลือกถนนที่สวยที่สุดเสมอ"),
  input: "4\n3\n10\n9\n6",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "4\n3\n10\n9\n6" }, { name: VIZ.L("Five districts", "ห้าอำเภอ"), input: "5\n1\n2\n4\n8\n15" }],
  limit: VIZ.L("n ≤ 7", "n ≤ 7"),
  maxFrames: 40,
  legend: [["cur", VIZ.L("joins the tree now", "เข้าต้นไม้ตอนนี้")], ["ok", VIZ.L("tree road", "ถนนในต้นไม้")], ["vis", VIZ.L("current best link of an outside district", "ถนนดีที่สุดตอนนี้ของอำเภอที่อยู่นอกต้นไม้")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 7, L("keep n ≤ 7", "ให้ n ≤ 7"));
    const code = []; for (let i = 0; i < n; i++) code.push(t.int());
    const pos = n === 1 ? [{ x: 150, y: 110 }] : VIZ.circle(n, 300, 240), best = Array(n).fill(-1), from = Array(n).fill(-1), inT = Array(n).fill(false); best[0] = 0; let total = 0;
    const bits = Math.max(1, ...code.map(c => c.toString(2).length));
    const view = (cur) => { const e = []; for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) { const tree = (from[b] === a && inT[b]) || (from[a] === b && inT[a]); const link = (!inT[b] && from[b] === a) || (!inT[a] && from[a] === b); e.push({ a, b, w: code[a] ^ code[b], c: tree ? "ok" : link ? "vis" : "dim", bend: n % 2 === 0 && b - a === n / 2 ? (a % 2 ? -30 : 30) : 0 }); }
      return [{ t: "graph", title: L("districts (label = code); edge = code XOR code", "อำเภอ (ตัวเลข = รหัส); เส้น = รหัส XOR รหัส"), W: 300, H: 240, n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, l: String(code[v]), s: code[v].toString(2).padStart(bits, "0"), c: v === cur ? "cur" : inT[v] ? "ok" : "" })), e },
        { t: "arr", title: L("bestLink[v]", "bestLink[v]"), a: best.map((b, v) => inT[v] ? "✓" : b < 0 ? "–" : b), c: Object.fromEntries(inT.map((x, v) => [v, v === cur ? "cur" : x ? "ok" : ""])), idx: 0 },
        { t: "vars", v: [["total", total, "ok"]] }]; };
    S.frame(L("Same Prim as for a minimum tree, with every comparison reversed: the tree grows by the largest link. Weights are computed on the fly (x ^ y).", "Prim แบบเดียวกับต้นไม้น้อยที่สุด แต่กลับทุกการเปรียบเทียบ: ต้นไม้ขยายด้วยถนนที่มากที่สุด น้ำหนักคำนวณตอนใช้ (x ^ y)"), view(-1));
    for (let r = 0; r < n; r++) {
      let u = -1; for (let v = 0; v < n; v++) if (!inT[v] && (u < 0 || best[v] > best[u])) u = v;
      inT[u] = true; total += best[u];
      const msg = []; for (let v = 0; v < n; v++) { const b = code[u] ^ code[v]; if (!inT[v] && b > best[v]) { best[v] = b; from[v] = u; msg.push(`${code[v]}: ${b}`); } }
      S.frame(L(`take district ${code[u]}` + (r ? ` via ${code[from[u]]} XOR ${code[u]} = ${code[from[u]] ^ code[u]}` : "") + `; total = ${total}. ` + (msg.length ? `Better links: ${msg.join(", ")}.` : ""), `เลือกอำเภอ ${code[u]}` + (r ? ` ผ่าน ${code[from[u]]} XOR ${code[u]} = ${code[from[u]] ^ code[u]}` : "") + ` รวม = ${total} ` + (msg.length ? `ถนนที่ดีขึ้น: ${msg.join(", ")}` : "")), view(u));
    }
    S.frame(L(`Maximum total beauty = <b>${total}</b>.`, `ความสวยรวมมากที่สุด = <b>${total}</b>`), view(-1));
  }
});
