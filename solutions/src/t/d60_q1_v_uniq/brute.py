import sys; d=sys.stdin.read().split(); n=int(d[0]); s=[]; 
for x in d[1:1+n]:
    if x not in s: s.append(x)
print("Result"); print(*s)
