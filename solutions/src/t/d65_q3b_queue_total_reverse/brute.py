import sys; s=[]; t=sys.stdin.read().split(); i=0
while i<len(t):
    c=t[i]; i+=1
    if c=="u": s.append(int(t[i])); i+=1
    elif c=="o": s.pop(0)
    elif c=="r": s.reverse()
    elif c=="f": print(s[0],s[-1],len(s))
print(*s)
