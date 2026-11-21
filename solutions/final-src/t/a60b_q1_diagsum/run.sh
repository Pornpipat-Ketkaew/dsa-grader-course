D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a60b_q1_diagsum
samp "4\n1 2 3 4\n-2 -5 2 -5\n6 3 -7 1\n3 -2 7 -9" "10"
samp "2\n1 2\n3 4" "5"
samp "3\n-1 -1 -1\n-1 -1 -1\n-1 -1 -1" "-1"
samp "3\n-1 -1 -1 -1\n-1 -1 -1 -1\n-1 -1 -1 -1\n-1 -1 -1 -1" "-1"
samp "1\n-7" "-7"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(2); n=1000; print(n)
for _ in range(n): print(*[random.randint(-999,999) for _ in range(n)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
