D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d63_q4a_leaves_count student.h
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
samp "1\n10" "Leaves = 0 Leaves = 1"
samp "5\n3 1 2 4 5" "Leaves = 0 Leaves = 1 Leaves = 1 Leaves = 1 Leaves = 2 Leaves = 2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
