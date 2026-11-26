import random,sys; random.seed(int(sys.argv[1])); K=random.randint(1,15)
a=random.sample(range(K),random.randint(0,K)); b=random.sample(range(K),random.randint(0,K)); print(len(a),*a); print(len(b),*b)
