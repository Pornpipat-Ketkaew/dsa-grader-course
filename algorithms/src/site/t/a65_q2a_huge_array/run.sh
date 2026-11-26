D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a65_q2a_huge_array
samp "5 2\n1 1\n10 1\n5 1\n1 1\n3 1\n5\n1" "10 1"
samp "5 3\n9 1\n4 5\n9 3\n8 3\n7 7\n1\n15\n8" "4 8 7"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# N = Q = 100 000, total size 2 000 000 000, last position asked
python3 -c "
import random; random.seed(1); n=q=100000; print(n, q)
print('\n'.join(f'{random.randint(1,2*10**9)} 20000' for _ in range(n))); print('\n'.join(str(random.randint(1,2*10**9)) for _ in range(q-1))); print(2*10**9)" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
