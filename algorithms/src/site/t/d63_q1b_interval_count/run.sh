D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog d63_q1b_interval_count
samp "5 5 1\n1 3 5 9 10\n1 2 3 7 20" "1 2 1 0 0"
samp "3 5 1000000\n1000000 1 2000001\n1000000 1000001 1 2 3" "2 3 2 2 2"
samp "3 5 0\n4 8 2\n1 2 3 4 5" "0 1 0 1 0"
# p + k can reach 2 000 000 000 (beyond int)
samp "2 2 1000000000\n0 1000000000\n1000000000 0" "2 2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=m=200000; print(n, m, 5000); print(*random.sample(range(0,10**9+1), n))
print(*[random.randint(0,10**9) for _ in range(m)])" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
