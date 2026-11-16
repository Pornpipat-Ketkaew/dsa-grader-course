D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d57_q3_shift shift.h
samp "4\n10 20 30 40\n3" "40 10 20 30 30 20 10 40"
samp "5\n1 2 3 4 5\n1" "2 3 4 5 1 1 5 4 3 2"; samp "5\n1 2 3 4 5\n4" "5 1 2 3 4 4 3 2 1 5"
samp "5\n1 2 3 4 5\n-2" "4 5 1 2 3 3 2 1 5 4"; samp "1\n7\n100" "7 7"; samp "3\n1 2 3\n100" "2 3 1 1 3 2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
