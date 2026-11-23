D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f_hidden_palindrome
samp "1\na" "1"
samp "5\nabvba" "5"
samp "5\nabcab" "3"
samp "2\nab" "1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); print(3000); print(''.join(random.choice('abc') for _ in range(3000)))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
