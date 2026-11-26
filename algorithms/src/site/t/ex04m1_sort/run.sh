D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex04m1_sort
samp "7\n2 2 1 3 2 1 3" "3"
samp "11\n1 1 1 2 2 2 3 3 3 3 3" "0"
samp "3\n3 1 2" "2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(6); n=100000; print(n); print(*[random.randint(1,3) for _ in range(n)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
