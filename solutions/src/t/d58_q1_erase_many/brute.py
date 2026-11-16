import sys
v=[]; o=[]
for line in sys.stdin:
    t=line.split()
    if not t: continue
    if t[0]=='q': break
    if t[0]=='a': v+=list(map(int,t[2:2+int(t[1])]))
    if t[0]=='e':
        ps=set(map(int,t[2:2+int(t[1])])); v=[x for i,x in enumerate(v) if i not in ps]
    if t[0]=='p': o.append(" ".join(map(str,v)))
print("\n".join(o))
