VIZ.def("da66_f2_grid_loop", {
  title: VIZ.L("Components of road cells: a loop = every exit is connected", "component ของช่องถนน: วงวน = ทุกทางออกต่อถึงกัน"),
  input: "4 4\n4 5 4 5\n2 2 3 6\n2 3 1 5\n3 1 1 6",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "4 4\n4 5 4 5\n2 2 3 6\n2 3 1 5\n3 1 1 6" },
            { name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "4 5\n4 1 5 1 2\n2 1 3 5 3\n3 1 1 6 4\n1 2 4 1 6" }],
  limit: VIZ.L("R, C ≤ 8", "R, C ≤ 8"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("component being explored", "component ที่กำลังสำรวจ")], ["ok", VIZ.L("loop", "วงวน")], ["bad", VIZ.L("dead end found: a path", "เจอทางตัน: เป็น path")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int();
    S.check(R >= 1 && R <= 8 && C >= 1 && C <= 8, L("keep R, C ≤ 8", "ให้ R, C ≤ 8"));
    const g = []; for (let r = 0; r < R; r++) { g.push([]); for (let c = 0; c < C; c++) g[r].push(t.int()); }
    const SYM = ["", "─", "│", "└", "┌", "┐", "┘"], EX = [[0, 0], [3, 1], [0, 2], [0, 1], [1, 2], [2, 3], [3, 0]], DR = [-1, 0, 1, 0], DC = [0, 1, 0, -1];
    const opens = (r, c, s) => EX[g[r][c]][0] === s || EX[g[r][c]][1] === s;
    const state = g.map(r => r.map(() => "")); let loops = 0, longest = 0; const rows = [];
    const view = () => { const c = {}; state.forEach((row, r) => row.forEach((s, cc) => { if (s) c[r + "," + cc] = s; }));
      return [{ t: "grid", title: L("road map", "แผนที่ถนน"), g: g.map(r => r.map(x => SYM[x])), c, rl: Array.from({ length: R }, (_, i) => i + 1), cl: Array.from({ length: C }, (_, i) => i + 1) },
        { t: "table", title: L("components", "component"), h: ["cells", "dead end?", "loop?"], rh: rows.map(r => r[0]), corner: "start", r: rows.map(r => r.slice(1)), c: Object.fromEntries(rows.map((r, i) => [i + ",2", r[3] === "yes" ? "ok" : "bad"])) },
        { t: "vars", v: [["loops", loops, "ok"], ["longest", longest, "ok"]] }]; };
    S.frame(L("Each cell has two exits. Neighbours are connected only if both open toward each other, so every cell has at most 2 connections: each component is a path or a loop.", "แต่ละช่องมีทางออกสองทาง ช่องข้างกันเชื่อมกันเมื่อทั้งคู่เปิดหากัน ทุกช่องจึงมีการเชื่อมไม่เกิน 2: แต่ละ component เป็น path หรือวงวน"), view());
    const seen = g.map(r => r.map(() => false));
    for (let sr = 0; sr < R; sr++) for (let sc = 0; sc < C; sc++) {
      if (seen[sr][sc]) continue;
      const comp = [], st = [[sr, sc]]; let dead = null; seen[sr][sc] = true;
      while (st.length) { const [r, c] = st.pop(); comp.push([r, c]);
        for (const s of EX[g[r][c]]) { const a = r + DR[s], b = c + DC[s]; if (a < 0 || a >= R || b < 0 || b >= C || !opens(a, b, (s + 2) % 4)) { if (!dead) dead = [r, c]; continue; } if (!seen[a][b]) { seen[a][b] = true; st.push([a, b]); } } }
      const isLoop = !dead; comp.forEach(([r, c]) => state[r][c] = "cur"); if (dead) state[dead[0]][dead[1]] = "bad";
      if (comp.length > 1 || isLoop) S.frame(isLoop ? L(`component from (${sr + 1}, ${sc + 1}): ${comp.length} cells, every exit leads into a cell that opens back → a loop of length ${comp.length}.`, `component จาก (${sr + 1}, ${sc + 1}): ${comp.length} ช่อง ทุกทางออกไปเจอช่องที่เปิดกลับ → วงวนยาว ${comp.length}`)
        : L(`component from (${sr + 1}, ${sc + 1}): ${comp.length} cells, but cell (${dead[0] + 1}, ${dead[1] + 1}) has an exit to the edge or to a cell that does not open back → a path, not a loop.`, `component จาก (${sr + 1}, ${sc + 1}): ${comp.length} ช่อง แต่ช่อง (${dead[0] + 1}, ${dead[1] + 1}) มีทางออกไปขอบหรือไปช่องที่ไม่เปิดกลับ → เป็น path ไม่ใช่วงวน`), view());
      comp.forEach(([r, c]) => state[r][c] = isLoop ? "ok" : "dim");
      if (comp.length > 1) rows.push([`(${sr + 1},${sc + 1})`, comp.length, isLoop ? "no" : "yes", isLoop ? "yes" : "no"]);
      if (isLoop) { loops++; longest = Math.max(longest, comp.length); }
    }
    S.frame(loops ? L(`Answer: <b>${loops} ${longest}</b> (number of loops, longest loop).`, `คำตอบ: <b>${loops} ${longest}</b> (จำนวนวงวน, วงวนที่ยาวที่สุด)`) : L("No loop: answer <b>0</b>.", "ไม่มีวงวน: คำตอบ <b>0</b>"), view());
  }
});
