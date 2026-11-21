import sys
d = sys.stdin.read().split(); n, m = int(d[0]), int(d[1]); A = list(map(int, d[2:2+n])); Q = list(map(float, d[2+n:2+n+m]))
for x in Q:
    c = [a for a in A if a <= x]; print(max(c) if c else -1)
