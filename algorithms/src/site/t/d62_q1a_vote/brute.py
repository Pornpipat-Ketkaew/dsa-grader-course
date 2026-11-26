import sys,collections; d=sys.stdin.read().split(); n,k=int(d[0]),int(d[1]); v=sorted(collections.Counter(d[2:2+n]).values(),reverse=True); print(v[min(k,len(v))-1])
