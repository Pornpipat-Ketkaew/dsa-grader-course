# Bellman-Ford style: keep relaxing every cell from its neighbours until nothing changes
import sys
d = list(map(int, sys.stdin.read().split())); R, C = d[0], d[1]; f = [d[2+r*C:2+(r+1)*C] for r in range(R)]
INF = float('inf'); D = [[INF]*C for _ in range(R)]; D[0][0] = 0; ch = True
while ch:
    ch = False
    for r in range(R):
        for c in range(C):
            for a, b in ((1,0),(-1,0),(0,1),(0,-1)):
                if 0 <= r+a < R and 0 <= c+b < C and D[r+a][c+b] + f[r][c] < D[r][c]: D[r][c] = D[r+a][c+b] + f[r][c]; ch = True
for row in D: print(*row)
