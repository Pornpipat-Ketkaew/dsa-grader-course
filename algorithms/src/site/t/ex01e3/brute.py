d = open(0).read().split(); n, m = int(d[0]), int(d[1]); A = list(map(int, d[2:2+n]))
for x in map(float, d[2+n:2+n+m]): c = [a for a in A if a <= x]; print(c[-1] if c else -1)
