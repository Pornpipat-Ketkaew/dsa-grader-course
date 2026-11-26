VIZ.def("69_AG2", {
  title: VIZ.L("Two-state DP: full boards F and corner-cut boards G", "DP สองสถานะ: กระดานเต็ม F และกระดานที่ขาดมุม G"),
  input: "6",
  presets: [{ name: "N = 6", input: "6" }, { name: "N = 4", input: "4" }, { name: "N = 5", input: "5" }],
  limit: VIZ.L("N ≤ 10", "N ≤ 10"),
  maxFrames: 80,
  legend: [["cur", VIZ.L("dominoes fixed by this case", "โดมิโนที่ถูกบังคับในกรณีนี้")], ["vis", VIZ.L("what is left: a smaller F or G board", "ส่วนที่เหลือ: กระดาน F หรือ G ที่เล็กลง")], ["ok", VIZ.L("value just computed", "ค่าที่เพิ่งคำนวณ")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int();
    S.check(n >= 1 && n <= 10, L("keep 1 ≤ N ≤ 10", "ให้ 1 ≤ N ≤ 10"));
    const F = Array(n + 1).fill(null), G = Array(n + 1).fill(null); F[0] = 1;
    const table = (hl) => ({ t: "table", title: L("DP table (width →)", "ตาราง DP (ความกว้าง →)"), h: [...Array(n + 1).keys()], rh: ["F (full)", "G (corner missing)"],
      r: [F.map(x => x == null ? "–" : x), G.map(x => x == null ? "–" : x)], c: hl || {} });
    // board(width, missingTop, fixed: [[r,c,label]], rest: {label, cells: [[r,c]]})
    const board = (w, missing, fixed, rest, title) => {
      const g = [], c = {};
      for (let r = 0; r < 3; r++) { g.push([]); for (let q = 0; q < w; q++) g[r].push(""); }
      if (missing) c["0," + (w - 1)] = "empty";
      for (const [r, q, lab] of fixed) { g[r][q] = lab; c[r + "," + q] = "cur"; }
      for (const [r, q] of rest.cells) { g[r][q] = rest.label; c[r + "," + q] = "vis"; }
      return { t: "grid", title, g, c };
    };
    const cells = (w, skip) => { const out = []; for (let q = 0; q < w; q++) for (let r = 0; r < 3; r++) if (!(skip && skip[0] === r && skip[1] === q)) out.push([r, q]); return out; };
    S.frame(L("F(w) = tilings of a full 3 × w board. G(w) = tilings of a 3 × w board whose top-right cell is missing (bottom-right is the same by symmetry). Start: F(0) = 1 (the empty board), G of a negative width = 0.", "F(w) = จำนวนวิธีปูกระดาน 3 × w ที่เต็ม G(w) = จำนวนวิธีปูกระดาน 3 × w ที่ขาดช่องมุมขวาบน (ขาดมุมขวาล่างก็เท่ากันโดยสมมาตร) เริ่มต้น: F(0) = 1 (กระดานว่าง) และ G ของความกว้างติดลบ = 0"), [table()]);
    if (n % 2) { S.frame(L(`N = ${n} is odd: 3 × ${n} has an odd number of cells, which dominoes (2 cells each) cannot cover. Answer <b>0</b>.`, `N = ${n} เป็นเลขคี่: 3 × ${n} มีจำนวนช่องเป็นคี่ ซึ่งโดมิโน (ช่องละ 2) ปูไม่ได้ คำตอบ <b>0</b>`), [table()]); return; }
    for (let w = 2; w <= n; w += 2) {
      const gw = w - 1, Lc = gw - 1;               // G(gw): last column index Lc
      const gPrev = gw - 2 >= 1 ? G[gw - 2] : 0;
      S.frame(L(`G(${gw}), case 1: the last column's two cells take one vertical domino. Left: a full 3 × ${gw - 1} board → F(${gw - 1}) = ${F[gw - 1]}.`, `G(${gw}) กรณี 1: สองช่องของคอลัมน์สุดท้ายเป็นโดมิโนแนวตั้งหนึ่งตัว ที่เหลือ: กระดานเต็ม 3 × ${gw - 1} → F(${gw - 1}) = ${F[gw - 1]}`),
        [board(gw, true, [[1, Lc, "┃"], [2, Lc, "┃"]], { label: "F", cells: cells(gw - 1) }, L(`G(${gw}), case 1`, `G(${gw}) กรณี 1`)), table({ ["0," + (gw - 1)]: "vis" })]);
      if (gw >= 2) S.frame(L(`G(${gw}), case 2: two horizontals in the bottom rows. Then cell (0, ${Lc - 1}) can only take a horizontal to its left. Left: a 3 × ${gw - 2} board missing its top-right cell → G(${gw - 2}) = ${gPrev}.`, `G(${gw}) กรณี 2: แนวนอนสองตัวในสองแถวล่าง ช่อง (0, ${Lc - 1}) จึงต้องเป็นแนวนอนไปทางซ้าย ที่เหลือ: กระดาน 3 × ${gw - 2} ที่ขาดมุมขวาบน → G(${gw - 2}) = ${gPrev}`),
        [board(gw, true, [[1, Lc - 1, "━"], [1, Lc, "━"], [2, Lc - 1, "━"], [2, Lc, "━"], [0, Lc - 2, "━"], [0, Lc - 1, "━"]], { label: "G", cells: cells(gw - 2, [0, gw - 3]) }, L(`G(${gw}), case 2`, `G(${gw}) กรณี 2`)), table(gw - 2 >= 1 ? { ["1," + (gw - 2)]: "vis" } : {})]);
      else S.frame(L(`G(1), case 2 (two horizontals) needs a column to the left, which does not exist: contributes 0.`, `G(1) กรณี 2 (แนวนอนสองตัว) ต้องมีคอลัมน์ทางซ้าย ซึ่งไม่มี: ได้ 0`), [table()]);
      G[gw] = F[gw - 1] + gPrev;
      S.frame(L(`G(${gw}) = F(${gw - 1}) + G(${gw - 2}) = ${F[gw - 1]} + ${gPrev} = ${G[gw]}.`, `G(${gw}) = F(${gw - 1}) + G(${gw - 2}) = ${F[gw - 1]} + ${gPrev} = ${G[gw]}`), [table({ ["1," + gw]: "ok" })]);
      const Lf = w - 1;
      S.frame(L(`F(${w}), case a: three horizontals fill the last two columns. Left: F(${w - 2}) = ${F[w - 2]}.`, `F(${w}) กรณี a: แนวนอนสามตัวเต็มสองคอลัมน์สุดท้าย ที่เหลือ: F(${w - 2}) = ${F[w - 2]}`),
        [board(w, false, [0, 1, 2].flatMap(r => [[r, Lf - 1, "━"], [r, Lf, "━"]]), { label: "F", cells: cells(w - 2) }, L(`F(${w}), case a`, `F(${w}) กรณี a`)), table({ ["0," + (w - 2)]: "vis" })]);
      S.frame(L(`F(${w}), case b: a horizontal on top, a vertical below it. Left: a 3 × ${w - 1} board missing its top-right cell → G(${w - 1}) = ${G[w - 1]}.`, `F(${w}) กรณี b: แนวนอนด้านบน แนวตั้งด้านล่าง ที่เหลือ: กระดาน 3 × ${w - 1} ที่ขาดมุมขวาบน → G(${w - 1}) = ${G[w - 1]}`),
        [board(w, false, [[0, Lf - 1, "━"], [0, Lf, "━"], [1, Lf, "┃"], [2, Lf, "┃"]], { label: "G", cells: cells(w - 1, [0, w - 2]) }, L(`F(${w}), case b`, `F(${w}) กรณี b`)), table({ ["1," + (w - 1)]: "vis" })]);
      S.frame(L(`F(${w}), case c: the mirror image (vertical on top, horizontal at the bottom). Left: a board missing its bottom-right cell, also G(${w - 1}) = ${G[w - 1]}.`, `F(${w}) กรณี c: ภาพสะท้อน (แนวตั้งด้านบน แนวนอนด้านล่าง) ที่เหลือ: กระดานที่ขาดมุมขวาล่าง ก็คือ G(${w - 1}) = ${G[w - 1]}`),
        [board(w, false, [[0, Lf, "┃"], [1, Lf, "┃"], [2, Lf - 1, "━"], [2, Lf, "━"]], { label: "G", cells: cells(w - 1, [2, w - 2]) }, L(`F(${w}), case c`, `F(${w}) กรณี c`)), table({ ["1," + (w - 1)]: "vis" })]);
      F[w] = F[w - 2] + 2 * G[w - 1];
      S.frame(L(`F(${w}) = F(${w - 2}) + 2·G(${w - 1}) = ${F[w - 2]} + 2·${G[w - 1]} = ${F[w]}.`, `F(${w}) = F(${w - 2}) + 2·G(${w - 1}) = ${F[w - 2]} + 2·${G[w - 1]} = ${F[w]}`), [table({ ["0," + w]: "ok" })]);
    }
    S.frame(L(`Answer F(${n}) = <b>${F[n]}</b> (the program takes it modulo 10⁹ + 7).`, `คำตอบ F(${n}) = <b>${F[n]}</b> (โปรแกรม mod 10⁹ + 7)`), [table({ ["0," + n]: "ok" })]);
  }
});
