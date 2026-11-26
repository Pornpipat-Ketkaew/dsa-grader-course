VIZ.def("d62_q1a_vote", {
  title: VIZ.L("Counting ballots, then picking the K-th place", "นับบัตร แล้วเลือกอันดับที่ K"),
  input: "8 2\nsomchai\nadisak\nsomchai\nyingyos\nsomchai\nadisak\ndirek\nyingyos",
  presets: [
    { name: VIZ.L("Sample 1", "ตัวอย่าง 1"), input: "8 2\nsomchai\nadisak\nsomchai\nyingyos\nsomchai\nadisak\ndirek\nyingyos" },
    { name: VIZ.L("Sample 2", "ตัวอย่าง 2"), input: "5 3\nsomchai\nsomchai\nsomchai\nsomchai\nyingyos" },
  ],
  limit: VIZ.L("N ≤ 30", "N ≤ 30"),
  legend: [["cur", VIZ.L("current", "ปัจจุบัน")], ["ok", VIZ.L("answer", "คำตอบ")], ["vis", VIZ.L("elected", "ได้รับเลือก")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp);
    const n = t.int(), k = t.int(); S.check(n >= 1 && n <= 30, L("keep N ≤ 30", "ให้ N ≤ 30"));
    const ballots = []; for (let i = 0; i < n; i++) ballots.push(t.str());
    const names = [], votes = {};
    const mapPanel = (hi) => ({ t: "table", title: L("votesOf (hash map)", "votesOf (hash map)"), h: ["name", "votes"],
      r: names.map(x => [x, votes[x]]), c: Object.fromEntries(names.map((x, i) => [i + ",1", x === hi ? "cur" : ""])) });
    S.frame(L(`${n} ballots, K = ${k}. Start with an empty map.`, `บัตร ${n} ใบ K = ${k} เริ่มจาก map ว่าง`),
      [{ t: "list", title: L("ballots", "บัตร"), a: ballots, row: true }, mapPanel()]);
    for (let i = 0; i < n; i++) {
      const b = ballots[i], isNew = !(b in votes);
      if (isNew) { names.push(b); votes[b] = 0; }
      votes[b]++;
      S.frame(isNew ? L(`ballot ${i + 1}: "${b}" is new, inserted with 0, then ++ → 1.`, `บัตรที่ ${i + 1}: "${b}" เป็นชื่อใหม่ ถูกเพิ่มด้วยค่า 0 แล้ว ++ → 1`)
                    : L(`ballot ${i + 1}: votesOf["${b}"]++ → ${votes[b]}.`, `บัตรที่ ${i + 1}: votesOf["${b}"]++ → ${votes[b]}`),
        [{ t: "list", title: L("ballots", "บัตร"), a: ballots, row: true, c: Object.fromEntries(ballots.map((_, j) => [j, j === i ? "cur" : j < i ? "dim" : ""])) }, mapPanel(b)]);
    }
    const totals = names.map(x => votes[x]);
    const m = totals.length, last = Math.min(k, m) - 1;
    S.frame(L(`Copy only the totals into a vector (m = ${m}). lastPlace = min(K, m) − 1 = min(${k}, ${m}) − 1 = ${last}.`,
              `คัดลอกเฉพาะยอดรวมลงเวกเตอร์ (m = ${m}) lastPlace = min(K, m) − 1 = min(${k}, ${m}) − 1 = ${last}`),
      [mapPanel(), { t: "arr", title: L("totals", "totals"), a: totals }]);
    const sorted = [...totals].sort((a, b) => b - a);
    const c = {}; sorted.forEach((v, i) => { if (v >= sorted[last]) c[i] = "vis"; }); c[last] = "ok";
    const p = {}; p[last] = "lastPlace";
    S.frame(L(`nth_element(..., greater) puts the ${last + 1}-th largest total at index ${last}; bigger ones end up on its left. (Shown fully sorted for clarity.)`,
              `nth_element(..., greater) วางยอดที่มากเป็นอันดับ ${last + 1} ไว้ที่ index ${last} ค่าที่มากกว่าอยู่ทางซ้าย (แสดงแบบเรียงเต็มเพื่อให้ดูง่าย)`),
      [{ t: "arr", title: L("totals, largest first", "totals เรียงจากมากไปน้อย"), a: sorted, c, p }]);
    S.frame(L(`Everybody with ≥ ${sorted[last]} votes is elected (blue), ties included. The weakest winner has <b>${sorted[last]}</b> votes.`,
              `ทุกคนที่ได้ ≥ ${sorted[last]} คะแนนได้รับเลือก (สีฟ้า) รวมผู้ที่เสมอด้วย ผู้ชนะที่อ่อนที่สุดได้ <b>${sorted[last]}</b> คะแนน`),
      [{ t: "arr", title: L("totals, largest first", "totals เรียงจากมากไปน้อย"), a: sorted, c, p }, { t: "vars", v: [["answer", sorted[last], "ok"]] }]);
  }
});
