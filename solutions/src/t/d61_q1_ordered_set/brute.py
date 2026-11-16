import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; a=d[1:1+n]; b=d[2+n:]
print(*(a+[x for x in b if x not in a]),"|"); print(*[x for x in a if x in b],"|"); print("xyzy")
