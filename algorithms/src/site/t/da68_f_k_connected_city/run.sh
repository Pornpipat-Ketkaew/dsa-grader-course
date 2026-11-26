D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f_k_connected_city
# any valid answer is accepted, so every output goes through check.py instead of an exact compare
chk() { printf "%b" "$1" > $D/in.txt; timeout 10 $BIN < $D/in.txt > $D/out.txt; python3 $D/check.py $D/in.txt $D/out.txt || exit 1; NS=$((NS+1)); }
chk "5 4 3\n5 1\n1 3\n3 4\n4 2"
chk "5 4 2\n5 1\n5 4\n5 2\n2 3"
chk "10 20 5\n7 2\n2 9\n2 1\n2 3\n9 4\n3 6\n4 5\n7 10\n10 8\n5 8\n2 8\n9 10\n7 6\n1 6\n4 8\n3 8\n3 5\n9 1\n1 8\n7 8"
chk "2 1 2\n1 2"
for s in $(seq 300); do python3 $D/gen.py $s > $D/in.txt; timeout 10 $BIN < $D/in.txt > $D/out.txt; python3 $D/check.py $D/in.txt $D/out.txt || { echo "seed $s"; exit 1; }; done; NF=300
python3 -c "
import random; random.seed(1); n=100000; m=200000; E=set()
for v in range(2,n+1): E.add((random.randint(1,v-1),v))
while len(E)<m:
    a,b=sorted(random.sample(range(1,n+1),2)); E.add((a,b))
print(n,m,n); [print(a,b) for a,b in E]" > $D/big.in
timefast $D/big.in
$BIN.fast < $D/big.in > $D/out.txt; python3 $D/check.py $D/big.in $D/out.txt || exit 1
echo "PASS samples=$NS fuzz=$NF"
