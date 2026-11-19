import sys
t=sys.stdin.read().split(); p=0
def nx():
    global p; p+=1; return t[p-1]
a,b=int(nx()),int(nx()); Q={'A':[int(nx()) for _ in range(a)],'B':[int(nx()) for _ in range(b)]}
while True:
    c=nx()
    if c=="q": break
    if c=="i": m=nx(); Q[m].append(int(nx()))
    elif c=="o":
        m=nx()
        if Q[m]: Q[m].pop(0)
    elif c=="s":
        m=nx()
        if Q[m]: print(len(Q[m]),Q[m][0],Q[m][-1])
    elif c=="l": print(*Q[nx()])
    elif c=="f":
        m,k=nx(),nx(); X,Y=Q[m],Q[k]; L=max(len(X),len(Y))
        X2=[None]*(L-len(X))+X; Y2=[None]*(L-len(Y))+Y; res=[]
        for x,y in zip(X2,Y2):
            if x is None: res.append(y)
            elif y is None: res.append(x)
            elif x+y!=0: res.append(x+y)
        Q[m]=res
        if m!=k: Q[k]=[]
