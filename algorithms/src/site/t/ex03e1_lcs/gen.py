import random, sys
random.seed(int(sys.argv[1])); A = random.choice(['ab', 'abc', 'abcdefgh'])
print(''.join(random.choice(A) for _ in range(random.randint(1, 9)))); print(''.join(random.choice(A) for _ in range(random.randint(1, 9))))
