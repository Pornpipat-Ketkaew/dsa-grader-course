import sys
d = list(map(int, sys.stdin.read().split())); n = d[0]
deg = [sum(d[1+i*n:1+(i+1)*n]) for i in range(n)]
print(*[deg.count(x) for x in range(max(deg)+1)])
