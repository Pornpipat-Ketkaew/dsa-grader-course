D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex06e3_columbia
samp "4 4\n1 1 1 1\n9 8 7 1\n1 1 1 1\n1 2 4 9" "0 1 2 3 9 9 9 4 8 7 6 5 9 9 10 14"
samp "1 1\n7" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(4); R,C=400,500; print(R,C)
for r in range(R): print(*[random.randint(0,1000) for _ in range(C)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
