#!/usr/bin/env python3
"""Build final-grader-solutions.html from p/<id>.txt + sol/<id>/* + template.html."""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))

GROUPS = [
    ("brute", "Brute force & backtracking", "ค้นหาทุกกรณี (Brute force) และ backtracking",
     "generate every candidate in order, prune the branches that cannot work", "สร้างทุกตัวเลือกตามลำดับ และตัดกิ่งที่ไม่มีทางเป็นคำตอบ"),
    ("sort", "Sorting", "การเรียงลำดับ (Sorting)",
     "sort first, then count or search; understand what a sort does step by step", "เรียงก่อนแล้วค่อยนับหรือค้นหา และเข้าใจว่าการเรียงทำอะไรทีละขั้น"),
    ("dc", "Divide & conquer", "แบ่งแยกและเอาชนะ (Divide & Conquer)",
     "binary search, fast power, problems defined by halves", "binary search, การยกกำลังแบบเร็ว, โจทย์ที่นิยามด้วยการแบ่งครึ่ง"),
    ("greedy", "Greedy", "อัลกอริทึมละโมบ (Greedy)",
     "sort by the right key, take the best choice now, prove it with an exchange argument", "เรียงตามคีย์ที่ถูก เลือกสิ่งที่ดีที่สุดตอนนี้ แล้วพิสูจน์ด้วยการสลับ (exchange argument)"),
    ("dp", "Dynamic programming", "กำหนดการพลวัต (Dynamic Programming)",
     "name the sub-problem, write the recurrence, fill the table in the right order", "ตั้งชื่อปัญหาย่อย เขียนความสัมพันธ์เวียนเกิด แล้วเติมตารางตามลำดับที่ถูก"),
    ("graph1", "Graph 1: BFS, DFS, components, cycles", "กราฟ 1: BFS, DFS, component และวงวน",
     "store the graph, walk it, count what you find", "เก็บกราฟ เดินสำรวจ แล้วนับสิ่งที่พบ"),
    ("mst", "Minimum spanning tree", "ต้นไม้แผ่กว้างน้อยสุด (MST)",
     "connect everything as cheaply (or as richly) as possible: Prim and Kruskal", "เชื่อมทุกจุดให้ถูกที่สุด (หรือได้ค่ามากสุด) ด้วย Prim และ Kruskal"),
    ("sp", "Shortest paths", "เส้นทางสั้นที่สุด (Shortest Path)",
     "Dijkstra, Bellman-Ford, Floyd-Warshall, and which one to pick", "Dijkstra, Bellman-Ford, Floyd-Warshall และควรเลือกตัวไหน"),
    ("final", "Final preparation (da66 final exam)", "เตรียมสอบปลายภาค (ข้อสอบ da66 final)",
     "the six da66_f problems: mixed techniques, exam conditions", "โจทย์ da66_f ทั้ง 6 ข้อ: เทคนิคผสมกัน สภาพเหมือนวันสอบ"),
    ("final67", "Final preparation (da67 final exam)", "เตรียมสอบปลายภาค (ข้อสอบ da67 final)",
     "the four da67_f problems: one textbook technique each, in a light story", "โจทย์ da67_f ทั้ง 4 ข้อ: ข้อละหนึ่งเทคนิคตามตำราในเรื่องเล่าบาง ๆ"),
    ("final68", "Final preparation (da68 final exam)", "เตรียมสอบปลายภาค (ข้อสอบ da68 final)",
     "the nine da68_f and da68_f2 problems: standard techniques with one twist", "โจทย์ da68_f และ da68_f2 ทั้ง 9 ข้อ: เทคนิคมาตรฐานที่บิดหนึ่งจุด"),
]

