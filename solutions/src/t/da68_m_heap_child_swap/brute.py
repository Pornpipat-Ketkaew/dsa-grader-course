# Simulate CP::priority_queue::push (fixUp with std::less, equal values move up),
# then swap the two subtrees of node k using a nested tree, and print level order.
import sys
d = sys.stdin.read().split(); p = 0
def rd():
    global p; p += 1; return int(d[p - 1])
for _ in range(rd()):
    n = rd(); h = []
    for _ in range(n):
        x = rd(); h.append(x); i = len(h) - 1
        while i > 0:
            par = (i - 1) // 2
            if x < h[par]: break
            h[i] = h[par]; i = par
        h[i] = x
    k = rd()
    print("Before Swap:"); print(*h); 
    def build(i):
        if i >= n: return None
        l, r = build(2 * i + 1), build(2 * i + 2)
        if i == k: l, r = r, l
        return (h[i], l, r)
    out, q = [], [build(0)]
    while q:
        nq = []
        for t in q:
            out.append(t[0])
            if t[1]: nq += [t[1], t[2]]
        q = nq
    print("After Swap:"); print(*out); print("----------------")
