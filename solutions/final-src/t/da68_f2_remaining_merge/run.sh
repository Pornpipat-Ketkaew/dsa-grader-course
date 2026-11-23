D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f2_remaining_merge
samp "3\n3 1 2" "2"
samp "5\n0 1 1 0 1" "4"
samp "7\n0 0 0 0 0 0 0" "9"
samp "1\n5" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=200000; print(n); print(*[random.randint(-10**9,10**9) for _ in range(n)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
