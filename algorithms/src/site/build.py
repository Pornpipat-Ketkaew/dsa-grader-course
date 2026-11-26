#!/usr/bin/env python3
"""Build the 'Algorithm Grader: How & Solution' static site into out/algorithms/.

p/<id>.md     meta header, then '==== en' and '==== th' markdown bodies
sol/<id>/*    the exact, tested solution files shown on the page
viz/<id>.js   step-by-step concept visualizer(s) for the page
c/<ch>.md     chapter primer (bilingual), home.md the home page text
"""
import html, json, os, re, shutil, sys
import markdown
from pygments.lexers import CppLexer
from pygments.token import STANDARD_TYPES

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out", "algorithms")

CHAPTERS = [
    # num, slug, EN title, TH title, colour, EN sub, TH sub, problem ids (easier -> harder)
    ("08", "bsearch", "Binary search & prefix sums", "Binary search และผลรวมสะสม", "#0f766e",
     "Precompute running totals, keep things sorted, and find any boundary in O(log n).", "คำนวณผลรวมสะสมไว้ก่อน เก็บข้อมูลให้เรียง แล้วหารอยต่อใด ๆ ได้ใน O(log n)",
     "ex01e3 ex02e3_bs d63_q1b_interval_count d63_q1a_hiatus da68_m_count_value a65_q2a_huge_array da67_m_chocolate_truffle a64_q1_lawn_mowing d65_q1c_ice_cream ex01m3"),
    ("09", "sorting", "Sorting, hashing & counting", "การเรียง แฮช และการนับ", "#0e9f8e",
     "Sort, count or hash first; then the question becomes easy.", "เรียง นับ หรือแฮชก่อน แล้วคำถามจะง่ายขึ้นทันที",
     "ex00e3 d62_q1a_vote d62_q1b_grandfather d61_q1_ordered_set a66_q2a_insertion_count ex04m1_sort"),
    ("10", "sweep", "Sweep, two pointers & Kadane", "Sweep line, two pointers และ Kadane", "#2f7fd8",
     "Walk the data once, keeping a small summary of what you have seen.", "เดินผ่านข้อมูลรอบเดียว พร้อมเก็บสรุปสั้น ๆ ของสิ่งที่ผ่านมา",
     "a60b_q1_diagsum da68_m2_interesting_events d57_q3_zuma da66_m1_line_monopoly"),
    ("11", "backtracking", "Recursion & backtracking", "Recursion และ Backtracking", "#8b46d9",
     "Build the answer one choice at a time; undo the choice; prune dead branches.", "สร้างคำตอบทีละตัวเลือก ย้อนกลับเมื่อเสร็จ และตัดกิ่งที่ไปต่อไม่ได้",
     "ex00e4 ex00e5 da67_f_abc_permutation da68_f_abcd_permutation da66_f1_map_walk ex07e1_nqueen a64_q1_permu_before a65_q1_tower_defense a66_q1a_day_cover ex07e3_coloring a64_q4_path_sum"),
    ("12", "dc", "Divide & conquer", "แบ่งแยกและเอาชนะ (Divide & Conquer)", "#c2410c",
     "Split into halves, solve each half the same way, combine.", "แบ่งเป็นครึ่ง แก้แต่ละครึ่งด้วยวิธีเดิม แล้วรวมผล",
     "a62_q1a_recur a60_q1_matmod a62_q1b_virus a63_q1b_virus2 da68_f2_remaining_merge"),
    ("13", "greedy", "Greedy", "อัลกอริทึมละโมบ (Greedy)", "#d97706",
     "Sort by the right key, commit to the locally best choice, prove it by exchange.", "เรียงตามคีย์ที่ถูก เลือกสิ่งที่ดีที่สุดตอนนี้ และพิสูจน์ด้วยการสลับ",
     "ex04e1_interval a58_m_p4 ex04e2_fknapsack a60b_mid_p1_buffet da67_m2_dungeon da68_f_game_of_trades"),
    ("14", "dp1", "Dynamic programming I", "กำหนดการพลวัต (DP) ภาค 1", "#db2777",
     "Name the sub-problem, write the recurrence, fill the table in dependency order.", "ตั้งชื่อปัญหาย่อย เขียนความสัมพันธ์เวียนเกิด แล้วเติมตารางตามลำดับที่ถูก",
     "ex02e1_fibo ex02e2_cnk ex02m1_triangle da66_f1_linear_recurrence a62_q1b_chocolate ex07e2_iss ex03e1_lcs da68_f_hidden_palindrome da68_f2_zero_one_subset_sum da68_f2_sackknap"),
    ("15", "dp2", "Dynamic programming II: states", "DP ภาค 2: การออกแบบสถานะ", "#be185d",
     "When the past matters, add exactly the part of the past that matters to the state.", "เมื่ออดีตมีผล ให้ใส่เฉพาะส่วนของอดีตที่มีผลลงในสถานะ",
     "a64_q2_table_no_11 da67_f_one_two_apart da66_f2_new_game_plus da67_f_travelling_tourist"),
    ("16", "graphs", "Graphs: BFS & DFS", "กราฟ: BFS และ DFS", "#1f9d55",
     "Store the graph, walk it level by level or branch by branch, count what you meet.", "เก็บกราฟ เดินทีละชั้นหรือทีละกิ่ง แล้วนับสิ่งที่พบ",
     "d57_q1_dense d57_q1_sparse a65_q0_degrees a60a_q3_component da68_f_k_connected_city ex05m1_cycle a62_q2a_line_graph ex05m2_connection a59_q3_cycle a62_q2a_pandemic da67_f_border_extend da66_f1_sea_bridge da66_f2_grid_loop"),
    ("17", "sp", "Shortest paths", "เส้นทางสั้นที่สุด", "#3d5afe",
     "Relax edges in a clever order: Dijkstra, Bellman-Ford, Floyd-Warshall.", "ผ่อนคลายเส้นเชื่อม (relax) ตามลำดับที่ฉลาด: Dijkstra, Bellman-Ford, Floyd-Warshall",
     "a61_q2_farthest da66_f1_buffet_flight ex06e3_columbia a58_q3_p3a_hacking da68_f2_closed_city a64_q3_shortest_start ex06e2_shortest ex06m2_exchange a65_q3a_expressway"),
    ("18", "mst", "Minimum spanning tree & DSU", "ต้นไม้แผ่ทั่วน้อยสุด (MST) และ DSU", "#0891b2",
     "Connect everything with the cheapest (or richest) set of edges: Prim and Kruskal.", "เชื่อมทุกจุดด้วยชุดเส้นที่ถูกที่สุด (หรือมากที่สุด) ด้วย Prim และ Kruskal",
     "ex06e1_cable a60a_q3_xor_road da68_f_internet_provider"),
    ("19", "mock", "Mock exam 69", "ข้อสอบเสมือนจริง 69", "#475569",
     "Five fresh problems, each one textbook technique with a twist.", "โจทย์ใหม่ 5 ข้อ ข้อละหนึ่งเทคนิคตามตำราที่บิดหนึ่งจุด",
     "69_AGWARM 69_AG1 69_AG2 69_AG3 69_AG4"),
]

