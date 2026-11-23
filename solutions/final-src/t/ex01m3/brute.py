# simulate the restaurant customer by customer with a priority queue of (free time, seat)
import heapq
n, A = map(int, input().split()); T = list(map(int, input().split())); C = list(map(int, input().split()))
pq = [(0, i) for i in range(n)]; heapq.heapify(pq); seat = []
for c in range(max(C)):
    t, i = heapq.heappop(pq); seat.append(t); heapq.heappush(pq, (t + T[i], i))
for c in C: print(seat[c - 1])
