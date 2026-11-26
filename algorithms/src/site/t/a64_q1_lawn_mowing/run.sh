D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a64_q1_lawn_mowing
samp "5 5 0\n1 2 3 4 5\n1 5\n1 8\n1 9\n1 10\n1 14" "5 5 9 9 14"
samp "5 4 2\n1 1 1 1 1\n0 2\n0 5\n0 10\n0 1000" "0 1 3 5"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=m=500000; print(n, m, 1000); print(*[random.randint(0,1000) for _ in range(n)])
print('\n'.join(f'{random.randint(0,n-1)} {random.randint(0,10**12)}' for _ in range(m)))" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
