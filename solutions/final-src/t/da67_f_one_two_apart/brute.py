import itertools
n = int(input()); c = 0
for a in itertools.product(range(3), repeat=n):
    if all(not (a[i] == 1 and a[j] == 2 or a[i] == 2 and a[j] == 1) for i in range(n) for j in range(i + 1, min(n, i + 3))): c += 1
print(c % 100000007)
