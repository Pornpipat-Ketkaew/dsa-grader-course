import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,40); print(n); print(*[random.randint(-99,99) for _ in range(n)])
