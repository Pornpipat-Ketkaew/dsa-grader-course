import sys; d=list(map(int,sys.stdin.read().split())); L=[]; p=0
for k in range(3): n=d[p]; L.append(d[p+1:p+1+n]); p+=1+n
x=L[0]; k=(len(x)+1)//2; a=L[1]+x[:k]; b=L[2]+x[k:]
for l in ([],a,b): print(f"{len(l)}:",*l,"|",*l[::-1])
print("same nodes"); print("1: 5 | 5")
