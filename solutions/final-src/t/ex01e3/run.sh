D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex01e3
samp "4 7\n14 15 20 30\n10 11 14 15 16 21 68" "-1 -1 14 15 15 20 30"
samp "3 4\n5 10 15\n4.99 5.0 14.999 1000000.5" "-1 5 10 15"
samp "1 2\n7\n6.5 7" "-1 7"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=m=100000
A=sorted(random.sample(range(1,1000001),n)); print(n,m); print(*A); print(*['%.3f'%random.uniform(0,1000001) for _ in range(m)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
