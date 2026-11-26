VIZ.def("d61_q1_ordered_set", {
  title: VIZ.L("Filter one list, binary-search the other", "กรองรายการหนึ่ง แล้ว binary search ในอีกรายการ"),
  input: "4 6 9 0 7\n0 3 2 4 5",
  presets: [{ name: VIZ.L("Union example", "ตัวอย่าง Union"), input: "4 6 9 0 7\n0 3 2 4 5" },
            { name: VIZ.L("Intersect example", "ตัวอย่าง Intersect"), input: "3 9 0 1 6\n4 6 9 1 7" }],
  limit: VIZ.L("line 1 = A, line 2 = B, at most 10 values each", "บรรทัด 1 = A, บรรทัด 2 = B ไม่เกินบรรทัดละ 10 ค่า"),
  legend: [["cur", VIZ.L("current item / probe", "ตัวปัจจุบัน / จุดที่ตรวจ")], ["ok", VIZ.L("kept", "เก็บ")], ["dim", VIZ.L("skipped / outside the search range", "ข้าม / นอกช่วงค้นหา")]],
  run(inp, S) {
    const L = VIZ.L, lines = S.lines(inp).filter(x => x.trim());
    S.check(lines.length >= 2, L("need two lines", "ต้องมีสองบรรทัด"));
    const A = lines[0].trim().split(/\s+/).map(Number), B = lines[1].trim().split(/\s+/).map(Number);
    S.check(A.length <= 10 && B.length <= 10, L("at most 10 values per line", "ไม่เกินบรรทัดละ 10 ค่า"));
    const phase = (name, walk, walkName, other, otherName, keepIf, start) => {
      const sorted = [...other].sort((a, b) => a - b), res = [...start];
      const walkC = {};
      const panels = (extra, sc, sp) => [
        { t: "arr", title: L(`walk ${walkName} (its own order)`, `เดิน ${walkName} (ตามลำดับเดิม)`), a: walk, c: { ...walkC, ...extra } },
        { t: "arr", title: L(`sorted copy of ${otherName}`, `สำเนา ${otherName} ที่เรียงแล้ว`), a: sorted, c: sc || {}, p: sp || {} },
        { t: "arr", title: L(`${name} result`, `ผลลัพธ์ ${name}`), a: res, c: Object.fromEntries(res.map((_, i) => [i, i >= start.length ? "ok" : ""])), idx: false }];
      S.frame(L(`<b>${name}</b>: sort a copy of ${otherName} once: [${sorted.join(", ")}]. ` + (start.length ? `The result starts as a copy of A.` : `The result starts empty.`),
                `<b>${name}</b>: เรียงสำเนาของ ${otherName} ครั้งเดียว: [${sorted.join(", ")}] ` + (start.length ? `ผลลัพธ์เริ่มจากสำเนาของ A` : `ผลลัพธ์เริ่มว่าง`)), panels({}));
      walk.forEach((x, i) => {
        let lo = 0, hi = sorted.length - 1, found = false;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1, sc = {};
          sorted.forEach((_, j) => { if (j < lo || j > hi) sc[j] = "dim"; }); sc[mid] = "cur";
          const rel = sorted[mid] === x ? "=" : sorted[mid] < x ? "<" : ">";
          S.frame(L(`is ${x} in ${otherName}? range [${lo}, ${hi}], probe index ${mid}: ${sorted[mid]} ${rel} ${x}` + (rel === "=" ? " → found." : rel === "<" ? " → go right." : " → go left."),
                    `${x} อยู่ใน ${otherName} ไหม? ช่วง [${lo}, ${hi}] ตรวจ index ${mid}: ${sorted[mid]} ${rel} ${x}` + (rel === "=" ? " → เจอ" : rel === "<" ? " → ไปขวา" : " → ไปซ้าย")),
            panels({ [i]: "cur" }, sc, { [lo]: "lo", [hi]: (lo === hi ? "lo,hi" : "hi") }));
          if (sorted[mid] === x) { found = true; break; }
          if (sorted[mid] < x) lo = mid + 1; else hi = mid - 1;
        }
        const keep = keepIf(found);
        if (keep) res.push(x);
        walkC[i] = keep ? "ok" : "dim";
        S.frame(keep ? L(`${x} ${found ? "is" : "is not"} in ${otherName} → keep it.`, `${x} ${found ? "อยู่" : "ไม่อยู่"}ใน ${otherName} → เก็บ`)
                     : L(`${x} ${found ? "is" : "is not"} in ${otherName} → skip it.`, `${x} ${found ? "อยู่" : "ไม่อยู่"}ใน ${otherName} → ข้าม`), panels({}));
      });
      S.frame(L(`${name} = &lt;${res.join(", ")}&gt;`, `${name} = &lt;${res.join(", ")}&gt;`), panels({}));
    };
    phase("Union(A, B)", B, "B", A, "A", f => !f, A);
    phase("Intersect(A, B)", A, "A", B, "B", f => f, []);
  }
});
