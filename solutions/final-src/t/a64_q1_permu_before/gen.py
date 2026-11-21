import random,sys
r=random.Random(int(sys.argv[1])); n=r.randint(1,7); m=r.randint(0,n)
bs=r.sample(range(n),m); rules=[(r.randrange(n),b) for b in bs]
rules=[(a,b) for a,b in rules if a!=b]
print(n,len(rules))
for a,b in rules: print(a,b)
