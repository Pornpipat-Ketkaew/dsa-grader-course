import random,sys; random.seed(int(sys.argv[1])); n=random.randint(1,8); print(n); print(*[10*(i+1) for i in range(n)]); print(random.choice([random.randint(-20,20),random.randint(-10**6,10**6)]))
