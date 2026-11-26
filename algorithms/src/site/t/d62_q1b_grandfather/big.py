import random; n=m=10**6; print(n,m); B=10**12
out=[f"{B+i//3} {B*2+i}" for i in range(n)]  # chains: ids spread over 13 digits
print("\n".join(out)); print("\n".join(f"{B*2+random.randint(0,n-1)} {B*2+random.randint(0,n-1)}" for _ in range(m)))
