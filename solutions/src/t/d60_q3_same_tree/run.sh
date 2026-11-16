D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d60_q3_same_tree tree.h
samp "5\n3 4 1 8 2\n5\n3 1 4 8 2" "True"; samp "5\n3 4 1 2 8\n5\n3 4 2 1 8" "False"; samp "0\n0" "True"; samp "1\n5\n0" "False"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "print(10000,*range(10000)); print(10000,*range(10000))" > $D/big.in; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF"
