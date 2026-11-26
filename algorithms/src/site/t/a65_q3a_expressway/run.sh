D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a65_q3a_expressway
samp "5 10\n2 1 6 2 7\n3 1 1 3 1 2 9\n2 1 2 2 5" "10 9 7"
samp "3 1000000\n0" "1000000"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(8); n=700; print(n,1000000)
for i in range(3,n+1):
    ts=list(range(1,i)); print(len(ts),*[x for t in ts for x in (t,random.randint(0,1000))])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
