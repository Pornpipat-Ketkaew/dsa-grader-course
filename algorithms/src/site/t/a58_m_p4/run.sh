D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a58_m_p4
samp "3\n1 4 6\n5 7 10" "2"
samp "4\n1 2 3 4\n2 3 4 5" "4"
samp "1\n5\n5" "1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(3); n=100000; S=[random.randint(0,10**9) for _ in range(n)]; F=[s+random.randint(0,10**6) for s in S]
print(n); print(*S); print(*F)" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
