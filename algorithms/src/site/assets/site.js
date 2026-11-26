/* ===== Algorithm Grader: How & Solution — site script + concept visualizer ===== */
(function () {
  "use strict";
  const H = document.documentElement;
  const store = { get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } },
                  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- language + theme ---------- */
  function setLang(l) {
    H.dataset.lang = l; H.lang = l; store.set("alg-lang", l);
    document.querySelectorAll("[data-setlang]").forEach(b => b.classList.toggle("on", b.dataset.setlang === l));
    document.dispatchEvent(new Event("langchange"));
  }
  function setTheme(t) { H.dataset.theme = t; store.set("alg-theme", t); }
  setLang(store.get("alg-lang", "en"));
  setTheme(store.get("alg-theme", (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", () => {
    setLang(H.dataset.lang);
    document.querySelectorAll("[data-setlang]").forEach(b => b.onclick = () => setLang(b.dataset.setlang));
    const tb = document.getElementById("themeBtn");
    if (tb) tb.onclick = () => setTheme(H.dataset.theme === "dark" ? "light" : "dark");
    const mb = document.getElementById("menuBtn");
    if (mb) mb.onclick = () => document.body.classList.toggle("menu");
    // sidebar: highlight + search
    const on = document.querySelector(".side a.on");
    if (on) on.scrollIntoView({ block: "center" });
    const q = document.getElementById("search");
    if (q) q.oninput = () => {
      const s = q.value.trim().toLowerCase();
      document.querySelectorAll(".side li").forEach(li => { li.style.display = !s || li.textContent.toLowerCase().includes(s) ? "" : "none"; });
    };
    // copy buttons
    document.querySelectorAll("[data-copy]").forEach(b => b.onclick = () => {
      const src = document.getElementById(b.dataset.copy).textContent;
      (navigator.clipboard ? navigator.clipboard.writeText(src) : Promise.reject()).then(
        () => { b.textContent = "✓ copied"; setTimeout(() => b.textContent = "Copy", 1400); },
        () => { b.textContent = "select + Ctrl+C"; });
    });
    // build visualizers
    document.querySelectorAll(".viz[data-viz]").forEach(el => VIZ.mount(el));
  });

  /* ---------- visualizer ---------- */
  const L = (en, th) => ({ en: en, th: th === undefined ? en : th });
  const tr = x => (x == null ? "" : (typeof x === "object" && "en" in x) ? x[H.dataset.lang] : String(x));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mk = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const clsOf = (c, k) => !c ? "" : Array.isArray(c) ? (c[k] || "") : (c[k] || "");

  class Stop extends Error {}
  function recorder(max) {
    const frames = [];
    return {
      frames,
      frame(cap, panels) {
        if (frames.length >= max) throw new Stop();
        frames.push({ cap: cap, panels: JSON.parse(JSON.stringify(panels)) });
      },
      tokens(text) {
        const tk = String(text).trim().split(/\s+/).filter(x => x.length);
        let i = 0;
        const need = () => { if (i >= tk.length) throw new Error("input ended early"); return tk[i++]; };
        return {
          int() { const v = need(); if (!/^-?\d+$/.test(v)) throw new Error("expected an integer, got '" + v + "'"); return parseInt(v, 10); },
          num() { const v = Number(need()); if (isNaN(v)) throw new Error("expected a number"); return v; },
          str() { return need(); },
          more() { return i < tk.length; },
          rest() { return tk.slice(i); }
        };
      },
      lines(text) { return String(text).replace(/\r/g, "").split("\n"); },
      check(cond, msg) { if (!cond) throw new Error(tr(msg)); }
    };
  }

  /* panel renderers */
  const R = {};
  function title(p, box) { if (p.title) box.appendChild(mk("div", "pn-title", tr(p.title))); }
  R.arr = (p) => {
    const box = mk("div", "pn-panel"); title(p, box);
    const a = mk("div", "arr" + (p.vert ? " vert" : "") + (p.size ? " " + p.size : ""));
    const base = p.idx === false ? null : (typeof p.idx === "number" ? p.idx : 0);
    (p.a || []).forEach((v, i) => {
      const w = mk("div", "cellw");
      if (p.il) w.appendChild(mk("div", "cidx", esc(p.il[i] == null ? "" : p.il[i])));
      else if (base !== null && !p.vert) w.appendChild(mk("div", "cidx", base + i));
      w.appendChild(mk("div", "cell " + clsOf(p.c, i), esc(v)));
      if (p.p && !p.vert) w.appendChild(mk("div", "cptr", esc(p.p[i] || "")));
      if (p.vert) { w.style.flexDirection = "row"; w.style.gap = "6px"; if (base !== null) w.prepend(mk("div", "cidx", base + i)); if (p.p && p.p[i]) w.appendChild(mk("div", "cptr", esc(p.p[i]))); }
      a.appendChild(w);
    });
    if (!(p.a || []).length) a.appendChild(mk("div", "cell empty", "∅"));
    box.appendChild(a); return box;
  };
  R.grid = (p) => {
    const box = mk("div", "pn-panel"); title(p, box);
    const g = p.g, rows = g.length, cols = rows ? g[0].length : 0;
    const showR = !!p.rl, showC = !!p.cl;
    const el = mk("div", "grid" + (p.size ? " " + p.size : ""));
    el.style.gridTemplateColumns = (showR ? "auto " : "") + "repeat(" + cols + ", auto)";
    if (showC) { if (showR) el.appendChild(mk("div", "cl", "")); for (let c = 0; c < cols; c++) el.appendChild(mk("div", "cl", Array.isArray(p.cl) ? esc(p.cl[c]) : c)); }
    for (let r = 0; r < rows; r++) {
      if (showR) el.appendChild(mk("div", "rl", Array.isArray(p.rl) ? esc(p.rl[r]) : r));
      for (let c = 0; c < cols; c++) {
        let k = "";
        if (p.c) k = Array.isArray(p.c) ? ((p.c[r] || [])[c] || "") : (p.c[r + "," + c] || "");
        let w = p.w ? (Array.isArray(p.w) ? ((p.w[r] || [])[c] || "") : (p.w[r + "," + c] || "")) : "";
        const wc = (w.includes("t") ? " wt" : "") + (w.includes("r") ? " wr" : "") + (w.includes("b") ? " wb" : "") + (w.includes("l") ? " wl" : "");
        el.appendChild(mk("div", "cell " + k + wc, esc(g[r][c] == null ? "" : g[r][c])));
      }
    }
    box.appendChild(el); return box;
  };
  R.table = (p) => {
    const box = mk("div", "pn-panel"); title(p, box);
    const t = mk("table", "vtable");
    if (p.h) { const tr_ = mk("tr"); if (p.rh) tr_.appendChild(mk("th", "", esc(p.corner || ""))); p.h.forEach(h => tr_.appendChild(mk("th", "", esc(h)))); t.appendChild(tr_); }
    (p.r || []).forEach((row, i) => {
      const tr_ = mk("tr"); if (p.rh) tr_.appendChild(mk("th", "", esc(p.rh[i])));
      row.forEach((v, j) => tr_.appendChild(mk("td", p.c ? (Array.isArray(p.c) ? ((p.c[i] || [])[j] || "") : (p.c[i + "," + j] || "")) : "", esc(v == null ? "" : v))));
      t.appendChild(tr_);
    });
    const wrap = mk("div"); wrap.style.overflowX = "auto"; wrap.appendChild(t); box.appendChild(wrap); return box;
  };
  R.vars = (p) => {
    const box = mk("div", "pn-panel"); title(p, box);
    const v = mk("div", "vars");
    (p.v || []).forEach(([k, val, c]) => v.appendChild(mk("div", "var " + (c || ""), "<b>" + esc(tr(k)) + "</b>" + esc(tr(val)))));
    box.appendChild(v); return box;
  };
  R.list = (p) => {
    const box = mk("div", "pn-panel"); title(p, box);
    const v = mk("div", "vlist" + (p.row ? " row" : ""));
    (p.a || []).forEach((s, i) => v.appendChild(mk("div", "it " + clsOf(p.c, i), esc(tr(s)))));
    if (!(p.a || []).length) v.appendChild(mk("div", "it dim", tr(p.empty || "(empty)")));
    box.appendChild(v); return box;
  };
  R.html = (p) => { const box = mk("div", "pn-panel" + (p.full ? " full" : "")); title(p, box); box.appendChild(mk("div", "", tr(p.h))); return box; };
  const SVGNS = "http://www.w3.org/2000/svg";
  const sv = (tag, attrs, parent) => { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  R.graph = (p) => {
    const box = mk("div", "pn-panel"); title(p, box);
    const W = p.W || 400, Hh = p.H || 260, r = p.r || 17;
    const s = sv("svg", { class: "vg", viewBox: "0 0 " + W + " " + Hh, width: W, height: Hh });
    const defs = sv("defs", {}, s);
    ["", "cur", "ok", "vis", "path", "bad"].forEach(k => {
      const m = sv("marker", { id: "ah" + k + p._uid, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 5, markerHeight: 5, orient: "auto-start-reverse" }, defs);
      const colors = { "": "var(--line2)", cur: "var(--cur)", ok: "var(--ok)", vis: "var(--vis)", path: "var(--path)", bad: "var(--bad)" };
      sv("path", { d: "M0,0 L10,5 L0,10 z", style: "fill:" + colors[k] }, m);
    });
    const pos = {}; (p.n || []).forEach(n => pos[n.id] = n);
    (p.e || []).forEach(e => {
      const A = pos[e.a], B = pos[e.b]; if (!A || !B) return;
      const g = sv("g", { class: "ed " + (e.c || "") }, s);
      const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
      const rr = (e.rr || r);
      let x1 = A.x + ux * rr, y1 = A.y + uy * rr, x2 = B.x - ux * (rr + (e.d ? 2 : 0)), y2 = B.y - uy * (rr + (e.d ? 2 : 0));
      let mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      const mark = e.d ? { "marker-end": "url(#ah" + (["cur", "ok", "vis", "path", "bad"].includes(e.c) ? e.c : "") + p._uid + ")" } : {};
      if (e.bend) {
        const nx = -uy * e.bend, ny = ux * e.bend; const cx = mx + nx, cy = my + ny;
        sv("path", Object.assign({ d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}` }, mark), g);
        mx = (mx + cx) / 2 + nx * 0.0; my = (my + cy) / 2;
        mx = 0.25 * x1 + 0.5 * cx + 0.25 * x2; my = 0.25 * y1 + 0.5 * cy + 0.25 * y2;
      } else sv("line", Object.assign({ x1, y1, x2, y2 }, mark), g);
      if (e.w != null && e.w !== "") { const t = sv("text", { class: "ew", x: mx, y: my }, g); t.textContent = tr(e.w); }
    });
    (p.n || []).forEach(n => {
      const g = sv("g", { class: "nd " + (n.c || "") }, s);
      sv("circle", { cx: n.x, cy: n.y, r: n.r || r }, g);
      const t = sv("text", { class: "nl", x: n.x, y: n.y }, g); t.textContent = n.l == null ? n.id : tr(n.l);
      if (n.s != null && n.s !== "") { const u = sv("text", { class: "ns", x: n.x, y: n.y + (n.r || r) + 14 }, g); u.textContent = tr(n.s); }
    });
    box.appendChild(s); return box;
  };
  R.tree = (p) => {
    const box = mk("div", "pn-panel" + (p.full ? " full" : "")); title(p, box);
    const nodes = p.n || [], kids = {}, by = {}; let root = null;
    nodes.forEach(n => { by[n.id] = n; kids[n.id] = []; });
    nodes.forEach(n => { if (n.p == null || !(n.p in by)) { if (root === null) root = n.id; } else kids[n.p].push(n.id); });
    const nw = p.nw || 46, nh = 24, gx = p.gx || 8, gy = p.gy || 46;
    if (root === null) return box;
    let leaf = 0; const X = {}, Y = {};
    (function lay(id, d) {
      Y[id] = d;
      if (!kids[id].length) { X[id] = leaf++ * (nw + gx); return; }
      kids[id].forEach(k => lay(k, d + 1));
      X[id] = (X[kids[id][0]] + X[kids[id][kids[id].length - 1]]) / 2;
    })(root, 0);
    const maxd = Math.max(...Object.values(Y));
    const W = Math.max(leaf * (nw + gx), nw) + 10, Hh = (maxd + 1) * gy + 10;
    const s = sv("svg", { class: "vg", viewBox: `-5 -5 ${W} ${Hh}`, width: W, height: Hh });
    nodes.forEach(n => { if (n.p != null && n.p in by) {
      const x1 = X[n.p] + nw / 2, y1 = Y[n.p] * gy + nh, x2 = X[n.id] + nw / 2, y2 = Y[n.id] * gy;
      sv("path", { class: "tl " + (n.ec || ""), d: `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}` }, s);
      if (n.el) { const t = sv("text", { class: "lbl", x: (x1 + x2) / 2 + 3, y: (y1 + y2) / 2, "text-anchor": "middle" }, s); t.textContent = tr(n.el); }
    }});
    nodes.forEach(n => {
      const g = sv("g", { class: "tn " + (n.c || "") }, s);
      sv("rect", { x: X[n.id], y: Y[n.id] * gy, width: nw, height: nh, rx: 7 }, g);
      const t = sv("text", { x: X[n.id] + nw / 2, y: Y[n.id] * gy + nh / 2 }, g); t.textContent = tr(n.l);
    });
    const wrap = mk("div"); wrap.style.overflowX = "auto"; wrap.style.maxWidth = "100%"; wrap.appendChild(s); box.appendChild(wrap); return box;
  };
  /* intervals on a number line: iv:[{s,e,l,c,row}], lo, hi, marks:[{x,l,c}] */
  R.iv = (p) => {
    const box = mk("div", "pn-panel" + (p.full ? " full" : "")); title(p, box);
    const iv = p.iv || [], lo = p.lo, hi = p.hi, W = p.W || 560, rowH = 26, pad = 30;
    const rows = Math.max(1, ...iv.map((x, i) => (x.row == null ? i : x.row) + 1));
    const Hh = rows * rowH + 40;
    const X = v => pad + (v - lo) / Math.max(1e-9, hi - lo) * (W - 2 * pad);
    const s = sv("svg", { class: "vg", viewBox: `0 0 ${W} ${Hh}`, width: W, height: Hh });
    const ay = rows * rowH + 12;
    sv("line", { class: "axis", x1: pad - 10, y1: ay, x2: W - pad + 10, y2: ay }, s);
    const step = p.tick || Math.max(1, Math.ceil((hi - lo) / 12));
    for (let v = lo; v <= hi; v += step) { sv("line", { class: "axis", x1: X(v), y1: ay - 3, x2: X(v), y2: ay + 3 }, s); const t = sv("text", { class: "lbl", x: X(v), y: ay + 15, "text-anchor": "middle" }, s); t.textContent = v; }
    (p.marks || []).forEach(m => { sv("line", { x1: X(m.x), y1: 0, x2: X(m.x), y2: ay, style: "stroke:var(--" + (m.c || "cur") + ");stroke-width:2;stroke-dasharray:4 3" }, s);
      if (m.l) { const t = sv("text", { class: "lbl", x: X(m.x) + 4, y: 10 }, s); t.textContent = tr(m.l); } });
    iv.forEach((x, i) => {
      const r = x.row == null ? i : x.row, y = r * rowH + 4;
      sv("rect", { class: "bar " + (x.c || ""), x: X(x.s), y, width: Math.max(4, X(x.e) - X(x.s)), height: rowH - 8, rx: 5 }, s);
      if (x.l != null) { const t = sv("text", { class: "lbl", x: X(x.s) + 5, y: y + (rowH - 8) / 2 + 1, "dominant-baseline": "central" }, s); t.textContent = tr(x.l); }
    });
    box.appendChild(s); return box;
  };
  /* bars: a:[numbers], c, p (labels under) */
  R.bars = (p) => {
    const box = mk("div", "pn-panel"); title(p, box);
    const a = p.a || [], n = a.length, bw = p.bw || 30, Hh = p.H || 120;
    const mx = Math.max(1, ...a.map(Math.abs)), hasNeg = a.some(v => v < 0);
    const zero = hasNeg ? Hh / 2 : Hh - 4, scale = (hasNeg ? Hh / 2 - 6 : Hh - 10) / mx;
    const s = sv("svg", { class: "vg", viewBox: `0 0 ${n * bw + 10} ${Hh + 34}`, width: n * bw + 10, height: Hh + 34 });
    sv("line", { class: "axis", x1: 0, y1: zero, x2: n * bw + 10, y2: zero }, s);
    a.forEach((v, i) => {
      const h = Math.abs(v) * scale, y = v >= 0 ? zero - h : zero;
      sv("rect", { class: "bar " + clsOf(p.c, i), x: 5 + i * bw + 3, y, width: bw - 6, height: Math.max(1, h), rx: 3 }, s);
      const t = sv("text", { class: "lbl", x: 5 + i * bw + bw / 2, y: v >= 0 ? y - 4 : y + h + 12, "text-anchor": "middle" }, s); t.textContent = v;
      if (p.p && p.p[i]) { const u = sv("text", { class: "lbl", x: 5 + i * bw + bw / 2, y: Hh + 28, "text-anchor": "middle", style: "fill:var(--cur);font-weight:700" }, s); u.textContent = p.p[i]; }
    });
    box.appendChild(s); return box;
  };

  let uid = 0;
  const DEFS = {};
  const VIZ = {
    L, tr, esc,
    def(id, spec) { DEFS[id] = spec; },
    /* layouts for graph nodes */
    circle(n, W, Hh, start) { const cx = W / 2, cy = Hh / 2, rad = Math.min(W, Hh) / 2 - 30, out = []; for (let i = 0; i < n; i++) { const a = (start == null ? -Math.PI / 2 : start) + 2 * Math.PI * i / n; out.push({ x: Math.round(cx + rad * Math.cos(a)), y: Math.round(cy + rad * Math.sin(a)) }); } return out; },
    /* recursion-tree recorder: add(parent, label, cls) -> id; set(id, cls); panel(title, opts) */
    Tree: class {
      constructor() { this.n = []; }
      add(p, l, c) { const id = this.n.length; this.n.push({ id, p: p == null ? null : p, l: l != null && typeof l === "object" ? l : String(l), c: c || "" }); return id; }
      set(id, c) { if (this.n[id]) this.n[id].c = c; }
      lab(id, l) { if (this.n[id]) this.n[id].l = l != null && typeof l === "object" ? l : String(l); }
      edge(id, el, ec) { if (this.n[id]) { this.n[id].el = el; this.n[id].ec = ec || ""; } }
      panel(title, o) { return Object.assign({ t: "tree", title, n: this.n.map(x => Object.assign({}, x)), full: true }, o || {}); }
    },
    /* forest layout: ids[], parentOf(id) -> id|null. Returns {pos:{id:{x,y}}, W, H} */
    forest(ids, parentOf, dx, dy) {
      dx = dx || 56; dy = dy || 66;
      const kids = {}, roots = [], set = new Set(ids);
      ids.forEach(i => kids[i] = []);
      ids.forEach(i => { const p = parentOf(i); if (p == null || !set.has(p)) roots.push(i); else kids[p].push(i); });
      let leaf = 0; const pos = {}; let maxd = 0;
      const lay = (id, d) => { maxd = Math.max(maxd, d);
        if (!kids[id].length) { pos[id] = { x: 30 + leaf++ * dx, y: 28 + d * dy }; return; }
        kids[id].forEach(k => lay(k, d + 1));
        pos[id] = { x: (pos[kids[id][0]].x + pos[kids[id][kids[id].length - 1]].x) / 2, y: 28 + d * dy }; };
      roots.forEach(r => lay(r, 0));
      return { pos, W: Math.max(120, leaf * dx + 10), H: 56 + maxd * dy + 14 };
    },
    mount(el) {
      const id = el.dataset.viz, spec = DEFS[id];
      if (!spec) { el.innerHTML = "<div class='cap'>visualizer '" + esc(id) + "' missing</div>"; return; }
      el.innerHTML = "";
      const head = mk("div", "vh");
      const vt = mk("div", "vt"); head.appendChild(vt);
      head.appendChild(mk("div", "sp"));
      const editB = mk("button", "", ""); head.appendChild(editB);
      el.appendChild(head);
      const vin = mk("div", "vin");
      const ta = mk("textarea"); ta.spellcheck = false; ta.value = spec.input.replace(/^\n/, "");
      const row = mk("div", "row");
      const runB = mk("button", "btn", ""); row.appendChild(runB);
      (spec.presets || []).forEach(pr => { const b = mk("button", "btn", ""); b.dataset.pn = JSON.stringify(pr.name); b.onclick = () => { ta.value = pr.input.replace(/^\n/, ""); run(); }; row.appendChild(b); });
      const note = mk("span", "note", ""); row.appendChild(note);
      const err = mk("div", "err", "");
      vin.appendChild(ta); vin.appendChild(row); vin.appendChild(err);
      el.appendChild(vin);
      const stage = mk("div", "stage"); el.appendChild(stage);
      const legend = mk("div", "legend"); if (spec.legend) el.appendChild(legend);
      const cap = mk("div", "cap"); el.appendChild(cap);
      const ctl = mk("div", "ctl");
      const bFirst = mk("button", "", "⏮"), bPrev = mk("button", "", "◀"), bPlay = mk("button", "play", "▶"), bNext = mk("button", "", "▶|"), bLast = mk("button", "", "⏭");
      bNext.textContent = "▶"; bPlay.textContent = "Play";
      const slider = mk("input"); slider.type = "range"; slider.min = 0; slider.value = 0;
      const cnt = mk("span", "cnt", "");
      const speed = mk("select"); [["0.5×", 1800], ["1×", 950], ["2×", 480], ["4×", 220]].forEach(([n, v], i) => { const o = mk("option", "", n); o.value = v; if (i === 1) o.selected = true; speed.appendChild(o); });
      [bFirst, bPrev, bPlay, bNext, bLast, slider, cnt, speed].forEach(x => ctl.appendChild(x));
      el.appendChild(ctl);
      let frames = [], cur = 0, timer = null;
      const texts = () => {
        vt.textContent = tr(spec.title || L("Visualization", "ภาพจำลองทีละขั้น"));
        editB.textContent = tr(L("✎ Try your own input", "✎ ลองใส่ข้อมูลเอง"));
        runB.textContent = tr(L("Run", "รัน"));
        row.querySelectorAll("[data-pn]").forEach(b => b.textContent = tr(JSON.parse(b.dataset.pn)));
        note.textContent = spec.limit ? tr(spec.limit) : "";
        bPlay.textContent = timer ? tr(L("Pause", "หยุด")) : tr(L("Play", "เล่น"));
        if (spec.legend) legend.innerHTML = spec.legend.map(([c, t]) => "<span class='" + c + "'>" + esc(tr(t)) + "</span>").join("");
      };
      const show = (i) => {
        if (!frames.length) return;
        cur = Math.max(0, Math.min(frames.length - 1, i));
        const f = frames[cur];
        stage.innerHTML = "";
        f.panels.forEach(p => { p._uid = uid++; const r = R[p.t]; if (r) { const node = r(p); if (p.full) node.classList.add("full"); stage.appendChild(node); } });
        cap.innerHTML = tr(f.cap);
        slider.max = frames.length - 1; slider.value = cur;
        cnt.textContent = (cur + 1) + " / " + frames.length;
      };
      const stop = () => { if (timer) { clearInterval(timer); timer = null; } texts(); };
      const play = () => {
        if (timer) return stop();
        if (cur >= frames.length - 1) show(0);
        timer = setInterval(() => { if (cur >= frames.length - 1) stop(); else show(cur + 1); }, +speed.value);
        texts();
      };
      function run() {
        stop(); err.textContent = "";
        const rec = recorder(spec.maxFrames || 500);
        try { spec.run(ta.value, rec); }
        catch (e) {
          if (e instanceof Stop) rec.frames.push({ cap: L("… stopped here: the input is too large for a step-by-step view. Try a smaller one.", "… หยุดตรงนี้: ข้อมูลใหญ่เกินกว่าจะดูทีละขั้น ลองข้อมูลที่เล็กลง"), panels: rec.frames[rec.frames.length - 1].panels });
          else { err.textContent = "⚠ " + e.message; if (!rec.frames.length) return; }
        }
        frames = rec.frames; show(0);
      }
      editB.onclick = () => el.classList.toggle("edit");
      runB.onclick = run;
      bFirst.onclick = () => { stop(); show(0); };
      bPrev.onclick = () => { stop(); show(cur - 1); };
      bNext.onclick = () => { stop(); show(cur + 1); };
      bLast.onclick = () => { stop(); show(frames.length - 1); };
      bPlay.onclick = play;
      slider.oninput = () => { stop(); show(+slider.value); };
      speed.onchange = () => { if (timer) { stop(); play(); } };
      document.addEventListener("langchange", () => { texts(); show(cur); });
      texts(); run();
    }
  };
  window.VIZ = VIZ;
})();
