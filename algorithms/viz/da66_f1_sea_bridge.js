VIZ.def("da66_f1_sea_bridge", {
  title: VIZ.L("Layered BFS from all of country 1 until country 2 is touched", "BFS ทีละชั้นจากประเทศ 1 ทั้งหมด จนแตะประเทศ 2"),
  input: "5 5\n0 2 2 3 0\n0 0 3 1 1\n0 0 3 0 1\n2 0 0 0 0\n2 0 3 1 1",
  presets: [{ name: VIZ.L("Sample 3 (volcanoes)", "ตัวอย่าง 3 (ภูเขาไฟ)"), input: "5 5\n0 2 2 3 0\n0 0 3 1 1\n0 0 3 0 1\n2 0 0 0 0\n2 0 3 1 1" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3 5\n0 0 0 0 0\n0 2 0 0 1\n0 0 0 0 0" },
            { name: VIZ.L("Sample 6 (a long detour)", "ตัวอย่าง 6 (อ้อมไกล)"), input: "5 5\n0 2 0 0 0\n3 3 3 3 0\n0 0 0 0 0\n0 3 3 3 3\n0 0 0 0 1" }],
  limit: VIZ.L("R, C ≤ 10", "R, C ≤ 10"),
  maxFrames: 40,
  legend: [["sel", VIZ.L("country 1 (layer 1)", "ประเทศ 1 (ชั้น 1)")], ["cur", VIZ.L("newest layer", "ชั้นล่าสุด")], ["ok", VIZ.L("earlier layers (road length shown)", "ชั้นก่อนหน้า (แสดงความยาวถนน)")], ["path", VIZ.L("country 2", "ประเทศ 2")], ["wall", VIZ.L("volcano", "ภูเขาไฟ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int();
    S.check(R >= 1 && R <= 10 && C >= 1 && C <= 10, L("keep R, C ≤ 10", "ให้ R, C ≤ 10"));
    const g = [], len = []; let q = [];
    for (let r = 0; r < R; r++) { g.push([]); len.push([]); for (let c = 0; c < C; c++) { const x = t.int(); g[r].push(x); len[r].push(x === 1 ? 1 : 0); if (x === 1) q.push([r, c]); } }
    let hit = null;
    const view = (L_) => { const c = {}; const grid = g.map((row, r) => row.map((x, cc) => { const k = r + "," + cc;
        if (x === 3) { c[k] = "wall"; return ""; } if (x === 2) { c[k] = hit && hit[0] === r && hit[1] === cc ? "bad" : "path"; return "B"; }
        if (x === 1) { c[k] = "sel"; return "A"; } if (!len[r][cc]) return ""; c[k] = len[r][cc] === L_ ? "cur" : "ok"; return String(len[r][cc]); }));
      return [{ t: "grid", title: L("road length needed to reach each cell (A = country 1, B = country 2)", "ความยาวถนนที่ต้องใช้ไปถึงแต่ละช่อง (A = ประเทศ 1, B = ประเทศ 2)"), g: grid, c, rl: Array.from({ length: R }, (_, i) => i + 1), cl: Array.from({ length: C }, (_, i) => i + 1) }, { t: "vars", v: [["layer", L_], ["answer", hit ? L_ + 1 : "–", "ok"]] }]; };
    S.frame(L("Layer 1 = every country-1 cell: a road of one cell. Each layer adds one cell to the road.", "ชั้น 1 = ทุกช่องของประเทศ 1: ถนนยาวหนึ่งช่อง แต่ละชั้นเพิ่มถนนอีกหนึ่งช่อง"), view(1));
    for (let Lr = 1; q.length && !hit; Lr++) {
      const nq = [];
      for (const [r, c] of q) { for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { const a = r + dr, b = c + dc; if (a < 0 || a >= R || b < 0 || b >= C || g[a][b] === 3 || g[a][b] === 1 || len[a][b]) continue;
        if (g[a][b] === 2) { hit = [a, b]; break; } len[a][b] = Lr + 1; nq.push([a, b]); } if (hit) break; }
      if (hit) { S.frame(L(`expanding layer ${Lr}: a neighbour is country 2 at (${hit[0] + 1}, ${hit[1] + 1}) → the road needs ${Lr} + 1 = <b>${Lr + 1}</b> cells.`, `ขยายชั้น ${Lr}: เพื่อนบ้านเป็นประเทศ 2 ที่ (${hit[0] + 1}, ${hit[1] + 1}) → ถนนต้องใช้ ${Lr} + 1 = <b>${Lr + 1}</b> ช่อง`), view(Lr)); break; }
      q = nq;
      S.frame(L(`layer ${Lr + 1}: ${q.length} new sea cell(s) reachable with a road of ${Lr + 1} cells (volcanoes are skipped).`, `ชั้น ${Lr + 1}: ช่องทะเลใหม่ ${q.length} ช่องที่ไปถึงด้วยถนน ${Lr + 1} ช่อง (ข้ามภูเขาไฟ)`), view(Lr + 1));
    }
  }
});
