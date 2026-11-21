D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a65_q2a_huge_array
samp "5 2\n1 1\n10 1\n5 1\n1 1\n3 1\n5\n1" "10 1"
samp "5 3\n9 1\n4 5\n9 3\n8 3\n7 7\n1\n15\n8" "4 8 7"
samp "1 2\n2000000000 2000000000\n1\n2000000000" "2000000000 2000000000"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; r=random.Random(1); n=q=100000; print(n,q)
cs=[r.randint(1,20000) for _ in range(n)]; S=sum(cs)
for c in cs: print(r.randint(1,2*10**9), c)
for _ in range(q): print(r.randint(1,S))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
