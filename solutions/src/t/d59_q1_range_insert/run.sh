D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d59_q1_range_insert student.h
samp "5 1 2 3 4 5\n5 10 20 30 40 50\n2 0 3\n" "Result 1 2 10 20 30 3 4 5"
samp "5 1 2 3 4 5\n5 10 20 30 40 50\n5 0 5\n" "Result 1 2 3 4 5 10 20 30 40 50"
samp "5 1 2 3 4 5\n1 1000\n0 0 1\n" "Result 1000 1 2 3 4 5"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
