VIZ.def("a62_q2a_pandemic", {
  title: VIZ.L("Multi-source BFS: all day-0 provinces start in the queue together", "BFS หลายต้นทาง: ทุกจังหวัดวันที่ 0 เริ่มในคิวพร้อมกัน"),
  input: "5 4 3\n0 0 0 0\n0 0 0 0\n0 0 0 0\n0 2 1 0\n0 0 0 0",
  presets: [{ name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "5 4 3\n0 0 0 0\n0 0 0 0\n0 0 0 0\n0 2 1 0\n0 0 0 0" },
            { name: VIZ.L("Sample 2 (two sources)", "ตัวอย่าง 2 (สองต้นทาง)"), input: "3 3 2\n0 0 1\n0 0 0\n0 0 1" },
            { name: VIZ.L("Mountain wall", "กำแพงภูเขา"), input: "5 6 6\n1 0 2 0 0 0\n0 0 2 0 2 0\n0 0 2 0 2 0\n0 0 0 0 2 0\n2 2 2 2 2 0" }],
  limit: VIZ.L("r, c ≤ 10", "r, c ≤ 10"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("infected today", "ติดเชื้อวันนี้")], ["ok", VIZ.L("infected earlier", "ติดเชื้อก่อนหน้า")], ["wall", VIZ.L("mountain", "ภูเขา")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int(), T = t.int();
    S.check(R >= 1 && R <= 10 && C >= 1 && C <= 10, L("keep r, c ≤ 10", "ให้ r, c ≤ 10"));
    const g = [], day = []; let q = [];
    for (let r = 0; r < R; r++) { g.push([]); day.push([]); for (let c = 0; c < C; c++) { const x = t.int(); g[r].push(x); day[r].push(x === 1 ? 0 : -1); if (x === 1) q.push([r, c]); } }
    let total = q.length;
    const view = (d) => { const c = {}; const grid = g.map((row, r) => row.map((x, cc) => { if (x === 2) { c[r + "," + cc] = "wall"; return ""; } if (day[r][cc] < 0) return ""; c[r + "," + cc] = day[r][cc] === d ? "cur" : "ok"; return String(day[r][cc]); }));
      return [{ t: "grid", title: L("first infection day per province", "วันแรกที่แต่ละจังหวัดติดเชื้อ"), g: grid, c, rl: true, cl: true }, { t: "vars", v: [["day", d], ["T", T], ["infected", total, "ok"]] }]; };
    S.frame(L(`Day 0: ${q.length} province(s) infected. All of them go into the queue at once, so the BFS spreads from every source simultaneously.`, `วันที่ 0: ติดเชื้อ ${q.length} จังหวัด ทั้งหมดเข้าคิวพร้อมกัน BFS จึงลามจากทุกต้นทางไปพร้อมกัน`), view(0));
    for (let d = 1; d <= T && q.length; d++) {
      const nq = [];
      for (const [r, c] of q) for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { const a = r + dr, b = c + dc; if (a < 0 || a >= R || b < 0 || b >= C || g[a][b] === 2 || day[a][b] >= 0) continue; day[a][b] = d; nq.push([a, b]); }
      q = nq; total += q.length;
      S.frame(q.length ? L(`Day ${d}: the ${q.length} new province(s) are the undiscovered neighbours of day ${d - 1}'s provinces (mountains are skipped).`, `วันที่ ${d}: ${q.length} จังหวัดใหม่คือเพื่อนบ้านที่ยังไม่ติดเชื้อของจังหวัดวันที่ ${d - 1} (ข้ามภูเขา)`) : L(`Day ${d}: nothing new can be reached; the spread has stopped before T.`, `วันที่ ${d}: ไปถึงที่ใหม่ไม่ได้แล้ว การระบาดหยุดก่อนถึง T`), view(d));
      if (d === T) break;
    }
    S.frame(L(`After T = ${T} days: <b>${total}</b> infected provinces (everything that entered the queue).`, `หลัง T = ${T} วัน: ติดเชื้อ <b>${total}</b> จังหวัด (ทุกจังหวัดที่เข้าคิว)`), view(-2));
  }
});
