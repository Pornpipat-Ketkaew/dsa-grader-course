import random, sys
random.seed(int(sys.argv[1])); K = random.randint(2, 5); print(K)
for _ in range(K):
    n = random.randint(1, 5); print(n)
    # rates around a consistent "price" so that profit loops are rare but possible
    price = [random.uniform(0.5, 2) for _ in range(n)]
    for i in range(n):
        row = []
        for j in range(n):
            if i == j: row.append("1")
            else: row.append("%.3f" % (price[j] / price[i] * random.uniform(0.85, 1.08)))
        print(*row)
