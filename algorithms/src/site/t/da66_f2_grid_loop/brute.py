# build the graph of mutual connections, then for every component check "all degrees == 2"
import sys
d = list(map(int, sys.stdin.read().split())); R, C = d[0], d[1]; g = [d[2+r*C:2+(r+1)*C] for r in range(R)]
OPEN = {1: 'LR', 2: 'UD', 3: 'UR', 4: 'RD', 5: 'DL', 6: 'LU'}
MV = {'U': (-1, 0, 'D'), 'D': (1, 0, 'U'), 'L': (0, -1, 'R'), 'R': (0, 1, 'L')}
adj = {(r, c): [] for r in range(R) for c in range(C)}
for r in range(R):
    for c in range(C):
        for s in OPEN[g[r][c]]:
            a, b, back = MV[s]
            if 0 <= r+a < R and 0 <= c+b < C and back in OPEN[g[r+a][c+b]]: adj[(r, c)].append((r+a, c+b))
seen = set(); loops = []
for v in adj:
    if v in seen: continue
    comp = [v]; seen.add(v); i = 0
    while i < len(comp):
        for w in adj[comp[i]]:
            if w not in seen: seen.add(w); comp.append(w)
        i += 1
    if all(len(adj[x]) == 2 for x in comp): loops.append(len(comp))
print(f"{len(loops)} {max(loops)}" if loops else 0)
