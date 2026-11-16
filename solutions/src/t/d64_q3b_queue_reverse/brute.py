import sys; d=list(map(int,sys.stdin.read().split())); n,a,b=d[0],d[1],d[2]; v=d[4:4+n]; v[a:b+1]=v[a:b+1][::-1]; print(*v)
