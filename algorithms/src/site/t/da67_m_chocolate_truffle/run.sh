D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da67_m_chocolate_truffle
samp "3 3 1\n2 2\n1\n1 1" "4"
samp "3 3 2\n2 3\n3 2\n1\n2 3" "0"
samp "3 3 2\n3 1\n2 3\n2\n2 2\n1 2" "1 4"
samp "4 2 3\n3 2\n4 1\n2 2\n2\n3 1\n2 1" "1 1"
samp "2 5 1\n1 3\n2\n1 2\n1 4" "1 9"
# R = C = 10^9: one favourite at (1,1), start at (1,2) needs 10^18 - 1 days
samp "1000000000 1000000000 1\n1 1\n1\n1 2" "999999999999999999"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); R=C=10**9; k=500000; print(R, C, k)
print('\n'.join(f'{random.randint(1,R)} {random.randint(1,C)}' for _ in range(k)))
print(200000); print('\n'.join(f'{random.randint(1,R)} {random.randint(1,C)}' for _ in range(200000)))" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
