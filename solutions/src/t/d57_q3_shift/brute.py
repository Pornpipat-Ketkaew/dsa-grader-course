import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; a=d[1:1+n]; k=d[1+n]; s=k%n; r=a[s:]+a[:s]; print(*r); print(*r[::-1])
