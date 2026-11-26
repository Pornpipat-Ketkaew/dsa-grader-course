VIZ.def("ex06e3_columbia", {
  title: VIZ.L("Dijkstra on a grid: the weight of a move is the fee of the block you enter", "Dijkstra บนตาราง: น้ำหนักของการเดินคือค่าผ่านของช่องที่เข้าไป"),
  input: "4 4\n1 1 1 1\n9 8 7 1\n1 1 1 1\n1 2 4 9",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "4 4\n1 1 1 1\n9 8 7 1\n1 1 1 1\n1 2 4 9" },
            { name: VIZ.L("A free corridor", "ทางเดินฟรี"), input: "3 5\n0 5 0 0 0\n0 5 0 5 0\n0 0 0 5 0" }],
  limit: VIZ.L("R, C ≤ 6", "R, C ≤ 6"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("popped from the heap (final)", "ถูก pop จาก heap (ค่าสุดท้าย)")], ["ok", VIZ.L("final", "ค่าสุดท้ายแล้ว")], ["vis", VIZ.L("tentative, in the heap", "ค่าชั่วคราว อยู่ใน heap")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int();
    S.check(R >= 1 && R <= 6 && C >= 1 && C <= 6, L("keep R, C ≤ 6", "ให้ R, C ≤ 6"));
    const fee = []; for (let r = 0; r < R; r++) { fee.push([]); for (let c = 0; c < C; c++) fee[r].push(t.int()); }
    const cost = fee.map(r => r.map(() => Infinity)), fin = fee.map(r => r.map(() => false)); cost[0][0] = 0;
    let heap = [[0, 0, 0]];
    const view = (cr, cc) => { const c = {}; for (let r = 0; r < R; r++) for (let q = 0; q < C; q++) c[r + "," + q] = r === cr && q === cc ? "cur" : fin[r][q] ? "ok" : cost[r][q] < Infinity ? "vis" : "";
      return [{ t: "grid", title: L("entrance fee", "ค่าผ่าน"), g: fee.map(r => r.map(String)), rl: true, cl: true },
        { t: "grid", title: L("cost[row][col]", "cost[row][col]"), g: cost.map(r => r.map(x => x === Infinity ? "∞" : String(x))), c, rl: true, cl: true },
        { t: "list", title: L("heap (cost, block), smallest first", "heap (cost, ช่อง) น้อยสุดก่อน"), a: heap.slice().sort((a, b) => a[0] - b[0]).slice(0, 8).map(([d, r, q]) => `${d}@(${r},${q})`), row: true }]; };
    S.frame(L("The start block is free (cost 0). Moving into a block costs its fee, so this is Dijkstra on the grid graph with weights on the blocks.", "ช่องเริ่มต้นฟรี (cost 0) การเดินเข้าช่องเสียค่าผ่านของช่องนั้น จึงเป็น Dijkstra บนกราฟตารางที่มีน้ำหนักอยู่บนช่อง"), view(-1, -1));
    while (heap.length) {
      heap.sort((a, b) => a[0] - b[0]); const [d, r, c] = heap.shift();
      if (d > cost[r][c]) continue;
      fin[r][c] = true; const msg = [];
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { const a = r + dr, b = c + dc; if (a < 0 || a >= R || b < 0 || b >= C) continue; const nd = d + fee[a][b]; if (nd < cost[a][b]) { cost[a][b] = nd; heap.push([nd, a, b]); msg.push(`(${a},${b}) = ${d} + ${fee[a][b]} = ${nd}`); } }
      S.frame(L(`pop (${r},${c}) with cost ${d}: no cheaper way can appear later (fees are ≥ 0). ` + (msg.length ? "Update " + msg.join(", ") + "." : "No neighbour improves."), `pop (${r},${c}) ที่ cost ${d}: ไม่มีทางถูกกว่านี้มาทีหลังได้ (ค่าผ่าน ≥ 0) ` + (msg.length ? "ปรับ " + msg.join(", ") : "ไม่มีเพื่อนบ้านที่ดีขึ้น")), view(r, c));
    }
    S.frame(L("Heap empty: every block's cost is final. Print the cost grid.", "heap ว่าง: ทุกช่องได้ค่าสุดท้ายแล้ว พิมพ์ตาราง cost"), view(-1, -1));
  }
});
