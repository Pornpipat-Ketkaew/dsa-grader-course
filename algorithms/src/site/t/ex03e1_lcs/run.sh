D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex03e1_lcs
samp "acbdegcedbg\nbegcfeubk" "6"
samp "aaa\nbbbbbbbbb" "0"
samp "a\na" "1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); print(''.join(random.choice('ab') for _ in range(500))); print(''.join(random.choice('ab') for _ in range(500)))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
