VIZ.def("a65_q0_degrees", {
  title: VIZ.L("Degree = number of 1s in the node's row, then bucket the degrees", "degree = จำนวนเลข 1 ในแถวของปม แล้วนับใส่ถังตาม degree"),
  input: "6\n0 1 0 1 0 0\n1 0 1 0 0 0\n0 1 0 0 0 0\n1 0 0 0 1 1\n0 0 0 1 0 1\n0 0 0 1 1 0",
  presets: [{ name: VIZ.L("Sample", "ตัวอย่าง"), input: "6\n0 1 0 1 0 0\n1 0 1 0 0 0\n0 1 0 0 0 0\n1 0 0 0 1 1\n0 0 0 1 0 1\n0 0 0 1 1 0" },
            { name: VIZ.L("Star + isolated node", "ดาว + ปมโดดเดี่ยว"), input: "5\n0 1 1 1 0\n1 0 0 0 0\n1 0 0 0 0\n1 0 0 0 0\n0 0 0 0 0" }],
  limit: VIZ.L("n ≤ 8", "n ≤ 8"),
  maxFrames: 60,
  legend: [["cur", VIZ.L("row being counted", "แถวที่กำลังนับ")], ["ok", VIZ.L("a 1 = an edge", "เลข 1 = เส้นเชื่อม")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 8, L("keep n ≤ 8", "ให้ n ≤ 8"));
    const M = []; for (let i = 0; i < n; i++) { M.push([]); for (let j = 0; j < n; j++) M[i].push(t.int()); }
    const pos = n === 1 ? [{ x: 120, y: 100 }] : VIZ.circle(n, 240, 200);
    const degree = Array(n).fill(null);
    const view = (row, buckets) => {
      const c = {}; if (row != null) for (let j = 0; j < n; j++) c[row + "," + j] = M[row][j] ? "ok" : "cur";
      const e = []; for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (M[a][b]) e.push({ a, b, c: row === a || row === b ? "cur" : "" });
      const out = [{ t: "graph", title: L("graph", "กราฟ"), W: 240, H: 200, n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, l: String(v + 1), s: degree[v] == null ? "" : "deg " + degree[v], c: v === row ? "cur" : "" })), e },
        { t: "grid", title: L("adjacency matrix (row = node)", "เมทริกซ์ประชิด (แถว = ปม)"), g: M.map(r => r.map(String)), c, rl: M.map((_, i) => i + 1), cl: M.map((_, i) => i + 1) },
        { t: "arr", title: L("degree[node]", "degree[node]"), a: degree.map(d => d == null ? "" : d), c: row != null ? { [row]: "cur" } : {}, idx: 1 }];
      if (buckets) out.push({ t: "arr", title: L("nodesWithDegree[d] (the answer)", "nodesWithDegree[d] (คำตอบ)"), a: buckets, c: Object.fromEntries(buckets.map((_, i) => [i, "ok"])), idx: 0 });
      return out;
    };
    S.frame(L("Each row of the matrix is one node's list of neighbours. The degree of a node is simply how many 1s its row has.", "แต่ละแถวของเมทริกซ์คือรายชื่อเพื่อนบ้านของปมหนึ่ง degree ของปมจึงเป็นแค่จำนวนเลข 1 ในแถวนั้น"), view(null));
    for (let r = 0; r < n; r++) {
      degree[r] = M[r].reduce((a, b) => a + b, 0);
      S.frame(L(`row ${r + 1}: ${degree[r]} one(s) → node ${r + 1} has degree ${degree[r]}.`, `แถว ${r + 1}: มีเลข 1 อยู่ ${degree[r]} ตัว → ปม ${r + 1} มี degree ${degree[r]}`), view(r));
    }
    const k = Math.max(...degree), buckets = Array(k + 1).fill(0); degree.forEach(d => buckets[d]++);
    S.frame(L(`max degree k = ${k}. Count the nodes per degree 0..k: <b>${buckets.join(" ")}</b>. Every degree up to k is printed, even if its count is 0.`, `degree สูงสุด k = ${k} นับปมตาม degree 0..k: <b>${buckets.join(" ")}</b> พิมพ์ทุก degree ถึง k แม้นับได้ 0`), view(null, buckets));
  }
});
