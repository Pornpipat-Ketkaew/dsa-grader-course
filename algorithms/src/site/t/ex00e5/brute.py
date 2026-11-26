import sys
n,k=map(int,sys.stdin.read().split())
for v in range(2**n):
    s=format(v,'0%db'%n) if n else ""
    if '1'*k in s: print(s)
