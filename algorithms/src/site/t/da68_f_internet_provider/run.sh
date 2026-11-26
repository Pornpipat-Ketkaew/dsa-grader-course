D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f_internet_provider
samp "5 6 10 0\n1 2 5\n1 5 7\n2 5 3\n2 4 6\n3 4 2\n4 5 9" "160"
samp "5 6 10 2\n1 2 5\n1 5 7\n2 5 3\n2 4 6\n3 4 2\n4 5 9" "100"
samp "9 8 1 3\n1 2 5\n2 3 1\n2 4 2\n2 8 8\n2 6 9\n4 5 4\n6 7 3\n6 9 6" "21"
samp "2 1 10 1\n1 2 1000" "10000"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=100000; m=200000; E=set()
for v in range(2,n+1): E.add((random.randint(1,v-1),v))
while len(E)<m:
    a,b=sorted(random.sample(range(1,n+1),2)); E.add((a,b))
print(n,m,10,500); [print(a,b,random.randint(1,1000)) for a,b in E]" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
