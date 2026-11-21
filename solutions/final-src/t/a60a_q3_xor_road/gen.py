import random, sys
random.seed(int(sys.argv[1])); n = random.randint(1, 10); hi = random.choice([255, 2**30-1])
print(n); print('\n'.join(map(str, random.sample(range(1, hi+1), n))))
