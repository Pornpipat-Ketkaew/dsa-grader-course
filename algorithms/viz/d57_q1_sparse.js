VIZ.def("d57_q1_sparse", {
  title: false ? VIZ.L("Adjacency matrix: every operation is one cell", "เมทริกซ์ประชิด: ทุกคำสั่งคือช่องเดียว")
               : VIZ.L("Adjacency sets: every operation touches one vertex's set", "เซตประชิด: ทุกคำสั่งแตะเซตของจุดเดียว"),
  input: "4\nA 0 1\nA 0 2\nA 1 2\nA 1 3\nA 0 1\nR 1 0\nA 3 3\nQ 1 3\nQ 3 1\nR 0 2\nT",
  presets: [{ name: VIZ.L("Mixed operations + transpose", "คำสั่งผสม + transpose"), input: "4\nA 0 1\nA 0 2\nA 1 2\nA 1 3\nA 0 1\nR 1 0\nA 3 3\nQ 1 3\nQ 3 1\nR 0 2\nT" },
            { name: VIZ.L("Cycle 0→1→2→3→4→0, transpose", "วง 0→1→2→3→4→0, transpose"), input: "5\nA 0 1\nA 1 2\nA 2 3\nA 3 4\nA 4 0\nA 0 2\nT" }],
  limit: VIZ.L("n ≤ 6; lines: A a b (add), R a b (remove), Q a b (exists?), T (transpose)", "n ≤ 6; บรรทัด: A a b (เพิ่ม), R a b (ลบ), Q a b (มีไหม?), T (transpose)"),
  maxFrames: 200,
  legend: [["cur", VIZ.L("touched by this operation", "ถูกแตะโดยคำสั่งนี้")], ["ok", VIZ.L("true / added", "จริง / เพิ่มแล้ว")], ["bad", VIZ.L("false / removed / no change", "เท็จ / ลบ / ไม่เปลี่ยน")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 6, L("keep n ≤ 6", "ให้ n ≤ 6"));
    const pos = n === 1 ? [{ x: 120, y: 100 }] : VIZ.circle(n, 240, 200);
    const has = Array.from({ length: n }, () => Array(n).fill(false));
    const store = (m, title, hl, hc) => {
      if (false) {
        const c = {}; if (hl) c[hl[0] + "," + hl[1]] = hc;
        return { t: "grid", title, g: m.map(r => r.map(x => x ? "1" : "0")), c, rl: true, cl: true };
      }
      const rows = m.map(r => { const s = []; r.forEach((x, j) => { if (x) s.push(j); }); return s; });
      const w = Math.max(1, ...rows.map(r => r.length));
      const c = {}; if (hl) { const k = rows[hl[0]].indexOf(hl[1]); c[hl[0] + "," + (k < 0 ? Math.min(rows[hl[0]].length, w - 1) : k)] = hc; }
      return { t: "table", title, h: Array.from({ length: w }, (_, j) => j ? "" : "b ∈ set"), rh: m.map((_, i) => String(i)), r: rows.map(r => Array.from({ length: w }, (_, j) => j < r.length ? r[j] : "")), c, corner: "a" };
    };
    const graph = (m, title, hl, hc) => ({ t: "graph", title, W: 240, H: 200,
      n: [...Array(n).keys()].map(v => ({ id: v, x: pos[v].x, y: pos[v].y, c: hl && (v === hl[0] || v === hl[1]) ? "cur" : "" })),
      e: [].concat(...m.map((r, a) => r.map((x, b) => x ? { a, b, d: true, bend: m[b][a] && a !== b ? 14 : 0, c: hl && hl[0] === a && hl[1] === b ? hc : "" } : null))).filter(e => e && e.a !== e.b) });
    const sname = false ? "hasEdge" : "outgoing";
    const view = (hl, hc, extra) => [graph(has, L("graph", "กราฟ"), hl, hc), store(has, false ? L("hasEdge[a][b] (row a, column b)", "hasEdge[a][b] (แถว a คอลัมน์ b)") : L("outgoing[a] (a sorted set per vertex)", "outgoing[a] (เซตเรียงลำดับของแต่ละจุด)"), hl, hc)].concat(extra || []);
    const loops = () => { const s = []; for (let v = 0; v < n; v++) if (has[v][v]) s.push(v); return s.length ? L(` Self-loops (not drawn): ${s.join(", ")}.`, ` วงวนตัวเอง (ไม่ได้วาด): ${s.join(", ")}`) : L("", ""); };
    S.frame(L(`An empty graph with ${n} vertices: ` + (false ? `an ${n} × ${n} matrix of zeros.` : `${n} empty sets.`), `กราฟว่าง ${n} จุด: ` + (false ? `เมทริกซ์ ${n} × ${n} ที่เป็นศูนย์ทั้งหมด` : `เซตว่าง ${n} เซต`)), view());
    const cost = false ? L("O(1)", "O(1)") : L("O(log degree)", "O(log degree)");
    let guard = 0;
    while (t.more() && guard++ < 60) {
      const op = t.str().toUpperCase();
      if (op === "T") {
        const tr = Array.from({ length: n }, () => Array(n).fill(false));
        S.frame(L("Transpose(): build a new graph; the original must not change.", "Transpose(): สร้างกราฟใหม่ ห้ามเปลี่ยนกราฟเดิม"), view(null, "", [graph(tr, L("transposed", "ผลลัพธ์ transpose")), store(tr, L(`transposed.${sname}`, `transposed.${sname}`))]));
        for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (has[a][b]) {
          tr[b][a] = true;
          S.frame(L(`edge ${a} → ${b} is stored as ${b} → ${a}` + (false ? ` (cell [${a}][${b}] mirrors to [${b}][${a}]).` : ` (from = ${a} only grows, so it goes at the end of outgoing[${b}]).`), `เส้น ${a} → ${b} ถูกเก็บเป็น ${b} → ${a}` + (false ? ` (ช่อง [${a}][${b}] สะท้อนไป [${b}][${a}])` : ` (from = ${a} มีแต่เพิ่มขึ้น จึงไปต่อท้าย outgoing[${b}])`)),
            view([a, b], "cur", [graph(tr, L("transposed", "ผลลัพธ์ transpose"), [b, a], "ok"), store(tr, L(`transposed.${sname}`, `transposed.${sname}`), [b, a], "ok")]));
        }
        S.frame(L("Transpose done: every edge was visited once and reversed." + (false ? " Cost O(n²): the whole matrix is scanned." : " Cost O(n + |E|)."), "Transpose เสร็จ: ทุกเส้นถูกเยี่ยมครั้งเดียวและกลับทิศ" + (false ? " ใช้ O(n²): ไล่ทั้งเมทริกซ์" : " ใช้ O(n + |E|)")),
          view(null, "", [graph(tr, L("transposed", "ผลลัพธ์ transpose")), store(tr, L(`transposed.${sname}`, `transposed.${sname}`))]));
        continue;
      }
      const a = t.int(), b = t.int();
      S.check(a >= 0 && a < n && b >= 0 && b < n, L("vertices must be 0..n−1", "จุดต้องอยู่ในช่วง 0..n−1"));
      const at = false ? `hasEdge[${a}][${b}]` : `outgoing[${a}]`;
      if (op === "A") {
        const was = has[a][b]; has[a][b] = true;
        S.frame(was ? L(`AddEdge(${a}, ${b}): already there, ${at} stays as it is (no duplicate).${loops().en}`, `AddEdge(${a}, ${b}): มีอยู่แล้ว ${at} คงเดิม (ไม่ซ้ำ)${loops().th}`)
                    : L(`AddEdge(${a}, ${b}): ` + (false ? `set ${at} = 1` : `insert ${b} into ${at}`) + `, ${cost.en}.${loops().en}`, `AddEdge(${a}, ${b}): ` + (false ? `ตั้ง ${at} = 1` : `ใส่ ${b} ลงใน ${at}`) + ` ใช้ ${cost.th}${loops().th}`), view([a, b], was ? "bad" : "ok"));
      } else if (op === "R") {
        const was = has[a][b];
        S.frame(was ? L(`RemoveEdge(${a}, ${b}): ` + (false ? `set ${at} = 0` : `erase ${b} from ${at}`) + `, ${cost.en}.`, `RemoveEdge(${a}, ${b}): ` + (false ? `ตั้ง ${at} = 0` : `ลบ ${b} ออกจาก ${at}`) + ` ใช้ ${cost.th}`)
                    : L(`RemoveEdge(${a}, ${b}): the edge does not exist, nothing changes.`, `RemoveEdge(${a}, ${b}): ไม่มีเส้นนี้ ไม่มีอะไรเปลี่ยน`), view([a, b], "bad"));
        has[a][b] = false;
        if (was) S.frame(L(`edge ${a} → ${b} removed.${loops().en}`, `ลบเส้น ${a} → ${b} แล้ว${loops().th}`), view([a, b], "bad"));
      } else if (op === "Q") {
        S.frame(L(`DoesEdgeExist(${a}, ${b}) → <b>${has[a][b]}</b>: ` + (false ? `read ${at}.` : `search ${b} in ${at}.`) + ` The direction matters.`, `DoesEdgeExist(${a}, ${b}) → <b>${has[a][b]}</b>: ` + (false ? `อ่าน ${at}` : `ค้นหา ${b} ใน ${at}`) + ` ทิศทางมีผล`), view([a, b], has[a][b] ? "ok" : "bad"));
      } else S.check(false, L(`unknown operation "${op}"`, `ไม่รู้จักคำสั่ง "${op}"`));
    }
  }
});
