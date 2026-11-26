D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_f2_new_game_plus
samp "2 2\n0 0\n0 0" "4"; samp "2 3\n0 1 0\n0 0 0" "3"; samp "2 3\n1 0 0\n1 0 0" "0"
samp "2 3\n0 0 1\n0 0 1" "0"; samp "3 3\n0 1 0\n0 1 0\n0 1 0" "0"; samp "3 3\n0 1 0\n0 0 1\n0 1 0" "4"
python3 -c "
print(25,25)
for r in range(25): print(*([0]*25))" > $D/s7.in
samp "$(cat $D/s7.in)" "43099679"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(4); print(500,500)
for r in range(500): print(*[1 if random.random()<.1 else 0 for _ in range(500)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
