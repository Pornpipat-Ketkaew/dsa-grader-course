D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_f1_linear_recurrence
samp "2 4\n2 10\n2 3" "424"; samp "2 892\n6 4\n5 0" "15200"; samp "3 4\n7 3 2\n4 4 2" "252"
samp "5 16\n0 6 10 1 8\n0 10 9 0 4" "19462"; samp "6 982\n5 7 4 9 9 5\n5 2 6 7 9 4" "408"
samp "2 10\n1 1\n0 1" "55"; samp "3 1\n1 2 3\n7 8 9" "8"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); k=1000; print(k,1000); print(*[random.randint(0,1000) for _ in range(k)]); print(*[random.randint(0,1000) for _ in range(k)])" > $D/big.in
samp "$(cat $D/big.in)" "$(python3 $D/brute.py < $D/big.in)"
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
