D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg 69_DS4 student.h
samp "6 3\n2 5\n3 1\n2 7\n2 5\n3 7\n1 2\nr 2 9 2\np 0 10\nq" "5 2 7 3 4 4 13 4 5 3 1 5 7 1 2"
samp "6 5\n4 7\n1 5\n1 3\n1 5\n2 0\n1 7\nr 2 10 1\nr 0 10 2\nr 2 9 1\np 0 10\nq" "7 3 - 0 5 0 2 - 0 5 3 1 5 1 4 4 10 2 0 1 3 5 7 2 5"
samp "5 5\n5 7\n1 1\n2 3\n1 5\n1 7\nr 1 7 3\nr 4 6 1\nr 2 9 3\np 0 10\nq" "7 1 3 1 7 7 3 7 1 7 7 1 7 1 6 6 10 3 7 1 3 1 5 1 1 1 3 3 7"
samp "5 5\n2 1\n1 2\n3 3\n1 4\n2 5\nr 0 9 3\nr 2 3 0\nr 3 9 2\np 0 10\nq" "4 1 - 0 5 5 1 1 2 5 3 2 - 0 6 6 9 1 4 2 5 2 3 2 1 1 2 1 3"
fuzz 500 $D/gen.py "python3 $D/brute.py"
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
[ "$($BIN)" = OK ] || { echo "STRUCTURE FAIL"; exit 1; }
# timing: K = 100,000 segments, 100,000 rotations whose range covers at most 40 segments
# (main.cpp's own cursor walk is element by element, so lengths are kept small here)
python3 -c "
import random; r=random.Random(3); K=100000; Q=100000; print(K,Q+1)
segs=[]; prev=-1
for i in range(K):
    v=r.randrange(1000)
    while v==prev: v=r.randrange(1000)
    prev=v; segs.append((r.randint(1,3),v)); print(segs[-1][0],v)
n=sum(l for l,_ in segs); a=0
for i in range(Q):
    a=max(0,min(n-2, a+r.randint(-30,30))); b=min(n,a+r.randint(2,60)); print('r',a,b,r.randrange(b-a))
print('q')" > $D/big.in
g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF structure=3000x6"
