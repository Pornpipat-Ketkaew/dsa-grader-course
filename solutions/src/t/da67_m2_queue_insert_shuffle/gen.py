import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,10); m=random.randint(1,10)
print(n,m,random.randint(0,n),random.randint(0,12)); print(*[random.randint(1,99) for _ in range(n)]); print(*[random.randint(100,999) for _ in range(m)])
