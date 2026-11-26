VIZ.def("69_AG1", {
  title: VIZ.L("Multiset permutations in dictionary order, keeping a bracelet only if it is ≤ its reverse", "เรียงสับเปลี่ยนแบบมีจำนวนจำกัดตามพจนานุกรม เก็บสร้อยเฉพาะที่ ≤ ตัวกลับด้าน"),
  input: "4 3\n2 0 2",
  presets: [{ name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "4 3\n2 0 2" }, { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "3 2\n2 1" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2 3\n2 2 1" }],
  limit: VIZ.L("N ≤ 4, K ≤ 4", "N ≤ 4, K ≤ 4"),
  maxFrames: 200,
  legend: [["cur", VIZ.L("current call", "การเรียกปัจจุบัน")], ["vis", VIZ.L("current prefix", "prefix ปัจจุบัน")], ["ok", VIZ.L("printed (≤ its reverse)", "พิมพ์ (≤ ตัวกลับด้าน)")], ["bad", VIZ.L("skipped: its reverse is smaller", "ข้าม: ตัวกลับด้านน้อยกว่า")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), k = t.int();
    S.check(n >= 1 && n <= 4 && k >= 1 && k <= 4, L("keep N ≤ 4 and K ≤ 4", "ให้ N ≤ 4 และ K ≤ 4"));
    const digits = []; while (digits.length < k && t.more()) { const s = t.str(); for (const ch of s) digits.push(+ch); }
    const rem = digits.slice(0, k), LET = "ABCD", bead = [], out = [], T = new VIZ.Tree(), path = [];
    const view = () => [T.panel(L("recursion tree (one level per position)", "ต้นไม้ recursion (หนึ่งชั้นต่อหนึ่งตำแหน่ง)"), { nw: 46, gx: 4 }),
      { t: "arr", title: L("remaining[bead]", "remaining[bead]"), a: rem.slice(), il: [...LET.slice(0, k)] },
      { t: "list", title: L("printed", "พิมพ์แล้ว"), a: [...out] }];
    const mark = id => { T.n.forEach(x => { if (x.c === "cur" || x.c === "vis") x.c = ""; }); path.forEach(p => T.set(p, "vis")); T.set(id, "cur"); };
    const place = (pos, id) => {
      path.push(id); mark(id);
      if (pos === n) {
        const s = bead.join(""), r = [...s].reverse().join("");
        if (s <= r) { out.push(s); T.set(id, "ok"); S.frame(L(`${s} vs reverse ${r}: ${s === r ? "a palindrome, counted once" : s + " comes first"} → print.`, `${s} เทียบตัวกลับด้าน ${r}: ${s === r ? "เป็น palindrome นับครั้งเดียว" : s + " มาก่อน"} → พิมพ์`), view()); }
        else { T.set(id, "bad"); S.frame(L(`${s} vs reverse ${r}: the reverse comes first (it was already printed) → skip.`, `${s} เทียบตัวกลับด้าน ${r}: ตัวกลับด้านมาก่อน (พิมพ์ไปแล้ว) → ข้าม`), view()); }
        path.pop(); return;
      }
      for (let b = 0; b < k; b++) {
        if (rem[b] === 0) continue;
        rem[b]--; bead.push(LET[b]);
        const kid = T.add(id, bead.join("")); mark(kid);
        S.frame(L(`position ${pos}: use a bead ${LET[b]} (${rem[b]} left).`, `ตำแหน่ง ${pos}: ใช้ลูกปัด ${LET[b]} (เหลือ ${rem[b]})`), view());
        place(pos + 1, kid);
        rem[b]++; bead.pop(); mark(id);
      }
      path.pop();
    };
    const root = T.add(null, "start");
    S.frame(L(`Try letters A, B, … in order at every position, never using more beads than there are: every arrangement appears once, in dictionary order.`, `ลองตัวอักษร A, B, … ตามลำดับที่ทุกตำแหน่ง โดยไม่ใช้ลูกปัดเกินที่มี: ทุกการเรียงปรากฏครั้งเดียว ตามลำดับพจนานุกรม`), view());
    place(0, root);
    S.frame(L(`Done: <b>${out.length}</b> bracelet(s).`, `เสร็จ: <b>${out.length}</b> แบบ`), view());
  }
});
