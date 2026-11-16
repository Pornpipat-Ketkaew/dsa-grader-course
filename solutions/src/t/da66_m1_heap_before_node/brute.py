# brute force: try EVERY heap of n distinct values (all permutations that satisfy the heap property)
import sys,itertools; n,m=map(int,sys.stdin.read().split()); can=set()
if n<=8:
    for p in itertools.permutations(range(n)):
        if all(p[(i-1)//2]>p[i] for i in range(1,n)):
            for i in range(n):
                if p[i]>p[m]: can.add(i)
else:   # too many permutations: use the definition "not in the subtree of m"
    def sub(i):
        while i>m: i=(i-1)//2
        return i==m
    can={i for i in range(n) if not sub(i)}
r=sorted(can); print(len(r)); print(*r)
