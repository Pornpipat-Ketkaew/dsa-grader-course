# simulate day by day exactly as the statement describes (stop early once nothing changes)
import sys
d = list(map(int, sys.stdin.read().split())); R, C, T = d[0], d[1], d[2]; g = [d[3+r*C:3+(r+1)*C] for r in range(R)]
for _ in range(T):
    ng = [row[:] for row in g]
    for r in range(R):
        for c in range(C):
            if g[r][c] == 0 and any(0 <= r+a < R and 0 <= c+b < C and g[r+a][c+b] == 1 for a, b in ((1,0),(-1,0),(0,1),(0,-1))): ng[r][c] = 1
    if ng == g: break
    g = ng
print(sum(row.count(1) for row in g))
