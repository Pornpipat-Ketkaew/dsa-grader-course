VIZ.def("da66_f1_map_walk", {
  title: VIZ.L("Backtracking DFS over the grid", "DFS แบบ backtracking บนตาราง"),
  input: "2 3\n0 0 0\n0 0 0",
  presets: [{ name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "2 3\n0 0 0\n0 0 0" },
            { name: VIZ.L("Winding maze", "เขาวงกตคดเคี้ยว"), input: "4 5\n0 1 0 0 0\n0 1 0 1 0\n0 1 0 1 0\n0 0 0 1 0" },
            { name: VIZ.L("3×3 with a wall", "3×3 มีกำแพง"), input: "3 3\n0 0 0\n0 1 0\n0 0 0" }],
  limit: VIZ.L("R·C ≤ 20", "R·C ≤ 20"),
  maxFrames: 400,
  legend: [["sel", VIZ.L("current cell", "ช่องปัจจุบัน")], ["vis", VIZ.L("on the current path (visited)", "อยู่บนเส้นทางปัจจุบัน (visited)")], ["wall", VIZ.L("no entry", "ห้ามเข้า")], ["ok", VIZ.L("goal", "เป้าหมาย")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int();
    S.check(R * C <= 20, L("keep R·C ≤ 20", "ให้ R·C ≤ 20"));
    const B = []; for (let r = 0; r < R; r++) { B.push([]); for (let c = 0; c < C; c++) B[r].push(t.int()); }
    const vis = B.map(row => row.map(() => false)); const out = []; let cmd = "";
    const view = (r, c) => {
      const g = B.map(row => row.map(() => "")), cl = {};
      for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) { if (B[i][j]) cl[i + "," + j] = "wall"; else if (vis[i][j]) cl[i + "," + j] = "vis"; }
      cl[(R - 1) + "," + (C - 1)] = cl[(R - 1) + "," + (C - 1)] === "vis" ? "vis" : "ok"; cl[r + "," + c] = "sel";
      let rr = 0, cc = 0; g[0][0] = "S"; for (const ch of cmd) { if (ch === "A") cc++; else if (ch === "B") rr++; else rr--; g[rr][cc] = ch; }
      return [{ t: "grid", title: L("map (letters = command used to enter the cell)", "แผนที่ (ตัวอักษร = คำสั่งที่ใช้เข้าช่อง)"), g, c: cl },
              { t: "vars", v: [["commands", cmd || "∅", "cur"]] }, { t: "list", title: L("printed", "พิมพ์แล้ว"), a: [...out, ...(out.length ? [] : [])] }];
    };
    const D = [["A", 0, 1], ["B", 1, 0], ["C", -1, 0]];
    const walk = (r, c) => {
      if (r === R - 1 && c === C - 1) { out.push(cmd || "(empty)"); S.frame(L(`reached (R,C): print "${cmd}". The game ends here, return.`, `ถึง (R,C): พิมพ์ "${cmd}" เกมจบตรงนี้ return`), view(r, c)); return; }
      for (const [ch, dr, dc] of D) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= R || nc < 0 || nc >= C || vis[nr][nc] || B[nr][nc]) continue;
        vis[nr][nc] = true; cmd += ch;
        S.frame(L(`at (${r + 1},${c + 1}) try ${ch} → (${nr + 1},${nc + 1}): free and not on the path. Mark it, append ${ch}.`, `ที่ (${r + 1},${c + 1}) ลอง ${ch} → (${nr + 1},${nc + 1}): ว่างและไม่อยู่บนเส้นทาง ทำเครื่องหมาย ต่อท้าย ${ch}`), view(nr, nc));
        walk(nr, nc);
        cmd = cmd.slice(0, -1); vis[nr][nc] = false;
        S.frame(L(`back at (${r + 1},${c + 1}): unmark (${nr + 1},${nc + 1}), remove ${ch}.`, `กลับมาที่ (${r + 1},${c + 1}): ลบเครื่องหมาย (${nr + 1},${nc + 1}) และลบ ${ch}`), view(r, c));
      }
    };
    vis[0][0] = true;
    S.frame(L("Start at (1,1), marked visited. Moves are tried in the order A (right), B (down), C (up).", "เริ่มที่ (1,1) ทำเครื่องหมายแล้ว ลองการเดินตามลำดับ A (ขวา), B (ลง), C (ขึ้น)"), view(0, 0));
    walk(0, 0);
    S.frame(L(`Search finished: ${out.length} path(s), then DONE.`, `ค้นหาเสร็จ: ${out.length} เส้นทาง แล้วพิมพ์ DONE`), view(0, 0));
  }
});
