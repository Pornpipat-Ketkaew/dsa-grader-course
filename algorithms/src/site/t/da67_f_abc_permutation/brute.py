import itertools
N, *L = map(int, input().split())
R = [''.join(s) for s in itertools.product('ABC', repeat=N) if all(s.count(c) <= L[i] for i, c in enumerate('ABC'))]
print(len(R)); [print(r) for r in R]
