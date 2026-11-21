D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a62_q1b_virus
samp "4 1\n0 1\n1 0\n0 0\n1 1" "yes no no no"
samp "3 2\n1 1 0 0\n1 0 0 1\n0 0 0 0" "no yes no"
samp "3 3\n1 0 0 1 0 1 0 1\n1 0 1 0 1 0 0 1\n1 0 1 1 1 0 0 0" "yes yes no"
samp "5 4\n0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1\n0 1 0 1 0 1 0 1 0 1 0 1 1 0 0 1\n0 1 0 1 0 1 0 1 1 0 0 1 0 1 0 1\n0 1 0 1 0 1 0 1 1 0 0 1 1 0 0 1\n0 1 0 1 0 1 0 1 1 0 1 0 0 1 0 1" "yes yes yes yes yes"
# the table in the PDF: exactly these 6 codes of size 8 are viruses
[ "$(python3 -c "
S={(0,1)}
for _ in range(2): S={a2+b for a in S for b in S for a2 in (a,a[::-1])}
print(len(S))")" = 6 ] || { echo "count != 6"; exit 1; }
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 $D/gen.py 7 > /dev/null
python3 -c "
import random; random.seed(3)
def gen(k):
    if k==1: return [0,1]
    a,b=gen(k-1),gen(k-1)
    if random.random()<0.5: a=a[::-1]
    return a+b
print(10,8)
for i in range(10): print(*gen(8))" > $D/big.in
[ "$($BIN < $D/big.in | sort -u)" = "yes" ] || { echo "k=8 virus rejected"; exit 1; }
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
