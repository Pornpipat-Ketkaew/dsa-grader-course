D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg da66_m1_queue_remove_many student.h
samp "10 5\n1 2 3 4 5 6 7 8 9 10\n2 4 6 7 9" "Size 5: 1 2 4 6 9"
samp "5 3\n1 2 3 4 5\n3 0 2" "Size 2: 2 5"
cp $D/pkg/main.cpp $D/pkg/m2.cpp; g++ -O2 -o $BIN.fast $D/pkg/m2.cpp; python3 $D/big.py > $D/big.in; timefast $D/big.in
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
