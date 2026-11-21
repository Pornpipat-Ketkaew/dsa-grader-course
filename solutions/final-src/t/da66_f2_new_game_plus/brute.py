# list every walk explicitly with DFS (no counting tricks)
import sys
d = list(map(int, sys.stdin.read().split())); R, C = d[0], d[1]; b = [d[2+r*C:2+(r+1)*C] for r in range(R)]
cnt = 0
def go(r, c, last):
    global cnt
    if c == C-1: cnt += 1; return
    for door, dr in (('X', -1), ('Y', 0), ('Z', 1)):
        if door == last: continue
        nr = r + dr
        if 0 <= nr < R and not b[nr][c+1]: go(nr, c+1, door)
for r in range(R):
    if not b[r][0]: go(r, 0, None)
print(cnt % 100000007)
