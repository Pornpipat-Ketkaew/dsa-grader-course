import random,sys; random.seed(int(sys.argv[1])); t=random.choice([1,2,3]); k=random.randint(1,3); r=random.randint(1,5); print(t); print(r,k)
for _ in range(r):
    n=random.randint(k,15); print(n)
    if t==2: print(*["".join(random.choice("abc") for _ in range(random.randint(1,3))) for _ in range(n)])
    else: print(*[random.randint(1,20) for _ in range(n)])
