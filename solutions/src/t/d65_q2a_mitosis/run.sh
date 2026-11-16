D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d65_q2a_mitosis student.h
samp "5 1\n10 20 30 40 50\n1 2" "10 20 30 30 40 40 50"
samp "5 2\n10 20 30 40 50\n1 2\n1 3" "10 20 30 30 30 40 40 40 40 50"
samp "2 1\n50 60\n1 1" "50 50 60"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
