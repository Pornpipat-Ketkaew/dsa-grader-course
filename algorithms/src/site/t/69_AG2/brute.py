# broken-profile DP over 3-bit column masks (completely independent of the F/G recurrence)
import sys
n = int(sys.stdin.read()); MOD = 10**9 + 7
def fill(col_mask, row, next_mask, out):
    if row == 3: out.append(next_mask); return
    if col_mask >> row & 1: fill(col_mask, row + 1, next_mask, out); return
    fill(col_mask, row + 1, next_mask | 1 << row, out)                  # horizontal domino
    if row < 2 and not col_mask >> (row + 1) & 1: fill(col_mask, row + 2, next_mask, out)  # vertical
ways = {0: 1}
for _ in range(n):
    nw = {}
    for m, w in ways.items():
        out = []; fill(m, 0, 0, out)
        for x in out: nw[x] = (nw.get(x, 0) + w) % MOD
    ways = nw
print(ways.get(0, 0))
