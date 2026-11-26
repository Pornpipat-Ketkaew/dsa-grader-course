# try EVERY set of cells (at most 2^12), keep connected sets with a 1-cell and a 2-cell, take the smallest
import sys
d = list(map(int, sys.stdin.read().split())); R, C = d[0], d[1]; g = d[2:2+R*C]; N = R*C; best = None
for m in range(1, 1 << N):
    S = [i for i in range(N) if m >> i & 1]
    if any(g[i] == 3 for i in S) or not any(g[i] == 1 for i in S) or not any(g[i] == 2 for i in S): continue
    if best is not None and len(S) >= best: continue
    seen = {S[0]}; st = [S[0]]
    while st:
        u = st.pop(); r, c = divmod(u, C)
        for a, b in ((1,0),(-1,0),(0,1),(0,-1)):
            if 0 <= r+a < R and 0 <= c+b < C:
                v = (r+a)*C + c+b
                if m >> v & 1 and v not in seen: seen.add(v); st.append(v)
    if len(seen) == len(S): best = len(S)
print(best)
