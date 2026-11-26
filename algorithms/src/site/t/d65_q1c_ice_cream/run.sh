D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog d65_q1c_ice_cream
samp "2 7 3\n4 2\n6 5\n1 1000\n3 1000\n4 1000\n12 1000\n13 1000\n14 1000\n15 1000" "0 0 1 3 4 4 5"
samp "2 5 3\n4 2\n6 5\n11 3\n12 3\n13 3\n200 4\n200 5" "3 3 7 45 45"
samp "3 3 20\n400 15\n35 80\n500 30\n120457 5000\n120457 3000\n3016390 1" "3468 7016 100000"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=40000; m=100000; print(n, m, 1000)
print('\n'.join(f'{a} {random.randint(900,1000)}' for a in random.sample(range(1,100001), n)))
print('\n'.join(f'{random.randint(1,40000000)} {random.randint(1,100000)}' for _ in range(m)))" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
