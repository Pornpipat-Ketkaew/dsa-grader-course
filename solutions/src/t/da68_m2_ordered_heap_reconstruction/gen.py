# Build a sorted (ordered) max heap of distinct values, then swap the subtrees of a
# random set of nodes (by node identity). The result is still a valid max heap,
# so pushing it in array order leaves mData unchanged.
import random, sys
random.seed(int(sys.argv[1]))
a = random.choice([1, 2, 2, 3, 3, 4]) if int(sys.argv[1]) % 5 else random.randint(5, 8)
n = 2 ** a - 1
vals = sorted(random.sample(range(-1000, 1000), n), reverse=True)
p = random.random()
def build(i):
    # returns a nested tree (value, left, right) for array index i
    if i >= n: return None
    l, r = build(2 * i + 1), build(2 * i + 2)
    if l and random.random() < p: l, r = r, l
    return (vals[i], l, r)
t = build(0)
out = []; q = [t]
while q:
    nq = []
    for x in q:
        out.append(x[0])
        if x[1]: nq += [x[1], x[2]]
    q = nq
print(n); print(*out)
