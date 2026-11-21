D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex06e2_shortest
samp "4 3 0\n0 1 -1\n1 2 1\n2 3 4" "0 -1 0 4"
samp "4 3 0\n1 2 -1\n2 3 -1\n3 1 -1" "-1"
samp "3 3 2\n2 0 5\n2 1 7\n0 1 -3" "5 2 0"
samp "1 0 0" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
import random; random.seed(6); n=100; E=[(random.randrange(n),random.randrange(n)) for _ in range(10000)]
E=[(a,b) for a,b in E if a!=b]
print(n,len(E)+n-1,0)
for i in range(1,n): print(i-1,i,1000)
for a,b in E: print(a,b,random.randint(0,1000))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
