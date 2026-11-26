D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex05m2_connection
samp "7 8 2\n0 6\n1 6\n1 5\n1 4\n2 3\n3 4\n4 5\n5 6" "6"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(5); n=1000; E=set()
while len(E)<100000:
    a,b=sorted(random.sample(range(n),2)); E.add((a,b))
print(n,len(E),4)
for a,b in E: print(a,b)" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
