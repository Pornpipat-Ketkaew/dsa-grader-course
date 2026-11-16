import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,10); print(n); print(*[random.randint(1,99) for _ in range(n)])
ps=random.sample(range(n+1),random.randint(0,n+1)); print(len(ps))
for p in ps: print(p,random.randint(100,999))
