(function () {
  const L = VIZ.L, K = 4, ID = "da68_f_abcd_permutation";
  VIZ.def(ID, {
    title: L("Choose → explore → un-choose, with remaining[]", "เลือก → สำรวจ → ยกเลิก พร้อม remaining[]"),
    input: "2 2 2 1 0",
    presets: [{ name: L("Sample 1", "ตัวอย่าง 1"), input: "2 2 2 1 0" }, { name: L("N=3, 1 of each", "N=3 อย่างละ 1"), input: "3 1 1 1 1" }],
    limit: L("N ≤ 4", "N ≤ 4"),
    legend: [["cur", L("current call", "การเรียกปัจจุบัน")], ["vis", L("current path", "เส้นทางปัจจุบัน")], ["ok", L("finished string", "สตริงที่เสร็จ")], ["bad", L("letter used up", "ตัวอักษรหมดแล้ว")]],
    run(inp, S) {
      const t = S.tokens(inp), N = t.int(), rem = []; for (let c = 0; c < K; c++) rem.push(t.int());
      S.check(N >= 1 && N <= 4, L("keep N ≤ 4", "ให้ N ≤ 4"));
      const T = new VIZ.Tree(), out = [], path = [], word = Array(N).fill("·");
      const letters = "ABCD".slice(0, K).split("");
      const view = () => [T.panel(L("recursion tree", "ต้นไม้ recursion"), { nw: 40, gx: 4 }),
        { t: "table", title: L("remaining[]", "remaining[]"), h: letters, r: [rem.slice()], c: Object.fromEntries(rem.map((v, i) => ["0," + i, v === 0 ? "bad" : ""])) },
        { t: "arr", title: L("word", "word"), a: word }, { t: "vars", v: [["P", out.length, "ok"]] }];
      const mark = id => { T.n.forEach(x => { if (x.c === "cur" || x.c === "vis") x.c = ""; }); path.forEach(p => T.set(p, "vis")); T.set(id, "cur"); };
      const gen = (pos, id, label) => {
        path.push(id); mark(id);
        if (pos === N) { out.push(word.join("")); T.set(id, "ok");
          S.frame(L(`position = N: "${word.join("")}" is complete → string #${out.length}.`, `position = N: "${word.join("")}" ครบแล้ว → สตริงที่ ${out.length}`), view()); path.pop(); return; }
        S.frame(L(`position ${pos}: try ${letters.join(", ")} in order.`, `position ${pos}: ลอง ${letters.join(", ")} ตามลำดับ`), view());
        for (let c = 0; c < K; c++) {
          if (rem[c] === 0) { const x = T.add(id, letters[c] + "✕", "bad"); S.frame(L(`${letters[c]}: remaining = 0 → skip.`, `${letters[c]}: เหลือ 0 → ข้าม`), view()); T.n.pop(); continue; }
          rem[c]--; word[pos] = letters[c];
          const kid = T.add(id, word.slice(0, pos + 1).join(""));
          S.frame(L(`choose ${letters[c]}: remaining[${letters[c]}]-- → ${rem[c]}.`, `เลือก ${letters[c]}: remaining[${letters[c]}]-- → ${rem[c]}`), view());
          gen(pos + 1, kid);
          rem[c]++; word[pos] = "·"; mark(id);
          S.frame(L(`back at position ${pos}: un-choose ${letters[c]}, remaining[${letters[c]}]++ → ${rem[c]}.`, `กลับมาที่ position ${pos}: ยกเลิก ${letters[c]} remaining[${letters[c]}]++ → ${rem[c]}`), view());
        }
        path.pop();
      };
      gen(0, T.add(null, "start"));
      S.frame(L(`Done. Print P = ${out.length}, then the buffered lines: ${out.join(" ")}`, `เสร็จ พิมพ์ P = ${out.length} แล้วตามด้วยบรรทัดที่เก็บไว้: ${out.join(" ")}`), view());
    }
  });
})();
