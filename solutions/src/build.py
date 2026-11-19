#!/usr/bin/env python3
"""Build grader-solutions.html from p/<id>.txt + sol/<id>/* + template.html."""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))

GROUPS = [
    ("vector", "Vectors (CP::vector & std::vector)", "เวกเตอร์ (CP::vector และ std::vector)",
     "mData / mSize / mCap, shifting, compaction, reallocation", "mData / mSize / mCap การเลื่อนข้อมูล การบีบอัด การจองหน่วยความจำใหม่"),
    ("search", "Searching, hashing & counting", "การค้นหา แฮช และการนับ",
     "sort + binary search, prefix sums, map / set, counting arrays", "sort + binary search, prefix sum, map / set, อาร์เรย์นับ"),
    ("stl", "Nested STL containers", "คอนเทนเนอร์ STL ซ้อนกัน",
     "what each container lets you read and change", "คอนเทนเนอร์แต่ละแบบให้อ่านและแก้อะไรได้บ้าง"),
    ("stackqueue", "Stacks & queues", "สแตกและคิว",
     "top = mData[mSize-1]; circular queue (mFront + i) % mCap", "top = mData[mSize-1]; คิววงกลม (mFront + i) % mCap"),
    ("heap", "Heaps, priority queues & comparators", "ฮีป คิวลำดับความสำคัญ และตัวเปรียบเทียบ",
     "array heap, fixUp / fixDown, mLess direction", "ฮีปในอาร์เรย์ fixUp / fixDown และทิศทางของ mLess"),
    ("list", "Linked lists", "ลิงก์ลิสต์",
     "doubly linked list with a header sentinel, pointer surgery", "ลิสต์สองทางที่มีโหนด header การต่อ/ตัดพอยน์เตอร์"),
    ("tree", "Trees & BSTs", "ต้นไม้และ BST",
     "recursion on nodes, map_bst with parent pointers", "การเวียนเกิดบนโหนด map_bst ที่มีพอยน์เตอร์ parent"),
    ("algo", "Recursion, graphs & algorithms", "การเวียนเกิด กราฟ และอัลกอริทึม",
     "backtracking, BFS, greedy, simulation", "backtracking, BFS, greedy, การจำลอง"),
    ("s68", "Structure 68 (midterm mock exam)", "Structure 68 (ข้อสอบจำลองกลางภาค)",
     "the four problems of the 69_DS mock exam: BST, simulation, circular queue, segment list", "โจทย์ 4 ข้อของข้อสอบจำลอง 69_DS: BST, การจำลอง, คิววงกลม, ลิสต์แบบ segment"),
]

ORDER = """ds00_reverse2 d63_q1a_multi_insert d63_q1b_interval_count d62_q1b_grandfather ex00e3 d63_q2a_pair_gte
d58_q1_erase_many d59_q1_range_insert d63_q2b_vector_compress d60_q1_v_uniq d61_q1_ordered_set d62_q2b_vector_insert_many
d63_q1a_hiatus d65_q1c_ice_cream d64_q2a_vector_block_swap d62_q2b_stack_deep_push d65_q2a_mitosis d63_q3a_queue_m2b
d65_q3b_queue_total_reverse d62_q3b_queue_m2f d60_q1_qat d64_q3b_queue_reverse d62_q1a_vote d58_q2_custom d64_q3a_heap_kth
ds03_heap_erase d62_q3a_heap_descendant d63_q3a_rank_in_heap d58_q3_list_replace d61_q2_splitlist d57_q3_zuma ds04_playlist
d57_q3_shift d64_q4a_list_merge d60_q3_same_tree d63_q4a_leaves_count d64_q4a_subtree d58_q3_unary d59_q3_bst_split
a64_q1_permu_before ex00e4 ex00e5 a66_q1a_day_cover da66_f1_map_walk a66_q2a_insertion_count a65_q2a_huge_array
da66_m1_queue_remove_many da66_m1_heap_before_node da66_m1_tree_leaves_depth da66_m1_line_monopoly da66_m2_change_data
da66_m2_furthest_distance da67_m2_dungeon da67_m2_queue_insert_shuffle da67_m2_list_zigzag da67_m2_bst_parity_score
da68_m2_ordered_heap_reconstruction da68_m_heap_child_swap
69_DS1 69_DS2 69_DS3 69_DS4""".split()


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
            "kind": meta.get("kind", "program"),
            "tags": [t.strip() for t in meta.get("tags", "").split(",") if t.strip()],
            "title": {"en": meta["title"], "th": meta.get("title_th", meta["title"])},
            "blurb": {"en": meta.get("blurb", ""), "th": meta.get("blurb_th", meta.get("blurb", ""))},
            "tests": {"en": meta.get("tests", ""), "th": meta.get("tests_th", meta.get("tests", ""))} if meta.get("tests") else None,
            "files": files,
            "body": {"en": en, "th": th},
        })
    data = {
        "groups": [{"id": g, "title": {"en": a, "th": b}, "sub": {"en": c, "th": d}} for g, a, b, c, d in GROUPS],
        "problems": probs,
    }
    intro_p = os.path.join(HERE, "intro.txt")
    if os.path.exists(intro_p):
        _, en, th = parse(intro_p)
        data["intro"] = {"en": en, "th": th}
    js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    tpl = open(os.path.join(HERE, "template.html"), encoding="utf-8").read()
    out = tpl.replace("/*__DATA__*/", js)
    dst = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "grader-solutions.html")
    open(dst, "w", encoding="utf-8").write(out)
    print("built", dst, "problems:", len(probs), "missing:", len(missing), " ".join(missing))


if __name__ == "__main__":
    main()
