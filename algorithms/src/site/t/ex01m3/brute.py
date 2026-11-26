# simulate the queue with a heap of (free time, seat number)
import heapq
d = list(map(int, open(0).read().split())); n, a = d[0], d[1]; T = d[2:2+n]; C = d[2+n:]
h = [(0, i) for i in range(n)]; heapq.heapify(h); seat = []
for _ in range(max(C)):
    t, i = heapq.heappop(h); seat.append(t); heapq.heappush(h, (t + T[i], i))
for c in C: print(seat[c - 1])
