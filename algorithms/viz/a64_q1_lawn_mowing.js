VIZ.def("a64_q1_lawn_mowing", {
  title: VIZ.L("Two prefix sums, then the last affordable end by binary search", "ผลรวมสะสมสองชุด แล้ว binary search หาจุดจบสุดท้ายที่จ่ายไหว"),
  input: "5 4 2\n1 1 1 1 1\n0 2\n0 5\n0 10\n0 1000",
  presets: [{ name: VIZ.L("Sample 2 (k = 2)", "ตัวอย่าง 2 (k = 2)"), input: "5 4 2\n1 1 1 1 1\n0 2\n0 5\n0 10\n0 1000" },
            { name: VIZ.L("Sample 1 (k = 0)", "ตัวอย่าง 1 (k = 0)"), input: "5 5 0\n1 2 3 4 5\n1 5\n1 8\n1 9\n1 10\n1 14" },
            { name: VIZ.L("Mixed grass", "หญ้าไม่เท่ากัน"), input: "8 2 3\n4 0 7 2 9 1 0 5\n2 20\n0 40" }],
  limit: VIZ.L("n ≤ 12, m ≤ 6", "n ≤ 12, m ≤ 6"),
  maxFrames: 80,
  legend: [["vis", VIZ.L("affordable ends (left part)", "จุดจบที่จ่ายไหว (ส่วนซ้าย)")], ["bad", VIZ.L("too expensive (right part)", "แพงเกิน (ส่วนขวา)")], ["cur", VIZ.L("middle being tested", "middle ที่กำลังตรวจ")], ["ok", VIZ.L("cells mowed", "ช่องที่ตัด")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int(), k = t.int();
    S.check(n >= 1 && n <= 12 && m >= 1 && m <= 6, L("keep n ≤ 12 and m ≤ 6", "ให้ n ≤ 12 และ m ≤ 6"));
    const A = []; for (let i = 0; i < n; i++) A.push(t.int());
    const G = [0], Cst = [0]; A.forEach((a, i) => { G.push(G[i] + a); Cst.push(Cst[i] + a + k); });
    const out = [];
    const view = (start, lo, hi, mid, limit, mowed) => {
      const cc = {}, gc = {}, ac = {};
      if (start != null) { for (let i = 0; i <= n; i++) { if (i < start) cc[i] = "dim"; else if (i <= lo) cc[i] = "vis"; else if (i >= hi) cc[i] = "bad"; }
        if (mid != null) cc[mid] = "cur";
        if (mowed != null) { for (let i = start; i < mowed; i++) ac[i] = "ok"; gc[start] = "vis"; gc[mowed] = "ok"; } }
      return [{ t: "arr", title: L("grass A[cell]", "หญ้า A[cell]"), a: A, c: ac },
        { t: "arr", title: L(`costBefore[i] = A[0..i−1] + i·k  (k = ${k})`, `costBefore[i] = A[0..i−1] + i·k  (k = ${k})`), a: Cst, c: cc },
        { t: "arr", title: L("grassBefore[i] = A[0..i−1]", "grassBefore[i] = A[0..i−1]"), a: G, c: gc },
        { t: "vars", v: limit != null ? [["limit", limit], ["left", lo], ["right", hi]] : [] },
        { t: "list", title: L("answers", "คำตอบ"), a: [...out], row: true }];
    };
    S.frame(L("Mowing cells l..r costs (grass in l..r) + (r − l + 1)·k = costBefore[r+1] − costBefore[l], and yields grassBefore[r+1] − grassBefore[l]. Both prefix sums are built once.", "การตัดช่อง l..r เสีย (หญ้าใน l..r) + (r − l + 1)·k = costBefore[r+1] − costBefore[l] และได้หญ้า grassBefore[r+1] − grassBefore[l] สร้างผลรวมสะสมทั้งสองครั้งเดียว"), view());
    for (let q = 0; q < m; q++) {
      const a = t.int(), b = t.int(), limit = Cst[a] + b;
      // last end e in [a, n] with Cst[e] <= limit: left = a (always ok), right = n + 1
      let lo = a, hi = n + 1;
      S.frame(L(`start ${a}, budget ${b}: we may end before cell e as long as costBefore[e] ≤ costBefore[${a}] + ${b} = ${limit}. costBefore only grows, so search the last such e (e = ${a} means "mow nothing").`, `เริ่ม ${a} งบ ${b}: จบก่อนช่อง e ได้ตราบที่ costBefore[e] ≤ costBefore[${a}] + ${b} = ${limit} costBefore มีแต่เพิ่ม จึงหา e ตัวสุดท้ายแบบนั้น (e = ${a} คือ "ไม่ตัดเลย")`), view(a, lo, hi, null, limit));
      while (hi - lo > 1) {
        const mid = lo + Math.floor((hi - lo) / 2), ok = Cst[mid] <= limit;
        S.frame(L(`costBefore[${mid}] = ${Cst[mid]} ${ok ? "≤" : ">"} ${limit} → ${ok ? "left" : "right"} = ${mid}.`, `costBefore[${mid}] = ${Cst[mid]} ${ok ? "≤" : ">"} ${limit} → ${ok ? "left" : "right"} = ${mid}`), view(a, lo, hi, mid, limit));
        if (ok) lo = mid; else hi = mid;
      }
      out.push(String(G[lo] - G[a]));
      S.frame(lo === a ? L(`Even cell ${a} alone is too expensive: mow nothing, grass <b>0</b>.`, `แม้แต่ช่อง ${a} ช่องเดียวก็แพงเกิน: ไม่ตัดเลย หญ้า <b>0</b>`) : L(`Mow cells ${a}..${lo - 1}: grass = grassBefore[${lo}] − grassBefore[${a}] = <b>${G[lo] - G[a]}</b>.`, `ตัดช่อง ${a}..${lo - 1}: หญ้า = grassBefore[${lo}] − grassBefore[${a}] = <b>${G[lo] - G[a]}</b>`), view(a, lo, hi, null, limit, lo));
    }
  }
});
