VIZ.def("d63_q1a_hiatus", {
  title: VIZ.L("Months as numbers, then the last published month ≤ the asked one", "เปลี่ยนเดือนเป็นตัวเลข แล้วหาเดือนที่ตีพิมพ์ล่าสุดที่ ≤ เดือนที่ถาม"),
  input: "3 4\n2019 10\n2020 1\n2020 8\n2020 1\n2019 12\n2020 11\n2018 1",
  presets: [{ name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "3 4\n2019 10\n2020 1\n2020 8\n2020 1\n2019 12\n2020 11\n2018 1" },
            { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "2 3\n100000 1\n1 12\n1 12\n1 11\n100000 2" }],
  limit: VIZ.L("n ≤ 12, m ≤ 8", "n ≤ 12, m ≤ 8"),
  maxFrames: 60,
  legend: [["vis", VIZ.L("published ≤ asked month", "ตีพิมพ์ ≤ เดือนที่ถาม")], ["ok", VIZ.L("latest such month", "เดือนล่าสุดแบบนั้น")], ["bad", VIZ.L("after = upper_bound(asked)", "after = upper_bound(asked)")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), m = t.int();
    S.check(n >= 1 && n <= 12 && m >= 1 && m <= 8, L("keep n ≤ 12 and m ≤ 8", "ให้ n ≤ 12 และ m ≤ 8"));
    const P = []; for (let i = 0; i < n; i++) { const y = t.int(), mo = t.int(); P.push(y * 12 + mo - 1); }
    P.sort((x, y) => x - y);
    const lab = v => `${Math.floor(v / 12)}/${v % 12 + 1}`, out = [];
    const view = (after, hit) => { const c = { [n]: "dim" }, p = {};
      if (after != null) { for (let i = 0; i < after; i++) c[i] = "vis"; if (after > 0) c[after - 1] = "ok"; if (after < n) c[after] = "bad"; p[after] = "after"; }
      return [{ t: "arr", title: L("published, as year·12 + (month − 1), sorted", "เดือนที่ตีพิมพ์ เป็น year·12 + (month − 1) เรียงแล้ว"), a: [...P, "end"], c, p, il: [...P.map(lab), ""] },
        { t: "list", title: L("output", "ผลลัพธ์"), a: [...out], row: true }]; };
    S.frame(L("Turn each (year, month) into one number year·12 + (month − 1): later months get bigger numbers, and 12 months of a year are consecutive. Sort the published ones.", "เปลี่ยน (ปี, เดือน) เป็นตัวเลขเดียว year·12 + (month − 1): เดือนที่หลังกว่าได้เลขที่มากกว่า และ 12 เดือนของปีหนึ่งเรียงติดกัน แล้วเรียงเดือนที่ตีพิมพ์"), view());
    for (let q = 0; q < m; q++) {
      const y = t.int(), mo = t.int(), a = y * 12 + mo - 1;
      let after = 0; while (after < n && P[after] <= a) after++;
      let ans, why;
      if (after === 0) { ans = "-1 -1"; why = L("after is the very first: nothing was published up to then → −1 −1.", "after คือตัวแรกสุด: ไม่มีการตีพิมพ์ก่อนหน้านั้นเลย → −1 −1"); }
      else if (P[after - 1] === a) { ans = "0 0"; why = L("the cell before after equals the asked month: published that month → 0 0.", "ช่องก่อน after เท่ากับเดือนที่ถาม: ตีพิมพ์เดือนนั้นพอดี → 0 0"); }
      else { ans = `${Math.floor(P[after - 1] / 12)} ${P[after - 1] % 12 + 1}`; why = L(`the cell before after is the latest earlier month → ${ans}.`, `ช่องก่อน after คือเดือนก่อนหน้าที่ล่าสุด → ${ans}`); }
      out.push(ans);
      S.frame(L(`ask ${y}/${mo} = ${a}. after = first published month > ${a} (index ${after}); ${why.en}`, `ถาม ${y}/${mo} = ${a} after = เดือนที่ตีพิมพ์ตัวแรกที่ > ${a} (ดัชนี ${after}); ${why.th}`), view(after));
    }
  }
});
