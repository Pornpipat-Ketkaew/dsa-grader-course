D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg da67_m2_queue_insert_shuffle student.h
samp "5 4 2\n1 3 5 7 9\n10 20 30 40" "1 3 10 5 20 7 30 9 40"
samp "5 5 0\n10 20 30 40 50\n5 4 3 2 1" "5 10 4 20 3 30 2 40 1 50"
samp "10 2 10\n1 3 5 7 11 13 17 19 23 29\n3 4" "1 3 5 7 11 13 17 19 23 29 3 4"
cp $D/pkg/main.cpp $D/pkg/m2.cpp; g++ -O2 -o $BIN.fast $D/pkg/m2.cpp; python3 $D/big.py > $D/big.in; timefast $D/big.in
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
