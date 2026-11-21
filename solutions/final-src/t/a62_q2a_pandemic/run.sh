D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a62_q2a_pandemic
samp "5 4 3\n0 0 0 0\n0 0 0 0\n0 0 0 0\n0 2 1 0\n0 0 0 0" "14"
samp "3 3 2\n0 0 1\n0 0 0\n0 0 1" "8"
samp "1 12 3\n0 1 0 0 0 0 0 0 0 1 0 0" "11"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(6); R=C=500; print(R,C,1000000)
for r in range(R): print(*[random.choices([0,1,2],[90,1,9])[0] for _ in range(C)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
