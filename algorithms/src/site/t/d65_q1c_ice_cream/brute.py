# day-by-day simulation
d = list(map(int, open(0).read().split())); n, m, st = d[:3]; ch = {d[3+2*i]: d[4+2*i] for i in range(n)}; out = []
for j in range(m):
    P, x = d[3+2*n+2*j], d[4+2*n+2*j]; rate = st; money = 0; day = 0
    while True:
        rate = ch.get(day, rate); money += rate
        if money >= P: out.append(day); break
        if day == x: money = 0
        day += 1
print(*out)
