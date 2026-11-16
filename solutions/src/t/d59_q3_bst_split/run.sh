D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d59_q3_bst_split student.h
# the given main.cpp: splits {30,70,40,20,10,80,50,60,90,100} at 70 and must print OK
out=$($BIN); echo "$out" | tail -1 | grep -qx OK || { echo "MAIN FAIL"; echo "$out"; exit 1; }; echo "$out" | grep -q "parent of" && { echo "PARENT FAIL"; exit 1; }
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
samp "6\n10 20 30 40 50 60\n25" "(()20:-20[])10:-10[] (((()60:-60[])50:-50[])40:-40[])30:-30[] OK"
samp "6\n10 20 30 40 50 60\n40" "((()30:-30[])20:-20[])10:-10[] ((()60:-60[])50:-50[])40:-40[] OK"
samp "0\n\n5" "OK"
fuzz 300 $D/gen.py "python3 $D/brute.py"
cp $D/big.cpp $D/pkg/; g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/big.cpp; s=$(date +%s.%N); $D/m.fast; echo "200k splits: $(echo "$(date +%s.%N) - $s" | bc)s"
echo "PASS samples=$NS fuzz=$NF"
