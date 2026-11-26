D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex01e3
samp "4 7\n14 15 20 30\n10 11 14 15 16 21 68" "-1 -1 14 15 15 20 30"
samp "1 3\n5\n4.99 5.0 5.5" "-1 5 5"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=m=100000; print(n, m); print(*sorted(random.sample(range(1,1000001), n)))
print(*[f'{random.uniform(0,1000001):.3f}' for _ in range(m)])" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
