D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_m1_line_monopoly
samp "3\n1 10 20\n1 4 7\n2" "2"
samp "4\n1 10 20\n1 4 7\n1 5 11\n2" "1"
samp "3\n1 5 10\n1 5 5\n2" "1"
samp "4\n1 7 8\n1 3 4\n1 5 6\n2" "1"
samp "9\n1 5 10\n1 15 20\n1 25 30\n1 35 40\n2\n1 7 37\n2\n1 2 3\n2" "4 1 2"
samp "3\n1 1 1000000000\n1 1 1\n2" "1"
fuzz 400 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; r=random.Random(9); n=200000; print(n)
for i in range(n):
    if i%2: print(2)
    else: a=r.randint(1,10**9); print(1,a,min(10**9,a+r.randint(0,3000)))" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
