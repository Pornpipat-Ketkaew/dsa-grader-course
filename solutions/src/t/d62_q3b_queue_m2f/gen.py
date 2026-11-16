import random,sys; random.seed(int(sys.argv[1])); sz=0; L=[]
for _ in range(random.randint(1,30)):
    r=random.random()
    if r<0.4: L.append(f"u {random.randint(1,99)}"); sz+=1
    elif r<0.6 and sz: L.append("o"); sz-=1
    elif r<0.85 and sz: L.append(f"m {random.randrange(sz)}")
    else: L.append("p")
L+=["p","q"]; print("\n".join(L))
