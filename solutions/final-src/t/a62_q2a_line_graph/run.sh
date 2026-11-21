D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a62_q2a_line_graph
samp "3 2\n0 1\n0 2" "1"; samp "3 2\n1 0\n0 2" "1"; samp "3 0" "3"; samp "5 4\n0 1\n2 3\n3 4\n4 2" "2"
samp "6 2\n1 2\n3 4" "4"; samp "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
v=100000; print(v,v-1)
for i in range(v-1): print(i,i+1)" > $D/big.in
samp "$(cat $D/big.in)" "1"
python3 -c "
import random; random.seed(9); v=100000; E=set()
while len(E)<200000:
    a,b=random.randrange(v),random.randrange(v)
    if a!=b and (a,b) not in E and (b,a) not in E: E.add((a,b))
print(v,len(E))
for a,b in E: print(a,b)" > $D/big2.in
timefast $D/big.in; timefast $D/big2.in
echo "PASS samples=$NS fuzz=$NF (incl. a 100,000-node path: no recursion)"
