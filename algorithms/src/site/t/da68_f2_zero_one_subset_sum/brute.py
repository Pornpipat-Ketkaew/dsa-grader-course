import itertools
N, K, S = map(int, input().split()); a = list(map(int, input().split())); ones = sum(a)
print(sum(1 for c in itertools.product(range(1, K + 1), repeat=ones) if sum(c) == S))
