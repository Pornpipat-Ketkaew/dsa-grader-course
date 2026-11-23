n = int(input()); s = input().strip(); best = 0
for mask in range(1, 1 << n):
    t = ''.join(s[i] for i in range(n) if mask >> i & 1)
    if t == t[::-1]: best = max(best, len(t))
print(best)
