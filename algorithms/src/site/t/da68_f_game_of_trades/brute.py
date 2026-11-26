# buy unit by unit: try every way to buy up to K units (DFS over sellers), each unit sold at its best allowed buyer
N, M, K = map(int, input().split())
X = [list(map(int, input().split())) for _ in range(N)]
Y = [list(map(int, input().split())) for _ in range(N)]
Z = [list(map(int, input().split())) for _ in range(N)]
cells = [(i, j) for i in range(N) for j in range(M)]
best = 0
def go(idx, left, profit):
    global best
    best = max(best, profit)
    if idx == len(cells) or left == 0: return
    i, j = cells[idx]
    sell = max([Y[o][j] for o in range(N) if o != i], default=None)
    for q in range(0, Z[i][j] + 1):
        if q > left: break
        gain = 0 if sell is None else q * (sell - X[i][j])
        if sell is None and q > 0: break
        go(idx + 1, left - q, profit + gain)
go(0, K, 0); print(best)
