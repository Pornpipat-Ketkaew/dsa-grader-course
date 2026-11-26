VIZ.def("a63_q1b_virus2", {
  title: VIZ.L("Return the count of 1s, so the parent can check the rule", "คืนจำนวนเลข 1 ให้ตัวแม่ใช้ตรวจกฎ"),
  input: "1 3\n0 1 0 1 0 1 1 1",
  presets: [{ name: "01010111 (yes)", input: "1 3\n0 1 0 1 0 1 1 1" }, { name: "00111000 (no)", input: "1 3\n0 0 1 1 1 0 0 0" }, { name: VIZ.L("Sample 3, code 2", "ตัวอย่าง 3 รหัสที่ 2"), input: "1 4\n1 1 1 1 1 1 1 0 0 1 1 1 1 1 0 1" }],
  limit: VIZ.L("one code, k ≤ 4", "รหัสเดียว k ≤ 4"),
  maxFrames: 200,
  legend: [["cur", VIZ.L("range of the current call", "ช่วงของการเรียกปัจจุบัน")], ["ok", VIZ.L("valid (count of 1s shown)", "ถูกต้อง (แสดงจำนวนเลข 1)")], ["bad", VIZ.L("INVALID", "INVALID")], ["dim", VIZ.L("never called", "ไม่ถูกเรียก")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp); t.int(); const k = t.int();
    S.check(k >= 1 && k <= 4, L("keep k ≤ 4", "ให้ k ≤ 4"));
    const n = 1 << k, code = []; for (let i = 0; i < n; i++) code.push(t.int());
    const T = new VIZ.Tree(); let range = null;
    const view = () => [{ t: "arr", title: "code", a: code, c: range ? Object.fromEntries([...Array(range[1] - range[0]).keys()].map(i => [range[0] + i, "cur"])) : {} },
      T.panel(L("calls onesIfVirus(range) → count or ✗", "การเรียก onesIfVirus(ช่วง) → จำนวน หรือ ✗"), { nw: 58, gx: 4 })];
    const go = (l, r, p) => {
      const id = T.add(p, `${l}..${r - 1}`, "cur"); range = [l, r];
      if (r - l === 2) { const c = code[l] + code[l + 1]; T.lab(id, `${l}..${r - 1}: ${c}`); T.set(id, "ok"); S.frame(L(`length 2: always valid, ones = ${c}.`, `ยาว 2: ถูกต้องเสมอ จำนวนเลข 1 = ${c}`), view()); return c; }
      const m = (l + r) / 2;
      S.frame(L(`range ${l}..${r - 1}: check the left half ${l}..${m - 1} first.`, `ช่วง ${l}..${r - 1}: ตรวจครึ่งซ้าย ${l}..${m - 1} ก่อน`), view());
      const a = go(l, m, id); range = [l, r];
      if (a < 0) { T.add(id, L("right not called", "ไม่เรียกขวา"), "dim"); T.lab(id, `${l}..${r - 1}: ✗`); T.set(id, "bad"); S.frame(L("left half is INVALID → INVALID without looking at the right half.", "ครึ่งซ้าย INVALID → INVALID โดยไม่ต้องดูครึ่งขวา"), view()); return -1; }
      const b = go(m, r, id); range = [l, r];
      const ok = b >= 0 && Math.abs(a - b) <= 1;
      T.lab(id, `${l}..${r - 1}: ${ok ? a + b : "✗"}`); T.set(id, ok ? "ok" : "bad");
      S.frame(b < 0 ? L("right half is INVALID → INVALID.", "ครึ่งขวา INVALID → INVALID")
        : L(`left has ${a} ones, right has ${b}: |${a} − ${b}| = ${Math.abs(a - b)} ${ok ? "≤ 1 → valid, return " + (a + b) : "> 1 → INVALID"}.`, `ซ้ายมีเลข 1 ${a} ตัว ขวามี ${b} ตัว: |${a} − ${b}| = ${Math.abs(a - b)} ${ok ? "≤ 1 → ถูกต้อง คืน " + (a + b) : "> 1 → INVALID"}`), view());
      return ok ? a + b : -1;
    };
    const ans = go(0, n, null); range = null;
    S.frame(L(`Answer: <b>${ans >= 0 ? "yes" : "no"}</b>.`, `คำตอบ: <b>${ans >= 0 ? "yes" : "no"}</b>`), view());
  }
});
