D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a63_q1b_virus2
samp "5 2\n0 0 0 0\n0 0 1 1\n0 1 1 1\n1 0 0 0\n0 1 0 1" "yes no yes yes yes"
samp "4 3\n0 0 1 1 0 0 1 1\n0 0 1 1 1 0 0 0\n0 1 0 1 0 1 1 1\n0 1 0 1 1 1 0 0" "no no yes no"
samp "3 4\n1 1 1 1 1 1 1 0 0 1 1 1 1 1 0 0\n1 1 1 1 1 1 1 0 0 1 1 1 1 1 0 1\n1 1 1 0 0 1 1 1 1 0 0 1 1 0 1 1" "no yes yes"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(5)
def gen(k,c):
    if k==1: return random.choice({0:[[0,0]],1:[[0,1],[1,0]],2:[[1,1]]}[c])
    a=random.choice([c//2,(c+1)//2]); return gen(k-1,a)+gen(k-1,c-a)
print(15,10)
for i in range(15): print(*gen(10,random.randint(0,1024)))" > $D/big.in
[ "$($BIN < $D/big.in | sort -u)" = "yes" ] || { echo "k=10 virus rejected"; exit 1; }
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
