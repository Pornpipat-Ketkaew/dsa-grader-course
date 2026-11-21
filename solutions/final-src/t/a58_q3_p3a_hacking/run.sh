D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a58_q3_p3a_hacking
samp "3 2 1\n1\n3 5 1\n0 1\n1 2" "8"
samp "4 4 1\n0\n2 5 3 1\n0 1\n0 2\n1 3\n2 3" "7"
samp "4 3 2\n0 3\n4 3 2 1\n0 1\n1 2\n2 3" "6"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(5); n=10000; E=set((random.randrange(i),i) for i in range(1,n))
while len(E)<40000:
    a,b=sorted(random.sample(range(n),2)); E.add((a,b))
k=50; print(n,len(E),k); print(*random.sample(range(n),k)); print(*[random.randint(1,1000) for _ in range(n)])
for a,b in E: print(a,b)" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
