import random; n=m=200000; print(n,m)
print("\n".join(f"{random.randint(1,10**6)} {random.randint(1,12)}" for _ in range(n+m)))
