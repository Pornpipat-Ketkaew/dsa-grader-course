# walk cell by cell
d = list(map(int, open(0).read().split())); R, C, k = d[:3]; F = {(d[3+2*i], d[4+2*i]) for i in range(k)}; p = 3 + 2 * k; q = d[p]
for j in range(q):
    r, c = d[p+1+2*j], d[p+2+2*j]; days = 0
    while (r, c) not in F:
        days += 1; c += 1
        if c > C: c = 1; r += 1
        if r > R: r = 1
    print(days)
