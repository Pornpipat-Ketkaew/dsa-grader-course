D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex06e1_cable
samp "4\n1 3 4\n2 7\n6" "7"; samp "5\n4 3 6 7\n4 2 5\n6 5\n7" "14"; samp "2\n9" "9"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
import random; random.seed(1); n=1000; print(n)
for i in range(n-1): print(*[random.randint(0,1000) for _ in range(n-i-1)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