SITE_EN = "Algorithm Grader · How & Solution"
SITE_TH = "อัลกอริทึม · วิธีคิดและโค้ดเฉลย"

# ---------------------------------------------------------------- helpers
def parse(path):
    txt = open(path, encoding="utf-8").read()
    head, _, rest = txt.partition("\n==== en\n")
    en, _, th = rest.partition("\n==== th\n")
    meta = {}
    for line in head.splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip()
    return meta, en.strip("\n"), th.strip("\n")

E = html.escape

def hl_lines(src):
    """C++ -> list of html lines with pygments token classes (tokens split at newlines)."""
    lines, cur = [], []
    for ttype, value in CppLexer().get_tokens(src):
        t = ttype
        while t not in STANDARD_TYPES and t.parent is not None:
            t = t.parent
        cls = STANDARD_TYPES.get(t, "")
        parts = value.split("\n")
        for i, part in enumerate(parts):
            if i > 0:
                lines.append("".join(cur)); cur = []
            if part:
                cur.append(f'<span class="{cls}">{E(part)}</span>' if cls else E(part))
    if cur:
        lines.append("".join(cur))
    while lines and lines[-1] == "":
        lines.pop()
    return lines

CODE_ID = [0]
def codebox(name, src, download=None):
    CODE_ID[0] += 1
    cid = f"code{CODE_ID[0]}"
    body = "".join(f'<span class="ln">{l}</span>' for l in hl_lines(src))
    dl = f'<a href="{download}" download>⬇ .cpp</a>' if download else ""
    return (f'<div class="codebox"><div class="cbar"><span>{E(name)}</span><span class="sp"></span>{dl}'
            f'<button data-copy="{cid}">Copy</button></div>'
            f'<pre class="hl"><code id="{cid}" hidden>{E(src)}</code>{body}</pre></div>')

