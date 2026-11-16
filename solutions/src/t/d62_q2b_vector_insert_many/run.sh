D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d62_q2b_vector_insert_many student.h
samp "6\n1 2 3 4 5 6\n3\n0 10\n6 11\n2 12" "10 1 2 12 3 4 5 6 11"
samp "0\n\n1\n0 5" "5"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 $D/big.py > $D/big.in; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF"
