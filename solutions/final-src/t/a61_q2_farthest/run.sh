D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a61_q2_farthest
samp "5\n0 1 -1 -1 7\n-1 0 2 3 5\n-1 -1 0 4 -1\n-1 4 2 0 -1\n-1 -1 -1 4 0" "6"
samp "2\n0 -1\n5 0" "-1"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
import random; random.seed(3); n=1000; print(n)
for i in range(n): print(*[0 if i==j else (random.randint(1,999999) if random.random()<.5 else -1) for j in range(n)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
