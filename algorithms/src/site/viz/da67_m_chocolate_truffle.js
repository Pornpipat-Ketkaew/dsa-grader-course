VIZ.def("da67_m_chocolate_truffle", {
  title: VIZ.L("Reading-order numbers, then the next favourite with wrap-around", "เลขตามลำดับการกิน แล้วหาชิ้นที่ชอบถัดไปแบบวนรอบ"),
  input: "2 5 1\n1 3\n2\n1 2\n1 4",
  presets: [{ name: VIZ.L("Sample 5", "ตัวอย่าง 5"), input: "2 5 1\n1 3\n2\n1 2\n1 4" },
            { name: VIZ.L("Sample 3", "ตัวอย่าง 3"), input: "3 3 2\n3 1\n2 3\n2\n2 2\n1 2" },
            { name: VIZ.L("Sample 4", "ตัวอย่าง 4"), input: "4 2 3\n3 2\n4 1\n2 2\n2\n3 1\n2 1" }],
  limit: VIZ.L("R, C ≤ 8", "R, C ≤ 8"),
  maxFrames: 30,
  legend: [["ok", VIZ.L("favourite", "ชิ้นที่ชอบ")], ["cur", VIZ.L("start", "จุดเริ่ม")], ["path", VIZ.L("the favourite found", "ชิ้นที่ชอบที่หาได้")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), R = t.int(), C = t.int(), k = t.int();
    S.check(R >= 1 && R <= 8 && C >= 1 && C <= 8, L("keep R, C ≤ 8", "ให้ R, C ≤ 8"));
    const F = []; for (let i = 0; i < k; i++) { const r = t.int(), c = t.int(); F.push((r - 1) * C + (c - 1)); }
    F.sort((a, b) => a - b);
    const q = t.int(), out = [], cells = R * C;
    const view = (s, f) => { const g = [], c = {};
      for (let r = 0; r < R; r++) { g.push([]); for (let cc = 0; cc < C; cc++) g[r].push(r * C + cc); }
      F.forEach(x => c[Math.floor(x / C) + "," + (x % C)] = "ok");
      if (f != null) c[Math.floor(f / C) + "," + (f % C)] = "path";
      if (s != null) c[Math.floor(s / C) + "," + (s % C)] = "cur";
      return [{ t: "grid", title: L("box: each cell shows its step (row − 1)·C + (col − 1)", "กล่อง: แต่ละช่องแสดงลำดับ (row − 1)·C + (col − 1)"), g, c, rl: Array.from({ length: R }, (_, i) => i + 1), cl: Array.from({ length: C }, (_, i) => i + 1) },
        { t: "arr", title: L("favourites, sorted", "ชิ้นที่ชอบ เรียงแล้ว"), a: F, c: f != null ? { [F.indexOf(f)]: "path" } : {} },
        { t: "list", title: L("answers", "คำตอบ"), a: [...out], row: true }]; };
    S.frame(L(`Eating order is reading order, so number the cells 0 … R·C − 1 = ${cells - 1}. Then "the next favourite" is the next larger number in a sorted list, wrapping to the smallest after the last cell.`, `ลำดับการกินคือลำดับการอ่าน จึงให้เลขช่อง 0 … R·C − 1 = ${cells - 1} แล้ว "ชิ้นที่ชอบถัดไป" คือเลขที่มากกว่าถัดไปในรายการที่เรียง และวนกลับไปตัวที่น้อยที่สุดหลังช่องสุดท้าย`), view());
    for (let j = 0; j < q; j++) {
      const r = t.int(), c = t.int(), s = (r - 1) * C + (c - 1);
      const idx = F.findIndex(x => x >= s);
      let d, f, why;
      if (idx >= 0) { f = F[idx]; d = f - s; why = L(`lower_bound(${s}) finds ${f}: ${f} − ${s} = <b>${d}</b> day(s).`, `lower_bound(${s}) เจอ ${f}: ${f} − ${s} = <b>${d}</b> วัน`); }
      else { f = F[0]; d = f + cells - s; why = L(`Nothing ≥ ${s}: wrap to the first favourite ${f} of the next round: ${f} + ${cells} − ${s} = <b>${d}</b> day(s).`, `ไม่มีตัวที่ ≥ ${s}: วนไปชิ้นที่ชอบตัวแรก ${f} ของรอบถัดไป: ${f} + ${cells} − ${s} = <b>${d}</b> วัน`); }
      out.push(String(d));
      S.frame(L(`start (${r}, ${c}) = step ${s}. ${why.en}`, `เริ่ม (${r}, ${c}) = ลำดับ ${s} ${why.th}`), view(s, f));
    }
  }
});
