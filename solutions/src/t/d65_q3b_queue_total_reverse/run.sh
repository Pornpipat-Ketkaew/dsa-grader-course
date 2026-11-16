D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d65_q3b_queue_total_reverse student.h
samp "5\n10 20 30 40 50" "50 40 30 20 10"
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp; g++ -O2 -o $BIN.fast $D/pkg/harness.cpp
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 $D/big.py > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
