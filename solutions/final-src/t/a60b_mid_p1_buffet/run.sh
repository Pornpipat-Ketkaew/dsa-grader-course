D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a60b_mid_p1_buffet
samp "3 0 10\n1 3 4" "3"
samp "5 1 10\n1 2 3 5 6" "2"
samp "10 5 10\n1 10 9 2 3 4 8 7 5 6" "1"
samp "1 10000 1\n1" "1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(4); n=10000; f=n; print(f,0,n); a=list(range(1,n+1)); random.shuffle(a); print(*a)" > $D/big.in
samp "$(cat $D/big.in)" "10000"
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
