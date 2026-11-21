D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a60a_q3_xor_road
samp "4\n3\n10\n9\n6" "37"; samp "1\n5" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
import random; random.seed(2); n=2000; print(n); print('\n'.join(map(str,random.sample(range(1,2**30),n))))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
