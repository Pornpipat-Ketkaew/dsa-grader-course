VIZ.def("da66_f1_linear_recurrence", {
  title: VIZ.L("Each value from a sliding window of the previous k", "แต่ละค่ามาจากหน้าต่างของ k ค่าก่อนหน้า"),
  input: "3 8\n7 3 2\n4 4 2",
  presets: [{ name: "k = 3", input: "3 8\n7 3 2\n4 4 2" }, { name: VIZ.L("Fibonacci (k = 2)", "ฟีโบนัชชี (k = 2)"), input: "2 10\n1 1\n0 1" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2 4\n2 10\n2 3" }],
  limit: VIZ.L("n ≤ 14", "n ≤ 14"),
  maxFrames: 40,
  legend: [["cur", VIZ.L("R(index) being computed", "R(index) ที่กำลังคำนวณ")], ["vis", VIZ.L("the k values it uses", "k ค่าที่ใช้")], ["ok", VIZ.L("known", "รู้ค่าแล้ว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), k = t.int(), n = t.int();
    S.check(n <= 14 && k >= 1 && k <= 6, L("keep n ≤ 14 and k ≤ 6", "ให้ n ≤ 14 และ k ≤ 6"));
    const c = [0]; for (let i = 0; i < k; i++) c.push(t.int());
    const R = Array(Math.max(n, k - 1) + 1).fill(""); for (let i = 0; i < k; i++) R[i] = t.int() % 32717;
    const view = (cur) => { const cl = {}, p = {};
      R.forEach((v, i) => { if (v !== "") cl[i] = "ok"; });
      if (cur != null) { cl[cur] = "cur"; for (let b = 1; b <= k; b++) { cl[cur - b] = "vis"; p[cur - b] = "×c" + b; } }
      return [{ t: "arr", title: "R(index) mod 32717", a: R, c: cl, p }]; };
    S.frame(L(`Base values R(0..${k - 1}) = a0..a${k - 1}. Every later value is a weighted sum of the k values before it.`, `ค่าเริ่มต้น R(0..${k - 1}) = a0..a${k - 1} ทุกค่าหลังจากนั้นเป็นผลรวมถ่วงน้ำหนักของ k ค่าก่อนหน้า`), view());
    for (let i = k; i <= n; i++) {
      let s = 0; const parts = []; for (let b = 1; b <= k; b++) { s = (s + c[b] * R[i - b]) % 32717; parts.push(`${c[b]}·${R[i - b]}`); }
      R[i] = s;
      S.frame(L(`R(${i}) = ${parts.join(" + ")} = ${s} (mod 32717).`, `R(${i}) = ${parts.join(" + ")} = ${s} (mod 32717)`), view(i));
    }
    S.frame(L(`Answer R(${n}) = <b>${R[n]}</b>.`, `คำตอบ R(${n}) = <b>${R[n]}</b>`), view());
  }
});
