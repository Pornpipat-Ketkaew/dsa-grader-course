D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d63_q2a_pair_gte student.h
samp "1 abc\n1 abc" "Enter CP::pair<int,string> A: Enter CP::pair<int,string> B: Result of a >= b is 1 Result of b >= a is 1"
samp "2 a\n1 z" "Enter CP::pair<int,string> A: Enter CP::pair<int,string> B: Result of a >= b is 1 Result of b >= a is 0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
