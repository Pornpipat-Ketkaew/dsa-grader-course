D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f2_closed_city
samp "4 5 0\n\n1 2 3\n2 3 4\n3 4 2\n1 3 10\n2 4 20" "9"
samp "5 6 2\n3 4\n1 2 5\n2 3 3\n3 5 2\n1 4 1\n4 5 2\n2 5 15" "20"
samp "2 1 0\n1 2 7" "7"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=100000; m=300000; E=set()
for v in range(2,n+1): E.add((v-1,v))
while len(E)<m:
    a,b=sorted(random.sample(range(1,n+1),2)); E.add((a,b))
C=random.sample(range(2,n),1000); C=[c for c in C if True]
print(n,len(E),len(C)); print(*C)
[print(a,b,random.randint(1,10**6)) for a,b in E]" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
