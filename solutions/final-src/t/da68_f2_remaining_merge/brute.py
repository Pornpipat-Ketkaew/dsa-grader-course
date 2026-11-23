# a line-by-line copy of the pseudocode, 1-based like the PDF
import sys
sys.setrecursionlimit(10000)
n = int(input()); A = [None] + list(map(int, input().split())); cnt = 0
def merge(l, m, r):
    global cnt
    i, j, B = l, m + 1, []
    while i <= m and j <= r:
        if A[i] <= A[j]: B.append(A[i]); i += 1
        else: B.append(A[j]); j += 1
    while i <= m: B.append(A[i]); cnt += 1; i += 1    # line 11
    while j <= r: B.append(A[j]); cnt += 1; j += 1    # line 14
    A[l:r + 1] = B
def ms(l, r):
    if l >= r: return
    m = (l + r) // 2; ms(l, m); ms(m + 1, r); merge(l, m, r)
ms(1, n); print(cnt)