def md(text, ctx):
    """markdown with: ```cpp / ```diagram fences, :::kind Title boxes, {{code}}, {{viz}}, {{viz:name}}."""
    holes = []
    def hole(h):
        holes.append(h)
        return f"\n\nHOLE{len(holes) - 1}END\n\n"
    def fence(m):
        lang, body = m.group(1).strip(), m.group(2)
        if lang in ("cpp", "c++"):
            return hole('<pre class="snip hl">' + "\n".join(hl_lines(body)) + "</pre>")
        return hole(f'<pre class="diagram">{E(body)}</pre>')
    text = re.sub(r"^```([^\n]*)\n(.*?)\n```[ \t]*$", fence, text, flags=re.S | re.M)
    text = re.sub(r"\{\{code\}\}", lambda m: hole(ctx["code"]), text)
    text = re.sub(r"\{\{viz(?::([\w-]+))?\}\}", lambda m: hole(
        f'<div class="viz" data-viz="{ctx["id"] + (":" + m.group(1) if m.group(1) else "")}"></div>'), text)
    text = re.sub(r"\{\{tested\}\}", lambda m: hole(ctx.get("tested", "")), text)
    # callout boxes
    out, stack = [], []
    for line in text.split("\n"):
        m = re.match(r"^:::(\w+)\s*(.*)$", line)
        if m:
            kind, ttl = m.group(1), m.group(2)
            out.append(f'\n<div class="box {kind}" markdown="1">\n<div class="bt">{E(ttl)}</div>\n')
            stack.append(kind)
        elif line.strip() == ":::" and stack:
            stack.pop(); out.append("\n</div>\n")
        else:
            out.append(line)
    text = "\n".join(out)
    h = markdown.markdown(text, extensions=["tables", "attr_list", "md_in_html", "sane_lists"])
    h = re.sub(r"<p>HOLE(\d+)END</p>", lambda m: holes[int(m.group(1))], h)
    h = re.sub(r"HOLE(\d+)END", lambda m: holes[int(m.group(1))], h)
    # numbered h2 sections with anchors
    n = [0]
    def h2(m):
        n[0] += 1
        inner = m.group(1)
        slug = ctx["lang"] + "-s" + str(n[0])
        ctx.setdefault("toc_" + ctx["lang"], []).append((slug, re.sub("<[^>]+>", "", inner)))
        return f'<h2 id="{slug}"><span class="sn">{n[0]}</span>{inner}</h2>'
    h = re.sub(r"<h2>(.*?)</h2>", h2, h)
    return h

def both(en, th, tag="span"):
    return f'<{tag} class="en">{en}</{tag}><{tag} class="th">{th}</{tag}>'

