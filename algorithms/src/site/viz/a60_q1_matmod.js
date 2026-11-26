VIZ.def("a60_q1_matmod", {
  title: VIZ.L("A^n by halving the exponent", "A^n ด้วยการแบ่งเลขชี้กำลังครึ่งหนึ่ง"),
  input: "13 1000\n1 2 3 4",
  presets: [{ name: "n = 13", input: "13 1000\n1 2 3 4" }, { name: VIZ.L("Sample 3 (n = 5)", "ตัวอย่าง 3 (n = 5)"), input: "5 10000\n1 2 3 4" }, { name: "n = 1000000000", input: "1000000000 9973\n9999 1234 5678 4321" }],
  limit: VIZ.L("any n ≤ 2^30", "n ใดก็ได้ ≤ 2^30"),
  maxFrames: 200,
  legend: [["cur", VIZ.L("current call", "การเรียกปัจจุบัน")], ["vis", VIZ.L("waiting for its half", "รอผลครึ่งหนึ่ง")], ["ok", VIZ.L("returned", "คืนค่าแล้ว")]],
  run(inp, S) {
    const L = VIZ.L, t = S.tokens(inp), n = t.int(), k = t.int();
    S.check(n >= 1 && n <= 1073741824 && k >= 1, L("need 1 ≤ n ≤ 2^30, k ≥ 1", "ต้องมี 1 ≤ n ≤ 2^30, k ≥ 1"));
    const A = [t.int() % k, t.int() % k, t.int() % k, t.int() % k];
    const mul = (X, Y) => [(X[0] * Y[0] + X[1] * Y[2]) % k, (X[0] * Y[1] + X[1] * Y[3]) % k, (X[2] * Y[0] + X[3] * Y[2]) % k, (X[2] * Y[1] + X[3] * Y[3]) % k];
    const fmt = X => `[${X[0]} ${X[1]}; ${X[2]} ${X[3]}]`;
    const T = new VIZ.Tree(); let mults = 0;
    const view = (X) => [T.panel(L("calls power(A, e)", "การเรียก power(A, e)"), { nw: 120, gy: 40 }),
      { t: "vars", v: [["k", k], ["A mod k", fmt(A)], [L("multiplications", "จำนวนการคูณ"), mults, "cur"], ...(X ? [["result", fmt(X), "ok"]] : [])] }];
    const power = (e, parent) => {
      const id = T.add(parent, "e = " + e, "cur");
      if (parent != null) T.set(parent, "vis");
      if (e === 1) { T.lab(id, "e = 1 → A"); T.set(id, "ok"); S.frame(L("e = 1: return A itself (already reduced mod k).", "e = 1: คืน A เอง (ลด mod k แล้ว)"), view(A)); if (parent != null) T.set(parent, "cur"); return A; }
      S.frame(L(`power(A, ${e}): first solve the half problem e/2 = ${Math.floor(e / 2)}.`, `power(A, ${e}): แก้ปัญหาครึ่งหนึ่งก่อน e/2 = ${Math.floor(e / 2)}`), view());
      const half = power(Math.floor(e / 2), id);
      let r = mul(half, half); mults++;
      let how = `half²`;
      if (e % 2) { r = mul(r, A); mults++; how = `half² · A`; }
      T.lab(id, `e = ${e} → ${how}`); T.set(id, "ok");
      S.frame(L(`back in e = ${e}: result = ${how} (${e} is ${e % 2 ? "odd" : "even"}) = ${fmt(r)}.`, `กลับมาที่ e = ${e}: result = ${how} (${e} เป็นเลข${e % 2 ? "คี่" : "คู่"}) = ${fmt(r)}`), view(r));
      if (parent != null) T.set(parent, "cur");
      return r;
    };
    const R = power(n, null);
    S.frame(L(`A^${n} mod ${k} = <b>${R.join(" ")}</b> after only ${mults} matrix multiplications (a loop would need ${n - 1}).`, `A^${n} mod ${k} = <b>${R.join(" ")}</b> ใช้การคูณเมทริกซ์แค่ ${mults} ครั้ง (ถ้าวนลูปต้องใช้ ${n - 1} ครั้ง)`), view(R));
  }
});
