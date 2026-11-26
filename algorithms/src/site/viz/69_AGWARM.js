VIZ.def("69_AGWARM", {
  title: VIZ.L("Flood fill: one color per region closed off by walls", "Flood fill: หนึ่งสีต่อหนึ่งพื้นที่ที่ถูกเส้นขอบกั้น"),
  input: "6 7\n0 1 2 2 1 0 0\n2 1 1 2 1 3 0\n0 1 3 1 2 1 2\n2 3 2 1 3 2 1\n2 2 2 1 3 2 2\n2 1 2 0 3 2 0",
  presets: [{ name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "6 7\n0 1 2 2 1 0 0\n2 1 1 2 1 3 0\n0 1 3 1 2 1 2\n2 3 2 1 3 2 1\n2 2 2 1 3 2 2\n2 1 2 0 3 2 0" },
            { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "3 3\n0 2 0\n3 1 0\n2 0 1" },
            { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "2 2\n0 0\n3 1" }],
  limit: VIZ.L("R, C ≤ 10", "R, C ≤ 10"),
  maxFrames: 120,
  legend: [["cur", VIZ.L("cell popped from the stack", "ช่องที่ pop ออกจาก stack")], ["vis", VIZ.L("on the stack (colored, waiting)", "อยู่ใน stack (ระบายแล้ว รอขยาย)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int();
    S.check(R >= 1 && R <= 10 && C >= 1 && C <= 10, L("keep R, C ≤ 10", "ให้ R, C ≤ 10"));
    const g = []; for (let r = 0; r < R; r++) { g.push([]); for (let c = 0; c < C; c++) g[r].push(t.int()); }
    const color = g.map(r => r.map(() => 0)), w = {};
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) w[r + "," + c] = (g[r][c] & 1 ? "t" : "") + (g[r][c] & 2 ? "r" : "");
    let colors = 0, cur = null; const onStack = new Set();
    const view = () => { const c = {};
      for (let r = 0; r < R; r++) for (let q = 0; q < C; q++) if (color[r][q]) c[r + "," + q] = "k" + ((color[r][q] - 1) % 10 + 1);
      onStack.forEach(k => c[k] = "vis"); if (cur) c[cur] = "cur";
      return [{ t: "grid", title: L("cell number (thick line = wall: bit 1 = top, bit 2 = right)", "ตัวเลขของช่อง (เส้นหนา = ขอบ: บิต 1 = บน, บิต 2 = ขวา)"), g, c, w, rl: true, cl: true },
        { t: "vars", v: [["colors", colors, "ok"], ["stack", onStack.size]] }]; };
    S.frame(L("Each wall is written once: in the cell below it (bit 1) or the cell left of it (bit 2). So moving down checks bit 1 of the cell below, and moving left checks bit 2 of the cell on the left.", "ขอบแต่ละเส้นถูกเขียนครั้งเดียว: ในช่องที่อยู่ใต้มัน (บิต 1) หรือช่องทางซ้ายของมัน (บิต 2) การเดินลงจึงดูบิต 1 ของช่องข้างล่าง และการเดินซ้ายดูบิต 2 ของช่องทางซ้าย"), view());
    let detailed = 0;
    for (let sr = 0; sr < R; sr++) for (let sc = 0; sc < C; sc++) {
      if (color[sr][sc]) continue;
      colors++; color[sr][sc] = colors; const st = [[sr, sc]]; onStack.add(sr + "," + sc);
      const show = detailed < 2; let cells = 0;
      cur = null; S.frame(L(`(${sr}, ${sc}) has no color yet → new region, color #${colors}. Push it.`, `(${sr}, ${sc}) ยังไม่มีสี → พื้นที่ใหม่ สีที่ ${colors} push ลง stack`), view());
      while (st.length) {
        const [r, c] = st.pop(); onStack.delete(r + "," + c); cells++;
        const nb = [];
        if (r > 0 && !(g[r][c] & 1)) nb.push([r - 1, c, L("up", "บน")]);
        if (r + 1 < R && !(g[r + 1][c] & 1)) nb.push([r + 1, c, L("down", "ล่าง")]);
        if (c > 0 && !(g[r][c - 1] & 2)) nb.push([r, c - 1, L("left", "ซ้าย")]);
        if (c + 1 < C && !(g[r][c] & 2)) nb.push([r, c + 1, L("right", "ขวา")]);
        const pushed = [];
        for (const [a, b, d] of nb) if (!color[a][b]) { color[a][b] = colors; st.push([a, b]); onStack.add(a + "," + b); pushed.push(d); }
        cur = r + "," + c;
        if (show) S.frame(L(`pop (${r}, ${c}). Open sides: ${nb.map(x => x[2].en).join(", ") || "none"}. Newly colored and pushed: ${pushed.map(x => x.en).join(", ") || "nothing"}.`, `pop (${r}, ${c}) ด้านที่เปิด: ${nb.map(x => x[2].th).join(", ") || "ไม่มี"} ระบายและ push ใหม่: ${pushed.map(x => x.th).join(", ") || "ไม่มี"}`), view());
      }
      cur = null; detailed++;
      S.frame(L(`Stack empty: region #${colors} is complete (${cells} cell${cells > 1 ? "s" : ""}).` + (detailed === 2 ? " From here on, each region is shown in one step." : ""), `stack ว่าง: พื้นที่ที่ ${colors} ครบแล้ว (${cells} ช่อง)` + (detailed === 2 ? " ต่อจากนี้แสดงพื้นที่ละหนึ่งขั้น" : "")), view());
    }
    S.frame(L(`Every cell is colored: <b>${colors}</b> colors.`, `ทุกช่องมีสีแล้ว: <b>${colors}</b> สี`), view());
  }
});
