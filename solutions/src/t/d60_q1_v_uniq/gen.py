import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,30); k=random.randint(1,10); print(n); print(*[random.randint(-k,k) for _ in range(n)])