ORDER = """ex00e4 ex00e5 ex07e1_nqueen a64_q1_permu_before a65_q1_tower_defense a66_q1a_day_cover a64_q4_path_sum ex07e3_coloring
ex04m1_sort a65_q2a_huge_array a66_q2a_insertion_count
ex01e3 ex02e3_bs ex01m3 a62_q1a_recur a60_q1_matmod a64_q1_lawn_mowing a62_q1b_virus a63_q1b_virus2
ex04e1_interval a60b_mid_p1_buffet ex04e2_fknapsack
ex02e1_fibo ex02e2_cnk ex07e2_iss ex02m1_triangle ex03e1_lcs a62_q1b_chocolate a64_q2_table_no_11 a60b_q1_diagsum
a65_q0_degrees a60a_q3_component ex05m1_cycle a62_q2a_line_graph ex05m2_connection a62_q2a_pandemic a59_q3_cycle
ex06e1_cable a60a_q3_xor_road
a61_q2_farthest ex06e3_columbia a58_q3_p3a_hacking ex06e2_shortest a64_q3_shortest_start ex06m2_exchange a65_q3a_expressway
da66_f1_linear_recurrence da66_f1_map_walk da66_f1_buffet_flight da66_f1_sea_bridge da66_f2_grid_loop da66_f2_new_game_plus
da67_f_abc_permutation da67_f_border_extend da67_f_one_two_apart da67_f_travelling_tourist
da68_f_abcd_permutation da68_f_hidden_palindrome da68_f_k_connected_city da68_f_internet_provider da68_f_game_of_trades da68_f2_zero_one_subset_sum da68_f2_remaining_merge da68_f2_closed_city da68_f2_sackknap""".split()


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


def main():
    probs = []
    missing = []
    for pid in ORDER:
        path = os.path.join(HERE, "p", pid + ".txt")
        if not os.path.exists(path):
            missing.append(pid)
            continue
        meta, en, th = parse(path)
        files = []
        for f in [x.strip() for x in meta.get("files", "").split(",") if x.strip()]:
            src = open(os.path.join(HERE, f), encoding="utf-8").read()
            files.append({"name": os.path.basename(f), "src": src})
        for body in (en, th):
            if "{{code}}" not in body:
                print("WARN no {{code}} in", pid, file=sys.stderr)
        probs.append({
            "id": pid,
            "group": meta["group"],
            "lesson": meta.get("lesson", ""),
            "stars": int(meta.get("stars", "1")),
            "complexity": meta.get("complexity", ""),
            "kind": meta.get("kind", "program"),
            "tags": [t.strip() for t in meta.get("tags", "").split(",") if t.strip()],
            "title": {"en": meta["title"], "th": meta.get("title_th", meta["title"])},
            "blurb": {"en": meta.get("blurb", ""), "th": meta.get("blurb_th", meta.get("blurb", ""))},
            "tests": {"en": meta.get("tests", ""), "th": meta.get("tests_th", meta.get("tests", ""))} if meta.get("tests") else None,
            "files": files,
            "body": {"en": en, "th": th},
        })
    groups = []
    for g, a, b, c, d in GROUPS:
        cp = os.path.join(HERE, "c", g + ".txt")
        intro = None
        if os.path.exists(cp):
            _, ien, ith = parse(cp)
            intro = {"en": ien, "th": ith}
        else:
            missing.append("c/" + g)
        groups.append({"id": g, "title": {"en": a, "th": b}, "sub": {"en": c, "th": d}, "intro": intro})
    data = {
        "groups": groups,
        "problems": probs,
    }
    intro_p = os.path.join(HERE, "intro.txt")
    if os.path.exists(intro_p):
        _, en, th = parse(intro_p)
        data["intro"] = {"en": en, "th": th}
    js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    tpl = open(os.path.join(HERE, "template.html"), encoding="utf-8").read()
    out = tpl.replace("/*__DATA__*/", js)
    dst = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "final-grader-solutions.html")
    open(dst, "w", encoding="utf-8").write(out)
    print("built", dst, "problems:", len(probs), "missing:", len(missing), " ".join(missing))


if __name__ == "__main__":
    main()
