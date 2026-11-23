# water cell becomes 2 if some land cell is within Manhattan... no: BFS through any cells = grid distance = Manhattan
R, C, k = map(int, input().split()); g = [list(map(int, input().split())) for _ in range(R)]
L = [(r, c) for r in range(R) for c in range(C) if g[r][c] == 1]
for r in range(R):
    print(*[1 if g[r][c] == 1 else (2 if any(abs(r - a) + abs(c - b) <= k for a, b in L) else 0) for c in range(C)])
