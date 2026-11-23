# Mycielski construction: M2 = one edge; each step keeps triangle-free and adds one to the chromatic number
n, E = 2, [(0, 1)]
for _ in range(3):
    E2 = list(E)
    for a, b in E: E2 += [(a, n + b), (b, n + a)]
    for v in range(n): E2.append((n + v, 2 * n))
    n, E = 2 * n + 1, E2
print(n, len(E))
for a, b in E: print(a, b)
