D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex06m2_exchange
samp "2\n3\n1 0.7 1.2\n1.1 1 2\n0.75 0.7 1\n2\n1 0.7\n1.2 1" "YES NO"
samp "2\n1\n1\n2\n1 0.5\n2 1" "NO NO"
samp "2\n4\n1 0.7 0 0\n0 1 2 0\n0 0 1 0.75\n0 0 0 1\n4\n1 0 0 0\n0 1 0.7 0\n0 0 1 2\n0 0.75 0 1" "NO YES"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(7); print(20)
for t in range(20):
    n=500; print(n); pr=[random.uniform(.5,2) for _ in range(n)]
    for i in range(n): print(' '.join('1' if i==j else '%.4f'%(pr[j]/pr[i]*random.uniform(.9,1.0)) for j in range(n)))" > $D/big.in
timefast $D/big.in
python3 -c "
import random; random.seed(17); print(20)
for t in range(20):
    n=500; print(n); pr=[random.uniform(.5,2) for _ in range(n)]
    for i in range(n): print(' '.join('1' if i==j else '%.4f'%(pr[j]/pr[i]*random.uniform(.95,1.002)) for j in range(n)))" > $D/big2.in
timefast $D/big2.in
# a single long profit loop 0 -> 1 -> ... -> 49 -> 0 hidden among bad rates (the slow case for Bellman-Ford)
python3 -c "
n=50; print(2)
for f in (1.0005, 0.9995):
    print(n)
    for i in range(n): print(' '.join('1' if i==j else ('%.6f'%f if j==(i+1)%n else '0.5') for j in range(n)))" > $D/ring.in
samp "$(cat $D/ring.in)" "YES NO"
echo "PASS samples=$NS fuzz=$NF"
