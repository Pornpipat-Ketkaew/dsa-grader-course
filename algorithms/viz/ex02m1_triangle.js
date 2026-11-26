VIZ.def("ex02m1_triangle", {
  title: VIZ.L("Best route sums, from the bottom up", "ผลรวมเส้นทางที่ดีที่สุด จากล่างขึ้นบน"),
  input: "5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5",
  presets: [{ name: VIZ.L("Fig. 1", "รูปที่ 1"), input: "5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2\n10\n20 3" }],
  limit: VIZ.L("N ≤ 7", "N ≤ 7"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("entry being computed", "ช่องที่กำลังคำนวณ")], ["ok", VIZ.L("the better child", "ลูกที่ดีกว่า")], ["dim", VIZ.L("the other child", "ลูกอีกตัว")], ["path", VIZ.L("best route", "เส้นทางที่ดีที่สุด")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 7, L("keep N ≤ 7", "ให้ N ≤ 7"));
    const tri = []; for (let i = 0; i < n; i++) { tri.push([]); for (let j = 0; j <= i; j++) tri[i].push(t.int()); }
    const best = tri.map(r => r.map(() => ""));
    best[n - 1] = [...tri[n - 1]];
    const view = (cur, extra) => {
      const g1 = tri.map(r => [...r, ...Array(n - r.length).fill("")]), g2 = best.map(r => [...r, ...Array(n - r.length).fill("")]), c = {};
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) c[i + "," + j] = "empty";
      Object.assign(c, extra || {}); if (cur) c[cur] = "cur";
      return [{ t: "grid", title: L("triangle (level, position)", "สามเหลี่ยม (level, position)"), g: g1, c, rl: true, cl: true },
        { t: "grid", title: L("best[level][position] = best sum from here to the bottom", "best[level][position] = ผลรวมที่ดีที่สุดจากตรงนี้ถึงล่างสุด"), g: g2, c, rl: true, cl: true }];
    };
    S.frame(L("Bottom level: best = the number itself.", "ระดับล่างสุด: best = ตัวเลขนั้นเอง"), view());
    for (let i = n - 2; i >= 0; i--) for (let j = 0; j <= i; j++) {
      const a = best[i + 1][j], b = best[i + 1][j + 1], pick = a >= b ? j : j + 1;
      best[i][j] = tri[i][j] + Math.max(a, b);
      S.frame(L(`best[${i}][${j}] = ${tri[i][j]} + max(${a}, ${b}) = ${best[i][j]}.`, `best[${i}][${j}] = ${tri[i][j]} + max(${a}, ${b}) = ${best[i][j]}`), view(i + "," + j, { [(i + 1) + "," + pick]: "ok", [(i + 1) + "," + (pick === j ? j + 1 : j)]: "dim" }));
    }
    const path = {}; let j = 0; for (let i = 0; i < n; i++) { path[i + "," + j] = "path"; if (i < n - 1 && best[i + 1][j + 1] > best[i + 1][j]) j++; }
    S.frame(L(`Answer best[0][0] = <b>${best[0][0]}</b>. Following the larger child from the top recovers the route.`, `คำตอบ best[0][0] = <b>${best[0][0]}</b> เดินตามลูกที่มากกว่าจากยอดจะได้เส้นทาง`), view(null, path));
  }
});
