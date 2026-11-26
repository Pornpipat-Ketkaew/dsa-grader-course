# list every sequence of daily amounts explicitly (no memo) and count them
import sys
d = list(map(int, sys.stdin.read().split())); n, k = d[0], d[1]; S = d[2:2+k]
def count(left):
    if left == 0: return 1
    return sum(count(left - s) for s in S if s <= left)
print(count(n) % 1000003)
