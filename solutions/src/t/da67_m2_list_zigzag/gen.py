import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,7); m=random.randint(0,7)
print(n); print(*[random.randint(1,9) for _ in range(n)]); print(m); print(*[random.randint(10,99) for _ in range(m)])
