import sys; d=list(map(int,sys.stdin.read().split())); n=d[0]; l=d[1:1+n]; x=d[1+n]; m=d[2+n]; y=d[3+n:3+n+m]; r=[]
for v in l: r+= y if v==x else [v]
print(f"{len(r)}:",*r,"|",*r[::-1],"| y",m); print("122")   # z = 1 2, z.replace(1, z) -> 1 2 2
