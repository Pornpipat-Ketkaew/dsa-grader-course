d = list(map(int, open(0).read().split())); n, m = d[0], d[1]
P = {(d[2+2*i], d[3+2*i]) for i in range(n)}; out = []
for j in range(m):
    q = (d[2+2*n+2*j], d[3+2*n+2*j])
    if q in P: out += [0, 0]
    else:
        b = [p for p in P if p < q]; out += list(max(b)) if b else [-1, -1]
print(*out)
