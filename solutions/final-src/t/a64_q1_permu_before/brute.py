import sys, itertools
d=list(map(int,sys.stdin.read().split())); n,m=d[0],d[1]; R=[(d[2+2*i],d[3+2*i]) for i in range(m)]
for p in itertools.permutations(range(n)):
    pos={v:i for i,v in enumerate(p)}
    if all(pos[a]<pos[b] for a,b in R): print(*p)
