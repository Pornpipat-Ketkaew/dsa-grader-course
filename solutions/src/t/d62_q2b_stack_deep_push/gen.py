import random,sys; random.seed(int(sys.argv[1])); sz=0; L=[]
for _ in range(random.randint(1,25)):
    r=random.random()
    if r<0.3: L.append(f"u {random.randint(1,99)}"); sz+=1
    elif r<0.4 and sz: L.append("o"); sz-=1
    elif r<0.75: L.append(f"d {random.randint(0,sz)} {random.randint(100,999)}"); sz+=1
    else: L.append("p")
L+=["p","q"]; print("\n".join(L))
