import sys; s=set(); t=sys.stdin.read().split(); i=0
while i<len(t):
    c=t[i]; i+=1
    if c=="i": s.add(int(t[i])); i+=1
    elif c=="d": s.discard(int(t[i])); i+=1
    elif c=="x": s.remove(max(s))
    elif c=="q": break
print(*sorted(s,reverse=True))
