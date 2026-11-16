D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_f1_map_walk
samp "2 2\n0 0\n0 0" "AB BA DONE"
samp "2 3\n0 0 0\n0 0 0" "AAB ABA BAA BACAB DONE"
samp "2 3\n0 1 0\n0 1 0" "DONE"
samp "4 4\n0 1 1 1\n0 1 1 1\n0 0 1 1\n0 0 0 0" "BBABAA BBBAAA DONE"
samp "4 5\n0 1 0 0 0\n0 1 0 1 0\n0 1 0 1 0\n0 0 0 1 0" "BBBAACCCAABBB DONE"
samp "1 1\n0" " DONE"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# 10 x 10 with no walls: count the paths only (too many to compare), check time and memory
python3 -c "
import random; r=random.Random(5); print(10,10)
for i in range(10): print(*[0 if (i,j) in [(0,0),(9,9)] or r.random()>0.25 else 1 for j in range(10)])" > $D/big.in
timefast $D/big.in; echo "lines: $($BIN.fast < $D/big.in | wc -l)"
echo "PASS samples=$NS fuzz=$NF"
