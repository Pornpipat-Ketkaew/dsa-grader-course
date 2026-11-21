D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a65_q0_degrees
samp "6\n0 1 0 1 0 0\n1 0 1 0 0 0\n0 1 0 0 0 0\n1 0 0 0 1 1\n0 0 0 1 0 1\n0 0 0 1 1 0" "0 1 4 1"
samp "1\n0" "1"
samp "3\n0 0 0\n0 0 0\n0 0 0" "3"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=5000; print(n)
M=[[0]*n for _ in range(n)]
for i in range(n):
    for j in range(i+1,n):
        if random.random()<0.5: M[i][j]=M[j][i]=1
print('\n'.join(' '.join(map(str,r)) for r in M))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
