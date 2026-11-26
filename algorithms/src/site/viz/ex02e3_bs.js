VIZ.def("ex02e3_bs", {
  title: VIZ.L("Binary search for the last index with a value ≤ x (duplicates go left)", "Binary search หาดัชนีสุดท้ายที่ค่า ≤ x (ค่าที่เท่ากันไปทางซ้าย)"),
  input: "10 8\n10 13 14 14 14 15 16 16 18 200\n9 10 11 14 0 200 20 16",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "10 8\n10 13 14 14 14 15 16 16 18 200\n9 10 11 14 0 200 20 16" },
            { name: VIZ.L("All equal", "ค่าเท่ากันหมด"), input: "6 3\n7 7 7 7 7 7\n7 6 8" }],
  limit: VIZ.L("N ≤ 16, M ≤ 8", "N ≤ 16, M ≤ 8"),
  maxFrames: 150,
  legend: [["vis", VIZ.L("≤ x: left part (answer is its last cell)", "≤ x: ส่วนซ้าย (คำตอบคือช่องสุดท้าย)")], ["bad", VIZ.L("> x: right part", "> x: ส่วนขวา")], ["cur", VIZ.L("middle being tested", "middle ที่กำลังตรวจ")], ["ok", VIZ.L("answer", "คำตอบ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 1 && n <= 16 && m >= 1 && m <= 8, L("keep N ≤ 16 and M ≤ 8", "ให้ N ≤ 16 และ M ≤ 8"));
    const A = []; for (let i = 0; i < n; i++) A.push(t.int());
    const Q = []; for (let i = 0; i < m; i++) Q.push(t.int());
    const out = [];
    const view = (x, left, right, mid, done) => {
      const a = ["−∞", ...A, "+∞"], c = {}, p = {};
      c[0] = "dim"; c[n + 1] = "dim";
      for (let i = 0; i <= left; i++) c[i + 1] = "vis";
      for (let i = right; i < n; i++) c[i + 1] = "bad";
      if (mid != null) c[mid + 1] = "cur";
      if (done && left >= 0) c[left + 1] = "ok";
      p[left + 1] = "left"; p[right + 1] = (p[right + 1] ? p[right + 1] + "," : "") + "right"; if (mid != null) p[mid + 1] = "mid";
      return [{ t: "arr", title: L(`sorted array, query x = ${x}`, `อาร์เรย์ที่เรียงแล้ว, คำถาม x = ${x}`), a, c, p, il: ["-1", ...A.map((_, i) => i), String(n)] },
        { t: "vars", v: [["left", left], ["right", right], ["right − left", right - left]] },
        { t: "list", title: L("answers so far", "คำตอบที่ได้"), a: [...out], row: true }];
    };
    Q.forEach((x, qi) => {
      let left = -1, right = n;
      S.frame(L(`Query x = ${x}. Start with the imaginary ends: left = −1 (nothing ≤ x yet), right = n = ${n} (past the end). Invariant: everything up to left is ≤ x, everything from right on is > x.`, `คำถาม x = ${x} เริ่มที่ปลายสมมติ: left = −1 (ยังไม่มีค่า ≤ x), right = n = ${n} (เลยท้าย) เงื่อนไขคงที่: ทุกช่องถึง left มีค่า ≤ x ทุกช่องตั้งแต่ right มีค่า > x`), view(x, left, right));
      while (right - left > 1) {
        const mid = left + Math.floor((right - left) / 2);
        const ok = A[mid] <= x;
        S.frame(L(`middle = ${mid}: A[${mid}] = ${A[mid]} ${ok ? "≤" : ">"} ${x} → ${ok ? "left = middle" : "right = middle"}.`, `middle = ${mid}: A[${mid}] = ${A[mid]} ${ok ? "≤" : ">"} ${x} → ${ok ? "left = middle" : "right = middle"}`), view(x, left, right, mid));
        if (ok) left = mid; else right = mid;
      }
      out.push(String(left));
      S.frame(L(`left and right are neighbours: the boundary is between them. ${left < 0 ? "left = −1: no element ≤ x, answer −1." : `Answer: index ${left} (A[${left}] = ${A[left]}; every equal copy before it went left too).`}`, `left กับ right ติดกันแล้ว: รอยต่ออยู่ระหว่างทั้งสอง ${left < 0 ? "left = −1: ไม่มีค่า ≤ x คำตอบ −1" : `คำตอบ: ดัชนี ${left} (A[${left}] = ${A[left]} สำเนาที่เท่ากันก่อนหน้าก็ไปทางซ้ายหมด)`}`), view(x, left, right, null, true));
    });
  }
});
