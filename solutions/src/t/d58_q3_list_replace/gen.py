import random,sys; random.seed(int(sys.argv[1])); n=random.randint(0,10); m=random.randint(0,4)
print(n,*[random.randint(1,4) for _ in range(n)]); print(random.randint(1,4), m, *[random.randint(1,4) for _ in range(m)])
