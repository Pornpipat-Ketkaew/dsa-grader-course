D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
# build the official main_dense.cpp with our header (sanitized, and plain -O2 for timing)
rm -rf $D/pkg; mkdir -p $D/pkg; cp $D/../../../code/d57_q1_dense/* $D/pkg/; cp $D/../../sol/d57_q1_dense/densegraph.h $D/pkg/
g++ -std=c++17 -O2 -Wall -fsanitize=address,undefined -o $BIN $D/pkg/main_dense.cpp 2>&1 | grep -E "error|graph.h.*warning" && exit 1
g++ -std=c++17 -O2 -o $BIN.fast $D/pkg/main_dense.cpp
EXP=$($BIN.fast <<< 1 | grep -o "YES.*" || true); [ -n "$EXP" ] || { echo "case 1 FAIL"; exit 1; }
# official cases 1..10 must all print the YES line
for c in $(seq 10); do out=$(echo $c | timeout 20 $BIN); [ "$out" = "$EXP" ] || { echo "case $c FAIL: $out"; exit 1; }; NS=$((NS+1)); done
s=$(date +%s.%N); for c in 8 10; do echo $c | $BIN.fast > /dev/null; done; echo "time cases 8+10: $(echo "$(date +%s.%N) - $s" | bc)s"
g++ -std=c++17 -O2 -fsanitize=address,undefined -I$D/pkg -o $D/fz $D/fuzz.cpp
for s in $(seq 20); do [ "$($D/fz $s)" = "OK" ] || { echo "FUZZ FAIL seed $s"; exit 1; }; done; NF=4000
echo "PASS samples=$NS fuzz=$NF"
