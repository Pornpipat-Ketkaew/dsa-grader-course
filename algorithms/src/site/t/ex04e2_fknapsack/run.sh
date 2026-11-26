D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex04e2_fknapsack
samp "6 3\n5 3 3\n4 3 3" "7.0000"
samp "5.5 4\n2 3 4 5\n1 2 3 4" "8.3333"
samp "100 2\n3 4\n1 2" "7.0000"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(5); n=100000; print(50000.5, n); print(*[random.randint(1,1000) for _ in range(n)]); print(*[random.randint(1,1000) for _ in range(n)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
