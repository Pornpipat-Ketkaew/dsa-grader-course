# straight from the definition: build H(a,b) as nested lists by concatenating quarters
import sys
a, b = map(int, sys.stdin.read().split())
def H(a, b):
    if a == 0: return [[b]]
    TL, TR, BL, BR = H(a-1, b), H(a-1, b-1), H(a-1, b+1), H(a-1, b)
    return [x + y for x, y in zip(TL, TR)] + [x + y for x, y in zip(BL, BR)]
for row in H(a, b): print(*row)
