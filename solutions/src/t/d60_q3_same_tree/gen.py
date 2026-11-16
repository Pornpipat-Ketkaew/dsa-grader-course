import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,7); a=[random.randint(1,9) for _ in range(n)]
b=a[:] if random.random()<0.5 else [random.randint(1,9) for _ in range(random.randint(0,7))]
if random.random()<0.5 and len(b)>1: i=random.randrange(1,len(b)); b[i],b[i-1]=b[i-1],b[i]
print(n,*a); print(len(b),*b)
