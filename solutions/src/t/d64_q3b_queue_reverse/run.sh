D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d64_q3b_queue_reverse student.h
samp "9 1 4\n1 2 3 4 5 6 7 8 9" "size of q = 9 1 5 4 3 2 6 7 8 9"
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
samp "5 0 4 3\n99 88 11 33 22" "22 33 11 88 99"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
