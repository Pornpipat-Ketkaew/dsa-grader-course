import random, sys
random.seed(int(sys.argv[1]))
while True:
    R = random.randint(1, 3); C = random.randint(1, 4)
    if R * C < 2 or R * C > 12: continue
    g = [[random.choices([0, 1, 2, 3], [5, 2, 2, 2])[0] for _ in range(C)] for _ in range(R)]
    cells = [x for row in g for x in row]
    if 1 not in cells or 2 not in cells: continue
    # need some road: check 1 and 2 are connected through non-volcano cells
    seen = set(); st = [(r, c) for r in range(R) for c in range(C) if g[r][c] == 1]; seen = set(st); ok = False
    while st:
        r, c = st.pop()
        if g[r][c] == 2: ok = True
        for a, b in ((1,0),(-1,0),(0,1),(0,-1)):
            if 0 <= r+a < R and 0 <= c+b < C and g[r+a][c+b] != 3 and (r+a, c+b) not in seen: seen.add((r+a, c+b)); st.append((r+a, c+b))
    if ok: break
print(R, C)
for row in g: print(*row)
