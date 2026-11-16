import sys; s=[]
for line in sys.stdin.read().split("\n"):
    t=line.split()
    if not t: continue
    if t[0]=="u": s.append(int(t[1]))
    elif t[0]=="o": s.pop()
    elif t[0]=="d": p=int(t[1]); s.insert(len(s)-p,int(t[2]))
    elif t[0]=="p": print("Stack size =",len(s),"Data =",*s)
    elif t[0]=="q": break
