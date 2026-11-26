D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_m2_interesting_events
samp "3 1\n1 3\n2 5\n4 6\n5\n1\n2\n3\n5\n7" "YES YES YES YES NO"
samp "3 2\n1 4\n3 6\n4 8\n5\n2\n4\n6\n8\n9" "NO YES YES NO NO"
samp "2 2\n1 1000000000\n1000000000 1000000000\n3\n999999999\n1000000000\n1" "NO YES NO"
fuzz 400 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; r=random.Random(5); n=200000; print(n, 3)
for _ in range(n):
    l=r.randint(1,10**9); print(l, min(10**9, l+r.randint(0,10**7)))
print(200000)
for _ in range(200000): print(r.randint(1,10**9))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
