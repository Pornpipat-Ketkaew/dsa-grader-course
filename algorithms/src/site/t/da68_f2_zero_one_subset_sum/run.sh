D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f2_zero_one_subset_sum
samp "3 2 4\n1 0 1" "1"
samp "6 7 6\n1 0 1 0 1 0" "10"
samp "3 5 7\n0 0 0" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "15 10 82
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1" > $D/big.in
samp "$(cat $D/big.in)" "$(python3 -c "
import itertools
w=[1]+[0]*150
for _ in range(15):
    w=[sum(w[s-v] for v in range(1,11) if s-v>=0) for s in range(151)]
print(w[82])")"
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
