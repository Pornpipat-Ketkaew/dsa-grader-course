import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,5); m=random.randint(0,5); print(n,m); print(*[random.randint(1,9) for _ in range(n)])
for _ in range(m): k=random.randint(0,4); print(k,*[random.randint(10,99) for _ in range(k)])
