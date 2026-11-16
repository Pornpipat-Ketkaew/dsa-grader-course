import sys; d=sys.stdin.read().split(); n,val,pos,c=map(int,d[:4]); v=list(map(int,d[4:4+n])); v[pos:pos]=[val]*c
print("After call multiple_add"); print("Size =",len(v)); print(*v)
