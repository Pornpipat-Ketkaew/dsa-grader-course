# every string over the first k letters, keep the ones within the counts, canonical = min(s, reverse)
import itertools, sys
t = sys.stdin.read().split(); n, k = int(t[0]), int(t[1]); c = [int(ch) for ch in "".join(t[2:])]
S = set()
for s in itertools.product("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[:k], repeat=n):
    if all(s.count(chr(65 + i)) <= c[i] for i in range(k)): S.add(min("".join(s), "".join(s)[::-1]))
print(len(S)); [print(s) for s in sorted(S)]
