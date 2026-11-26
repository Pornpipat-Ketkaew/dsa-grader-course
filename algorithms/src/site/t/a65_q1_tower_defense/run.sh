D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a65_q1_tower_defense
samp "10 1 2 1\n1\n10\n2 5" "9"
samp "10 1 2 4\n1\n10\n2 5" "8"
samp "100 3 3 1\n80 70 60\n1 1 1\n70 71 69" "2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# m = k = 8, w = n: every tower reaches every monster, h = 1000 (no pruning by power)
python3 -c "
import random; random.seed(2); n=10**6; print(n,8,8,n); print(*[random.randint(1,n) for _ in range(8)]); print(*[1000]*8); print(*random.sample(range(1,n+1),8))" > $D/big.in
samp "$(cat $D/big.in)" "7992"
timefast $D/big.in
# h = 1 everywhere, w = n: 8 towers, 8 monsters, every tower must pick a different monster
python3 -c "
import random; random.seed(3); n=10**6; print(n,8,8,n); print(*[random.randint(1,n) for _ in range(8)]); print(*[1]*8); print(*random.sample(range(1,n+1),8))" > $D/big2.in
samp "$(cat $D/big2.in)" "0"
timefast $D/big2.in
# h = 1,1,1,1,1,1,1,0 and w = n: only 7 useful hits exist, so "every tower hits" never happens and nothing stops early
python3 -c "
import random; random.seed(4); n=10**6; print(n,8,8,n); print(*[random.randint(1,n) for _ in range(8)]); print(*[1]*7+[0]); print(*random.sample(range(1,n+1),8))" > $D/big3.in
samp "$(cat $D/big3.in)" "0"
timefast $D/big3.in
echo "PASS samples=$NS fuzz=$NF"
