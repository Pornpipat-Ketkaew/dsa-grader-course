# Independent check: for small trees try every subset of internal nodes, apply the
# swaps on a nested tree (by node identity) and keep the subset that makes the
# level order strictly decreasing. For bigger trees, compare each node's two
# children top-down after applying swaps recursively (simulation, not the formula).
import sys, itertools
d = sys.stdin.read().split(); n = int(d[0]); v = list(map(int, d[1:1 + n]))
inner = [i for i in range(n) if 2 * i + 2 < n]
def level_order(S):
    def build(i):
        if i >= n: return None
        l, r = build(2 * i + 1), build(2 * i + 2)
        if i in S: l, r = r, l
        return (v[i], l, r)
    out, q = [], [build(0)]
    while q:
        nq = []
        for x in q:
            out.append(x[0])
            if x[1]: nq += [x[1], x[2]]
        q = nq
    return out
if len(inner) <= 7:
    ans = None
    for m in range(1 << len(inner)):
        S = {inner[j] for j in range(len(inner)) if m >> j & 1}
        o = level_order(S)
        if all(o[k] > o[k + 1] for k in range(n - 1)): ans = sorted(S); break
else:
    # greedy over the sorted target: the subtree rooted at i must hold, level by level,
    # the largest remaining values on its left side.
    target = sorted(v, reverse=True)
    pos = {x: i for i, x in enumerate(target)}
    def leftmost(i):
        while 2 * i + 1 < n: i = 2 * i + 1
        return i
    ans = sorted(i for i in inner if pos[v[2 * i + 1]] > pos[v[2 * i + 2]])
    assert all(level_order(set(ans))[k] == target[k] for k in range(n))
print(*ans if ans else ["None"])
