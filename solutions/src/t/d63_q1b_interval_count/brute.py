import sys
d=sys.stdin.read().split(); n,m,k=int(d[0]),int(d[1]),int(d[2]); a=list(map(int,d[3:3+n])); q=list(map(int,d[3+n:3+n+m]))
print(" ".join(str(sum(1 for x in a if p-k<=x<=p+k)) for p in q))
