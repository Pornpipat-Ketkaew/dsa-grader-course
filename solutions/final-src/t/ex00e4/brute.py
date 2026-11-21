import sys, itertools
a,b=map(int,sys.stdin.read().split())
for c in itertools.combinations(range(b),a):
    s=['0']*b
    for i in c: s[i]='1'
    print("".join(s))
