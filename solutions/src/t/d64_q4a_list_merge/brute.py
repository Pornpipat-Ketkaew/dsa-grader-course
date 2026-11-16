import sys; d=list(map(int,sys.stdin.read().split())); n,m=d[0],d[1]; l=d[2:2+n]; p=2+n
for _ in range(m): k=d[p]; l+=d[p+1:p+1+k]; p+=1+k
print(f"{len(l)}:",*l,"|",*l[::-1]); print(f"ls {m}:",*["0e"]*m)
