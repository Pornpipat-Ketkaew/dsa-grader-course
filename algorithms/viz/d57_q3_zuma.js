VIZ.def("d57_q3_zuma", {
  title: VIZ.L("Two pointers moving outward from the gap", "two pointers เคลื่อนออกจากช่องว่าง"),
  input: "10 5 4\n1 3 1 4 4 1 1 5 5 5",
  presets: [{ name: VIZ.L("Sample 4", "ตัวอย่าง 4"), input: "10 5 4\n1 3 1 4 4 1 1 5 5 5" },
            { name: VIZ.L("Sample 3 (all gone)", "ตัวอย่าง 3 (หายหมด)"), input: "7 2 4\n1 1 4 4 4 1 1" },
            { name: VIZ.L("Sample 2 (no explosion)", "ตัวอย่าง 2 (ไม่ระเบิด)"), input: "5 1 4\n1 1 1 1 1" },
            { name: VIZ.L("Long chain", "ระเบิดต่อเนื่องยาว"), input: "12 6 2\n1 3 3 2 2 2 2 3 1 1 5 5" }],
  limit: VIZ.L("N ≤ 20", "N ≤ 20"),
  legend: [["sel", VIZ.L("shot bead", "ลูกที่ยิง")], ["cur", VIZ.L("run being measured", "run ที่กำลังวัด")], ["bad", VIZ.L("exploded", "ระเบิดแล้ว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), k = t.int(), v = t.int();
    S.check(n >= 1 && n <= 20 && k >= 0 && k <= n, L("keep N ≤ 20 and 0 ≤ K ≤ N", "ให้ N ≤ 20 และ 0 ≤ K ≤ N"));
    const a = []; for (let i = 0; i < n; i++) a.push(t.int());
    const disp = [...a.slice(0, k), v, ...a.slice(k)];          // displayed with the shot at index k
    const di = i => (i < k ? i : i + 1);                          // original index -> display index
    const il = disp.map((_, j) => j === k ? "shot" : String(j < k ? j : j - 1));
    const view = (left, right, run, gone) => {
      const c = {}; c[k] = "sel";
      (gone || []).forEach(j => c[j] = "bad"); (run || []).forEach(j => c[j] = "cur");
      const p = {}; if (left >= 0) p[di(left)] = "left"; if (right < n) p[di(right)] = (p[di(right)] ? p[di(right)] + "," : "") + "right";
      return [{ t: "arr", title: L("beads (index = original position)", "ลูกปัด (index = ตำแหน่งเดิม)"), a: disp, c, p, il }];
    };
    let left = k - 1; while (left >= 0 && a[left] === v) left--;
    let right = k; while (right < n && a[right] === v) right++;
    const run = []; for (let i = left + 1; i < right; i++) run.push(di(i)); run.push(k);
    const len = (k - 1 - left) + (right - k) + 1;
    S.frame(L(`Shot color ${v} lands between index ${k - 1} and ${k}.`, `ยิงสี ${v} ลงระหว่าง index ${k - 1} กับ ${k}`), view(k - 1, k));
    S.frame(L(`Walk left and right over color ${v}: runLength = ${k - 1 - left} + ${right - k} + 1 = ${len}.`, `เดินซ้ายและขวาผ่านสี ${v}: runLength = ${k - 1 - left} + ${right - k} + 1 = ${len}`), view(left, right, run));
    if (len < 3) {
      S.frame(L(`${len} < 3: nothing explodes. Output: ${disp.join(" ")}`, `${len} < 3: ไม่ระเบิด ผลลัพธ์: ${disp.join(" ")}`), view(left, right));
      return;
    }
    let gone = [...run];
    S.frame(L(`${len} ≥ 3: the run explodes. Now beads[left] and beads[right] touch.`, `${len} ≥ 3: run นี้ระเบิด ตอนนี้ beads[left] กับ beads[right] ชนกัน`), view(left, right, [], gone));
    while (left >= 0 && right < n && a[left] === a[right]) {
      const col = a[left];
      let nl = left; while (nl >= 0 && a[nl] === col) nl--;
      let nr = right; while (nr < n && a[nr] === col) nr++;
      const r2 = []; for (let i = nl + 1; i <= left; i++) r2.push(di(i)); for (let i = right; i < nr; i++) r2.push(di(i));
      const cnt = (left - nl) + (nr - right);
      if (cnt < 3) { S.frame(L(`Both sides are color ${col}, but only ${cnt} beads in total → no explosion. Stop.`, `สองฝั่งเป็นสี ${col} แต่รวมแค่ ${cnt} เม็ด → ไม่ระเบิด หยุด`), view(left, right, r2, gone)); break; }
      S.frame(L(`Meeting colors are both ${col}: ${left - nl} on the left + ${nr - right} on the right = ${cnt} ≥ 3.`, `สีที่ชนกันเป็น ${col} ทั้งคู่: ซ้าย ${left - nl} + ขวา ${nr - right} = ${cnt} ≥ 3`), view(left, right, r2, gone));
      gone = gone.concat(r2); left = nl; right = nr;
      S.frame(L(`Explode. left = ${left}, right = ${right}.`, `ระเบิด left = ${left}, right = ${right}`), view(left, right, [], gone));
    }
    if (left >= 0 && right < n && a[left] !== a[right]) S.frame(L(`Meeting colors ${a[left]} and ${a[right]} differ → stop.`, `สีที่ชนกัน ${a[left]} กับ ${a[right]} ต่างกัน → หยุด`), view(left, right, [], gone));
    const out = [...a.slice(0, left + 1), ...a.slice(right)];
    S.frame(L(`Print beads[0..${left}] + beads[${right}..${n - 1}]: ${out.length ? out.join(" ") : "(empty line)"}`, `พิมพ์ beads[0..${left}] + beads[${right}..${n - 1}]: ${out.length ? out.join(" ") : "(บรรทัดว่าง)"}`), view(left, right, [], gone));
  }
});
