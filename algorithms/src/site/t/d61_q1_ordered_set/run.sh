D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d61_q1_ordered_set student.h
samp "" "4 6 9 0 7 3 2 5 9 1 6"
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
