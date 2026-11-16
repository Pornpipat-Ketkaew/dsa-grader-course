import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,5); m=random.randint(1,6); st=random.randint(1,5)
days=random.sample(range(1,20),n); print(n,m,st)
for a in days: print(a,random.randint(1,5))
for _ in range(m): print(random.randint(1,60),random.randint(1,15))
