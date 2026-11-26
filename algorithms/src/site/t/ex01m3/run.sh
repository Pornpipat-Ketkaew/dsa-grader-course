D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex01m3
samp "3 5\n2 2 5\n4 5 6 30 123456789012" "2 2 4 24 102880657508"
samp "1 3\n1000\n1 2 1000000000000" "0 1000 999999999999000"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); print(1000, 200); print(*[random.randint(1,1000) for _ in range(1000)])
print(*[random.randint(1,10**12) for _ in range(200)])" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
