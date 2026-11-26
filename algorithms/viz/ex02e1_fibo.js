VIZ.def("ex02e1_fibo", {
  title: VIZ.L("From the exponential recursion tree to a table", "จากต้นไม้ recursion แบบเลขชี้กำลัง สู่ตาราง"),
  input: "6",
  presets: [{ name: "N = 6", input: "6" }, { name: "N = 5", input: "5" }, { name: "N = 7", input: "7" }],
  limit: VIZ.L("N ≤ 7", "N ≤ 7"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("being computed", "กำลังคำนวณ")], ["bad", VIZ.L("repeated subproblem (wasted work)", "ปัญหาย่อยซ้ำ (งานที่เสียเปล่า)")], ["ok", VIZ.L("value known", "รู้ค่าแล้ว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 7, L("keep N ≤ 7", "ให้ N ≤ 7"));
    const T = new VIZ.Tree(), seen = new Set(); let calls = 0;
    const build = (i, p) => { calls++; const rep = seen.has(i); seen.add(i); const id = T.add(p, "F" + i, rep ? "bad" : ""); if (i > 1) { build(i - 1, id); build(i - 2, id); } return id; };
    build(n, null);
    const fib = Array(n + 1).fill("");
    const view = (k) => [T.panel(L(`plain recursion: ${calls} calls for F(${n})`, `recursion ธรรมดา: เรียก ${calls} ครั้งสำหรับ F(${n})`), { nw: 30, gx: 3, gy: 40 }),
      { t: "arr", title: L("bottom-up table fib[index]", "ตาราง bottom-up fib[index]"), a: fib, c: Object.fromEntries(fib.map((v, i) => [i, i === k ? "cur" : v !== "" ? "ok" : ""])) }];
    S.frame(L(`The plain recursion F(i) = F(i−1) + F(i−2) recomputes the same values again and again (red). For N = 45 it would make about 3.7 billion calls.`, `recursion ธรรมดา F(i) = F(i−1) + F(i−2) คำนวณค่าเดิมซ้ำแล้วซ้ำอีก (สีแดง) เมื่อ N = 45 จะเรียกราว 3.7 พันล้านครั้ง`), view(-1));
    S.frame(L("There are only N + 1 different subproblems F(0)..F(N). Store each one once, smallest first.", "มีปัญหาย่อยต่างกันแค่ N + 1 ตัว F(0)..F(N) เก็บแต่ละตัวครั้งเดียว เริ่มจากตัวเล็กที่สุด"), view(-1));
    fib[0] = 0; fib[1] = 1;
    S.frame(L("Base cases: fib[0] = 0, fib[1] = 1.", "กรณีฐาน: fib[0] = 0, fib[1] = 1"), view(1));
    for (let i = 2; i <= n; i++) { fib[i] = fib[i - 1] + fib[i - 2]; S.frame(L(`fib[${i}] = fib[${i - 1}] + fib[${i - 2}] = ${fib[i - 1]} + ${fib[i - 2]} = ${fib[i]}.`, `fib[${i}] = fib[${i - 1}] + fib[${i - 2}] = ${fib[i - 1]} + ${fib[i - 2]} = ${fib[i]}`), view(i)); }
    S.frame(L(`Answer F(${n}) = <b>${fib[n]}</b> after ${Math.max(0, n - 1)} additions instead of ${calls} calls.`, `คำตอบ F(${n}) = <b>${fib[n]}</b> ใช้การบวก ${Math.max(0, n - 1)} ครั้ง แทนการเรียก ${calls} ครั้ง`), view(-1));
  }
});
