import itertools
N, *L = map(int, input().split())
R = [''.join(s) for s in itertools.product('ABCD', repeat=N) if all(s.count(c) <= L[i] for i, c in enumerate('ABCD'))]
print(len(R)); [print(r) for r in R]
