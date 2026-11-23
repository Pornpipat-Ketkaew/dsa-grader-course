D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a64_q4_path_sum
samp "4 4\n10 20 30 40 50 60 70 80\n0 1 10\n0 2 15\n1 2 5\n0 3 35" "YES YES NO NO YES NO NO NO"
samp "1 1\n1 2 3 4 5 6 7 8\n0 0 1" "NO NO NO NO NO NO NO NO"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# n = 20 complete graph (190 edges), random weights, random queries
python3 -c "
import random; random.seed(1); n=20; E=[(a,b,random.randint(1,1000)) for a in range(n) for b in range(a+1,n)]
print(n,len(E)); print(*[random.randint(1,20000) for _ in range(8)]); [print(*e) for e in E]" > $D/big.in
timefast $D/big.in
# same graph, queries that are hard to hit: tiny values and the largest values
python3 -c "
import random; random.seed(1); n=20; E=[(a,b,random.randint(1,1000)) for a in range(n) for b in range(a+1,n)]
print(n,len(E)); print(1,2,3,19999,20000,19998,4,5); [print(*e) for e in E]" > $D/big2.in
timefast $D/big2.in
# a path graph 0-1-...-19 with weight 1000: sums are multiples of 1000 only
python3 -c "
n=20; print(n,n-1); print(1000,19000,20000,999,1,5000,19999,7000); [print(i,i+1,1000) for i in range(n-1)]" > $D/big3.in
samp "$(cat $D/big3.in)" "YES YES NO NO NO YES NO YES"
echo "PASS samples=$NS fuzz=$NF"
