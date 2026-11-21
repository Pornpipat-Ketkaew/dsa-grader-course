D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a66_q2a_insertion_count
samp "6 2\n3 4 6 2 1 5\n6 2" "0 3"
samp "6 6\n3 4 6 2 1 5\n6 5 4 3 2 1" "0 1 0 0 3 4"
samp "10 1\n6 10 2 8 1 4 5 9 3 7\n7" "3"
samp "10 5\n10 9 8 3 1 4 2 5 7 6\n6 2 8 5 7" "4 5 2 3 3"
samp "6 2\n3 4 6 2 1 5\n2 6" "3 0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; r=random.Random(3); n=200000; a=list(range(1,n+1)); r.shuffle(a); print(n,1000); print(*a); print(*r.sample(a,1000))" > $D/big.in; timefast $D/big.in
python3 -c "n=200000; print(n,1000); print(*range(n,0,-1)); print(*range(1,1001))" > $D/big.in
[ "$($BIN.fast < $D/big.in | head -1)" = 199999 ] || { echo REVERSE FAIL; exit 1; }
echo "PASS samples=$NS fuzz=$NF"
