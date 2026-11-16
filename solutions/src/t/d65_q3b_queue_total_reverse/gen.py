import random,sys; random.seed(int(sys.argv[1])); sz=0; L=[]
for _ in range(random.randint(1,40)):
    r=random.random()
    if r<0.45: L.append(f"u {random.randint(1,99)}"); sz+=1
    elif r<0.65 and sz: L.append("o"); sz-=1
    elif r<0.85: L.append("r")
    elif sz: L.append("f")
print("\n".join(L))
