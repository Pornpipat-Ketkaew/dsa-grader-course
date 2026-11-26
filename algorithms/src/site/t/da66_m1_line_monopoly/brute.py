import sys
d=sys.stdin.read().split(); p=1; n=int(d[0]); own=set()
for _ in range(n):
    t=int(d[p]); p+=1
    if t==1:
        a,b=int(d[p]),int(d[p+1]); p+=2; own.update(range(a,b+1))
    else:
        print(sum(1 for x in own if x-1 not in own))   # count block starts