# ---------------------------------------------------------------- page shell
def shell(title, body, side, color="#3d5afe", scripts=()):
    sc = "".join(f'<script src="{s}"></script>' for s in scripts)
    return f"""<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title>
<link rel="stylesheet" href="assets/site.css">
<script>(function(){{try{{var l=localStorage.getItem('alg-lang'),t=localStorage.getItem('alg-theme');var h=document.documentElement;if(l)h.dataset.lang=l;h.dataset.theme=t||((window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');}}catch(e){{}}}})();</script>
<style>:root{{--chc:{color}}}</style>
</head>
<body>
<header class="top">
  <button id="menuBtn" aria-label="menu">☰</button>
  <a class="brand" href="index.html"><span class="logo">A</span><span>{both(E(SITE_EN), E(SITE_TH))}</span></a>
  <span class="sp"></span>
  <a class="btn" href="../index.html">{both("Course home", "หน้าหลักคอร์ส")}</a>
  <span class="seg"><button data-setlang="en">EN</button><button data-setlang="th">ไทย</button></span>
  <button id="themeBtn" title="dark / light">◐</button>
</header>
<div class="wrap">
<nav class="side">{side}</nav>
<main><div class="page">
{body}
</div></main>
</div>
<script src="assets/site.js"></script>{sc}
</body>
</html>
"""

def sidebar(probs, current=None):
    s = ['<input id="search" class="search" placeholder="Search problems… / ค้นหา…">',
         f'<ul><li><a href="index.html" class="{"on" if current == "home" else ""}">{both("🏠 Home", "🏠 หน้าแรก")}</a></li></ul>']
    for ch in CHAPTERS:
        num, slug, en, th, col = ch[:5]
        s.append(f'<h4 style="--chc:{col}"><span class="num">{num}</span><a href="ch{num}.html" class="{"on" if current == "ch" + num else ""}">{both(E(en), E(th))}</a></h4><ul>')
        for pid in ch[7].split():
            p = probs.get(pid)
            if not p:
                continue
            on = "on" if current == pid else ""
            s.append(f'<li><a class="{on}" href="{pid}.html"><span class="pid">{pid}</span></a></li>')
        s.append("</ul>")
    return "\n".join(s)

def stars(n):
    return "★" * n + "☆" * (3 - n)

