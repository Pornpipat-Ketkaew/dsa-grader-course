# BFS over arrangements: the fewest swaps from the input to the sorted array
from collections import deque
n = int(input()); a = tuple(map(int, input().split())); goal = tuple(sorted(a))
dist = {a: 0}; q = deque([a])
while q:
    x = q.popleft()
    if x == goal: print(dist[x]); break
    for i in range(n):
        for j in range(i + 1, n):
            y = list(x); y[i], y[j] = y[j], y[i]; y = tuple(y)
            if y not in dist: dist[y] = dist[x] + 1; q.append(y)
