D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex05m1_cycle
samp "4\n4 0\n4 4\n2 3\n0 1\n1 2\n2 0\n4 3\n0 1\n1 2\n2 0\n4 1\n1 3" "NO YES YES NO"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
import random; random.seed(4); print(100)
for t in range(100):
    n=1000; print(n,10000)
    for i in range(10000): a=random.randrange(n); b=(a+1+random.randrange(n-1))%n; print(a,b)" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
