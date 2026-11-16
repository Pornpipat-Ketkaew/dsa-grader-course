import random; n=100000; print(n); print(*[random.randint(1,10**9) for _ in range(n)]); ps=random.sample(range(n+1),100000); print(len(ps))
print("\n".join(f"{p} {random.randint(1,10**9)}" for p in ps))
