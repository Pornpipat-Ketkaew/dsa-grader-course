D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg da68_m2_ordered_heap_reconstruction student.h
samp "7\n7 5 6 2 1 4 3" "0"
samp "7\n25 23 19 14 12 6 8" "2"
samp "7\n82 60 45 24 23 13 -2" "None"
samp "15\n15 13 14 10 9 12 11 4 3 1 2 8 7 6 5" "0 4"
samp "1\n42" "None"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
n=2**20-1; v=list(range(n,0,-1)); print(n); print(*v)" > $D/big.in; g++ -std=c++17 -O2 -o $BIN.fast $D/pkg/main.cpp; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
