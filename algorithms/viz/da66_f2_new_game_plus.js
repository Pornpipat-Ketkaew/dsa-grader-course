VIZ.def("da66_f2_new_game_plus", {
  title: VIZ.L("Counting room lists column by column, state = entering door", "นับรายการห้องทีละคอลัมน์ สถานะ = ประตูที่ใช้เข้า"),
  input: "3 4\n0 0 0 0\n0 1 0 0\n0 0 0 0",
  presets: [{ name: VIZ.L("3 × 4 with a wall", "3 × 4 มีกำแพง"), input: "3 4\n0 0 0 0\n0 1 0 0\n0 0 0 0" }, { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "2 3\n0 1 0\n0 0 0" }, { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2 2\n0 0\n0 0" }],
  limit: VIZ.L("R ≤ 5, C ≤ 6", "R ≤ 5, C ≤ 6"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("column being filled", "คอลัมน์ที่กำลังเติม")], ["vis", VIZ.L("column it comes from", "คอลัมน์ที่มาจาก")], ["wall", VIZ.L("forbidden room", "ห้องห้ามเข้า")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int();
    S.check(R <= 5 && C <= 6, L("keep R ≤ 5 and C ≤ 6", "ให้ R ≤ 5 และ C ≤ 6"));
    const B = []; for (let r = 0; r < R; r++) { B.push([]); for (let c = 0; c < C; c++) B[r].push(t.int()); }
    const W = Array.from({ length: C }, () => Array.from({ length: R }, () => [0, 0, 0, 0])), step = [-1, 0, 1], name = ["X", "Y", "Z"];
    const shown = Array(C).fill(false);
    const fmt = (w) => w[3] ? "start 1" : ["X", "Y", "Z"].map((d, i) => w[i] ? d + w[i] : "").filter(Boolean).join(" ") || "0";
    const view = (cur) => { const g = [], c = {};
      for (let r = 0; r < R; r++) { g.push([]); for (let q = 0; q < C; q++) { g[r].push(B[r][q] ? "" : shown[q] ? fmt(W[q][r]) : ""); if (B[r][q]) c[r + "," + q] = "wall"; else if (q === cur) c[r + "," + q] = "cur"; else if (q === cur - 1) c[r + "," + q] = "vis"; } }
      return [{ t: "grid", title: L("ways[row][door] per room (X/Y/Z = door used to enter)", "ways[row][door] ของแต่ละห้อง (X/Y/Z = ประตูที่ใช้เข้า)"), g, c, rl: [...Array(R).keys()].map(r => r + 1), cl: [...Array(C).keys()].map(q => q + 1) }]; };
    for (let r = 0; r < R; r++) if (!B[r][0]) W[0][r][3] = 1;
    shown[0] = true;
    S.frame(L("Column 1: every open room starts one list, entered by no door (any door may be used next).", "คอลัมน์ 1: ห้องที่เปิดทุกห้องเริ่มรายการหนึ่งรายการ โดยไม่ได้เข้าทางประตูใด (ประตูถัดไปใช้ได้ทุกบาน)"), view(0));
    for (let q = 0; q + 1 < C; q++) {
      for (let r = 0; r < R; r++) for (let d = 0; d < 4; d++) { const v = W[q][r][d]; if (!v) continue;
        for (let e = 0; e < 3; e++) { if (e === d) continue; const nr = r + step[e]; if (nr < 0 || nr >= R || B[nr][q + 1]) continue; W[q + 1][nr][e] = (W[q + 1][nr][e] + v) % 100000007; } }
      shown[q + 1] = true;
      S.frame(L(`Column ${q + 2}: a room entered by door X/Y/Z collects the lists of the room it came from, except those that entered that room by the same door.`, `คอลัมน์ ${q + 2}: ห้องที่เข้าทางประตู X/Y/Z รับรายการของห้องที่มาจาก ยกเว้นรายการที่เข้าห้องนั้นทางประตูเดียวกัน`), view(q + 1));
    }
    const total = W[C - 1].reduce((s, w) => s + w.reduce((a, b) => a + b, 0), 0) % 100000007;
    S.frame(L(`Answer = sum over the last column = <b>${total}</b>.`, `คำตอบ = ผลรวมของคอลัมน์สุดท้าย = <b>${total}</b>`), view(-1));
  }
});
