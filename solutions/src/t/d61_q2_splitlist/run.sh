D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d61_q2_splitlist student.h
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
samp "7 1 7 9 10 2 6 3\n2 1 2\n3 3 4 5" "0: | 6: 1 2 1 7 9 10 | 10 9 7 1 2 1 6: 3 4 5 2 6 3 | 3 6 2 5 4 3 same nodes 1: 5 | 5"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