# ---------------------------------------------------------------- build
def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, "code"))
    shutil.copytree(os.path.join(HERE, "assets"), os.path.join(OUT, "assets"))
    os.makedirs(os.path.join(OUT, "viz"))

    probs, missing, order = {}, [], []
    for ch in CHAPTERS:
        for pid in ch[7].split():
            order.append((pid, ch))
            path = os.path.join(HERE, "p", pid + ".md")
            if not os.path.exists(path):
                missing.append(pid); continue
            meta, en, th = parse(path)
            probs[pid] = dict(meta=meta, en=en, th=th, ch=ch)
    order = [(pid, ch) for pid, ch in order if pid in probs]

    warnings = []
    for idx, (pid, ch) in enumerate(order):
        P = probs[pid]; meta = P["meta"]
        num, slug, cen, cth, col = ch[:5]
        files = [f.strip() for f in meta.get("files", f"sol/{pid}/main.cpp").split(",") if f.strip()]
        code_html = []
        for f in files:
            src = open(os.path.join(HERE, f), encoding="utf-8").read()
            dl = f"code/{pid}__{os.path.basename(f)}"
            shutil.copy(os.path.join(HERE, f), os.path.join(OUT, dl))
            code_html.append(codebox(os.path.basename(f), src, dl))
            if re.search(r"\b(printf|scanf)\s*\(", src):
                warnings.append(f"{pid}: printf/scanf in {f}")
        tested = ""
        if meta.get("tests"):
            tested = ('<div class="tested"><span>✅</span><div>' +
                      both("<b>Tested.</b> " + E(meta["tests"]), "<b>ทดสอบแล้ว</b> " + E(meta.get("tests_th", meta["tests"])), "span") +
                      "</div></div>")
        bodies = {}
        ctx = {"id": pid, "code": "".join(code_html), "tested": tested}
        for lang in ("en", "th"):
            ctx["lang"] = lang
            bodies[lang] = md(P[lang], ctx)
            for k in ("{{", "}}", ":::", "```", "HOLE"):
                if k in bodies[lang]:
                    warnings.append(f"{pid}/{lang}: leftover {k}")
            if 'data-viz' not in bodies[lang] and os.path.exists(os.path.join(HERE, "viz", pid + ".js")):
                warnings.append(f"{pid}/{lang}: viz file but no {{{{viz}}}}")
        vizjs = os.path.join(HERE, "viz", pid + ".js")
        scripts = []
        if os.path.exists(vizjs):
            shutil.copy(vizjs, os.path.join(OUT, "viz", pid + ".js")); scripts.append(f"viz/{pid}.js")
        else:
            warnings.append(f"{pid}: no visualizer")
        tags_en = [t.strip() for t in meta.get("tech", "").split(",") if t.strip()]
        tags_th = [t.strip() for t in meta.get("tech_th", meta.get("tech", "")).split(",") if t.strip()]
        chips = ('<div class="chips">' + "".join(f'<span class="chip t en">{E(t)}</span>' for t in tags_en) +
                 "".join(f'<span class="chip t th">{E(t)}</span>' for t in tags_th) +
                 (f'<span class="chip cx">{E(meta["complexity"])}</span>' if meta.get("complexity") else "") +
                 f'<span class="chip"><span class="stars">{stars(int(meta.get("stars", "1")))}</span></span></div>')
        toc = lambda lang: '<div class="toc ' + lang + '">' + "".join(f'<a href="#{s}">{n + 1}. {E(t)}</a>' for n, (s, t) in enumerate(ctx.get("toc_" + lang, []))) + "</div>"
        pdf = meta.get("pdf", f"C:\\dataAlgoGraderProblems\\{pid}\\problem.pdf")
        prev_ = order[idx - 1][0] if idx > 0 else None
        next_ = order[idx + 1][0] if idx + 1 < len(order) else None
        def pn_link(q, cls, en, th):
            if not q: return "<span style='flex:1'></span>"
            t = probs[q]["meta"]
            return f'<a class="{cls}" href="{q}.html"><small>{both(en, th)}</small><b>{q}</b> · {both(E(t["title"]), E(t.get("title_th", t["title"])))}</a>'
        body = f"""
<div class="crumb"><a href="index.html">{both("Home", "หน้าแรก")}</a> › <a href="ch{num}.html">{num} · {both(E(cen), E(cth))}</a></div>
<div class="phead">
<div class="pidbig">{pid}</div>
<h1>{both(E(meta["title"]), E(meta.get("title_th", meta["title"])))}</h1>
{chips}
<div class="lead">{both(E(meta.get("key", "")), E(meta.get("key_th", meta.get("key", ""))), "p")}</div>
<div class="pdfnote">{both("📄 Statement: read the PDF", "📄 โจทย์: อ่านจาก PDF")} <code>{E(pdf)}</code></div>
{toc("en")}{toc("th")}
</div>
<div class="md en">{bodies["en"]}</div>
<div class="md th">{bodies["th"]}</div>
<div class="pn">{pn_link(prev_, "pv", "← previous", "← ข้อก่อนหน้า")}{pn_link(next_, "nx", "next →", "ข้อถัดไป →")}</div>
"""
        title = f'{pid} · {meta["title"]}'
        open(os.path.join(OUT, pid + ".html"), "w", encoding="utf-8").write(
            shell(title, body, sidebar(probs, pid), col, scripts))

    # chapter pages
    for ch in CHAPTERS:
        num, slug, en, th, col, sen, sth, ids = ch
        cp = os.path.join(HERE, "c", num + ".md")
        intro_en = intro_th = ""
        scripts = []
        if os.path.exists(cp):
            _, ien, ith = parse(cp)
            ctx = {"id": "ch" + num, "code": ""}
            ctx["lang"] = "en"; intro_en = md(ien, ctx)
            ctx["lang"] = "th"; intro_th = md(ith, ctx)
            vz = os.path.join(HERE, "viz", "ch" + num + ".js")
            if os.path.exists(vz):
                shutil.copy(vz, os.path.join(OUT, "viz", "ch" + num + ".js")); scripts.append(f"viz/ch{num}.js")
        else:
            warnings.append(f"chapter {num}: no primer")
        items = []
        for pid in ids.split():
            if pid not in probs: continue
            m = probs[pid]["meta"]
            items.append(f'<a href="{pid}.html"><span class="pid">{pid}</span><span class="pt">{both(E(m["title"]), E(m.get("title_th", m["title"])))}</span>'
                         f'<span class="stars">{stars(int(m.get("stars", "1")))}</span>'
                         f'<span class="pk">{both(E(m.get("key", "")), E(m.get("key_th", m.get("key", ""))))}</span></a>')
        body = f"""
<div class="crumb"><a href="index.html">{both("Home", "หน้าแรก")}</a> › {num}</div>
<div class="pidbig phead"><span class="pidbig">{both("Chapter", "บทที่")} {num}</span></div>
<h1>{both(E(en), E(th))}</h1>
{both(E(sen), E(sth), "p")}
<h2><span class="sn">★</span>{both("Problems in this chapter", "โจทย์ในบทนี้")}</h2>
<div class="plist">{"".join(items)}</div>
<div class="md en">{intro_en}</div><div class="md th">{intro_th}</div>
"""
        open(os.path.join(OUT, f"ch{num}.html"), "w", encoding="utf-8").write(
            shell(f"{num} · {en}", body, sidebar(probs, "ch" + num), col, scripts))

    # home
    cards = []
    for ch in CHAPTERS:
        num, slug, en, th, col, sen, sth, ids = ch
        n = len([p for p in ids.split() if p in probs])
        cards.append(f'<a class="card" style="--chc:{col}" href="ch{num}.html"><div class="cn">{num}</div><h3>{both(E(en), E(th))}</h3>'
                     f'<p>{both(E(sen), E(sth))}</p><div class="cnt">{n} {both("problems", "ข้อ")}</div></a>')
    hm = os.path.join(HERE, "home.md")
    home_en = home_th = ""
    if os.path.exists(hm):
        _, hen, hth = parse(hm)
        ctx = {"id": "home", "code": ""}
        ctx["lang"] = "en"; home_en = md(hen, ctx)
        ctx["lang"] = "th"; home_th = md(hth, ctx)
    total = len(probs)
    body = f"""
<div class="hero">
<h1>{both("How &amp; Solution", "วิธีคิด &amp; โค้ดเฉลย")}</h1>
{both(f"Every algorithm problem of the grader course, chapters 08 to 19 ({total} problems). Each page explains <b>which technique</b> solves it and <b>exactly how</b> it maps onto the problem, with step-by-step concept visualizations, then gives an optimal, tested C++ solution.",
      f"โจทย์อัลกอริทึมทุกข้อของคอร์ส บทที่ 08 ถึง 19 (ทั้งหมด {total} ข้อ) แต่ละหน้าอธิบายว่า<b>ใช้เทคนิคอะไร</b> และ<b>นำมาใช้กับโจทย์อย่างไร</b>อย่างละเอียด พร้อมภาพจำลองแนวคิดทีละขั้น และโค้ด C++ ที่เหมาะสมที่สุดซึ่งผ่านการทดสอบแล้ว", "p")}
</div>
<div class="cards">{"".join(cards)}</div>
<div class="md en">{home_en}</div><div class="md th">{home_th}</div>
"""
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(
        shell(SITE_EN, body.replace('class="en">', 'class="en">', 1), sidebar(probs, "home")))
    print(f"built {OUT}: {len(probs)} problems; missing {len(missing)}: {' '.join(missing)}")
    for w in warnings:
        print("WARN", w)

if __name__ == "__main__":
    main()
