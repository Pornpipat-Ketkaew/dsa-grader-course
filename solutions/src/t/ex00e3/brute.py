import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; print("YES" if sorted(d[1:1+n])==list(range(1,n+1)) else "NO")
