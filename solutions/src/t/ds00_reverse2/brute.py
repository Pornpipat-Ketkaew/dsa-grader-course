import sys; d=sys.stdin.read().split(); n=int(d[0]); v=list(map(int,d[1:1+n])); a,b=int(d[1+n]),int(d[2+n]); v[a:b+1]=v[a:b+1][::-1]; print(*v)
