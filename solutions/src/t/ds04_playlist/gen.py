import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,9); names=[chr(97+i)*2 for i in range(n)]
k=random.randint(1,n); sel=sorted(random.sample(range(n),k)); opts=list(range(0,sel[0]))+list(range(sel[-1]+1,n+1))
if not opts: sel=sel[1:] or sel; opts=list(range(0,sel[0]))+list(range(sel[-1]+1,n+1))
if not opts: print(1); print("aa"); print(1); print(0); print(1); sys.exit()
print(n); print("\n".join(names)); print(len(sel)); print("\n".join(map(str,random.sample(sel,len(sel))))); print(random.choice(opts))
