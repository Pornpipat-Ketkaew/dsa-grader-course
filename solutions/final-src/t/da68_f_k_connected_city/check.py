# checker: K distinct cities that form one connected piece using only roads between chosen cities
import sys
data = open(sys.argv[1]).read().split(); n, m, k = int(data[0]), int(data[1]), int(data[2])
adj = [[] for _ in range(n + 1)]
for i in range(m):
    a, b = int(data[3 + 2 * i]), int(data[4 + 2 * i]); adj[a].append(b); adj[b].append(a)
out = list(map(int, open(sys.argv[2]).read().split()))
S = set(out)
if len(out) != k or len(S) != k or not all(1 <= x <= n for x in S): print("bad size/values", out[:20]); sys.exit(1)
st = [out[0]]; seen = {out[0]}
while st:
    u = st.pop()
    for v in adj[u]:
        if v in S and v not in seen: seen.add(v); st.append(v)
if len(seen) != k: print("not connected", out[:20]); sys.exit(1)
