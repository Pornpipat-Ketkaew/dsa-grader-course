# try all 4^n fillings of the 2 x n table and keep those without adjacent 1s
import sys
n = int(sys.stdin.read()); cnt = 0
for m in range(1 << (2*n)):
    top = [(m >> i) & 1 for i in range(n)]; bot = [(m >> (n+i)) & 1 for i in range(n)]
    ok = all(not (top[i] and bot[i]) for i in range(n)) and all(not (top[i] and top[i+1]) and not (bot[i] and bot[i+1]) for i in range(n-1))
    cnt += ok
print(cnt % 100000007)
