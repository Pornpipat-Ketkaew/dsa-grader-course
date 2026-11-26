VIZ.def("a62_q1b_virus", {
  title: VIZ.L("Checking halves with two mutually recursive tests", "ตรวจทีละครึ่งด้วยฟังก์ชันสองตัวที่เรียกกันไปมา"),
  input: "1 3\n1 0 1 0 1 0 0 1",
  presets: [{ name: "10101001", input: "1 3\n1 0 1 0 1 0 0 1" }, { name: "10111000 (no)", input: "1 3\n1 0 1 1 1 0 0 0" }, { name: "0101011001010101", input: "1 4\n0 1 0 1 0 1 1 0 0 1 0 1 0 1 0 1" }],
  limit: VIZ.L("one code, k ≤ 4", "รหัสเดียว k ≤ 4"),
  maxFrames: 300,
  legend: [["cur", VIZ.L("range of the current call", "ช่วงของการเรียกปัจจุบัน")], ["ok", VIZ.L("true", "จริง")], ["bad", VIZ.L("false", "เท็จ")], ["dim", VIZ.L("skipped by short-circuit", "ข้ามเพราะ short-circuit")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp); t.int(); const k = t.int();
    S.check(k >= 1 && k <= 4, L("keep k ≤ 4", "ให้ k ≤ 4"));
    const n = 1 << k, code = []; for (let i = 0; i < n; i++) code.push(t.int());
    const T = new VIZ.Tree();
    let range = null;
    const view = () => [{ t: "arr", title: "code", a: code, c: range ? Object.fromEntries([...Array(range[1] - range[0]).keys()].map(i => [range[0] + i, "cur"])) : {} },
      T.panel(L("calls: V = isVirus, R = isReversedVirus (on index ranges)", "การเรียก: V = isVirus, R = isReversedVirus (บนช่วงดัชนี)"), { nw: 64, gx: 4 })];
    const call = (kind, l, r, parent) => {
      const id = T.add(parent, `${kind} ${l}..${r - 1}`, "cur"); range = [l, r];
      if (r - l === 2) {
        const ok = kind === "V" ? code[l] === 0 && code[l + 1] === 1 : code[l] === 1 && code[l + 1] === 0;
        T.set(id, ok ? "ok" : "bad"); T.lab(id, `${kind} ${l}..${r - 1} ${ok ? "✓" : "✗"}`);
        S.frame(L(`${kind === "V" ? "isVirus" : "isReversedVirus"}(${l}..${r - 1}): length 2, must be ${kind === "V" ? "0 1" : "1 0"}; it is ${code[l]} ${code[l + 1]} → ${ok}.`, `${kind === "V" ? "isVirus" : "isReversedVirus"}(${l}..${r - 1}): ยาว 2 ต้องเป็น ${kind === "V" ? "0 1" : "1 0"} ได้ ${code[l]} ${code[l + 1]} → ${ok}`), view());
        return ok;
      }
      const m = (l + r) / 2;
      S.frame(kind === "V" ? L(`isVirus(${l}..${r - 1}) = isVirus(right ${m}..${r - 1}) AND (isVirus(left) OR isReversedVirus(left)).`, `isVirus(${l}..${r - 1}) = isVirus(ขวา ${m}..${r - 1}) AND (isVirus(ซ้าย) OR isReversedVirus(ซ้าย))`)
        : L(`isReversedVirus(${l}..${r - 1}) = isReversedVirus(left ${l}..${m - 1}) AND (isVirus(right) OR isReversedVirus(right)).`, `isReversedVirus(${l}..${r - 1}) = isReversedVirus(ซ้าย ${l}..${m - 1}) AND (isVirus(ขวา) OR isReversedVirus(ขวา))`), view());
      let ok;
      const [fl, fr, a1, a2] = kind === "V" ? [m, r, l, m] : [l, m, m, r];
      const first = call(kind, fl, fr, id);
      if (!first) { ok = false; const s = T.add(id, L("skip", "ข้าม"), "dim"); }
      else { ok = call("V", a1, a2, id); if (!ok) ok = call("R", a1, a2, id); else T.add(id, L("R: skip", "R: ข้าม"), "dim"); }
      T.set(id, ok ? "ok" : "bad"); T.lab(id, `${kind} ${l}..${r - 1} ${ok ? "✓" : "✗"}`); range = [l, r];
      S.frame(L(`${kind === "V" ? "isVirus" : "isReversedVirus"}(${l}..${r - 1}) → ${ok}.`, `${kind === "V" ? "isVirus" : "isReversedVirus"}(${l}..${r - 1}) → ${ok}`), view());
      return ok;
    };
    const ans = call("V", 0, n, null);
    range = null;
    S.frame(L(`Answer: <b>${ans ? "yes" : "no"}</b>.`, `คำตอบ: <b>${ans ? "yes" : "no"}</b>`), view());
  }
});
