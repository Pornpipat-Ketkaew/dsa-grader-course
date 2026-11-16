import sys; s=[]
for line in sys.stdin.read().split("\n"):
    t=line.split()
    if not t: continue
    if t[0]=="u": s.append(int(t[1]))
    elif t[0]=="o": s.pop(0)
    elif t[0]=="m": s.append(s.pop(int(t[1])))
    elif t[0]=="p": print(f"Size {len(s)}:",*s)
    elif t[0]=="q": break
