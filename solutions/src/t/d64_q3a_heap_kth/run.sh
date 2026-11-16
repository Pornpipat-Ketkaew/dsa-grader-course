D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d64_q3a_heap_kth student.h
samp "1\n1 3\n7\n5 1 9 3 7 2 8" "9 8 7"
samp "3\n1 3\n7\n5 1 9 3 7 2 8" "1 2 3"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "4 1000000 100000" > $D/big.in; g++ -std=c++17 -O2 -o $BIN.fast $D/pkg/main.cpp; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
