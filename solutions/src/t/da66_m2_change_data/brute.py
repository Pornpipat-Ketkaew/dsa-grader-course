import sys
t=sys.stdin.read().split(); p=0
def nx():
    global p; p+=1; return t[p-1]
x,fr,to=int(nx()),int(nx()),int(nx())
f=lambda v: to if v==fr else v
if x==1:
    st=[]
    for _ in range(int(nx())):
        v=[]
        for _ in range(int(nx())):
            q=[int(nx()) for _ in range(int(nx()))]; v.append(q)
        st.append(v)
    for v in reversed(st):
        print("".join("".join(f"{f(e)}," for e in q)+" " for q in v))
elif x==2:
    m={}
    for _ in range(int(nx())):
        k=nx(); q=[int(nx()) for _ in range(int(nx()))]; m[k]=(q,int(nx()))
    for k in sorted(m):
        q,s=m[k]; print(k+":"+"".join(f"{e} " for e in sorted(map(f,q),reverse=True))+","+str(f(s)))
else:
    def rd():
        l=[int(nx()) for _ in range(int(nx()))]; mm={}
        for _ in range(int(nx())):
            k=int(nx()); v=int(nx()); s=nx(); mm[k]=(v,s)
        return l,mm
    def key(l,mm): return (tuple(l), tuple((k,mm[k]) for k in sorted(mm)))
    a={}
    for _ in range(int(nx())):
        l,mm=rd(); a[key(l,mm)]=(l,mm)
    b={}
    for l,mm in a.values():
        l2=[f(e) for e in l]; m2={}
        for k in sorted(mm): m2[f(k)]=(f(mm[k][0]),mm[k][1])
        b[key(l2,m2)]=(l2,m2)
    for kk in sorted(b):
        l,mm=b[kk]; print("".join(f"{e} " for e in l)+" | "+"".join(f"{k}:{mm[k][0]},{mm[k][1]} " for k in sorted(mm)))
