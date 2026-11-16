import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,12); print(n); print(*[random.randint(1,15) for _ in range(n)])
