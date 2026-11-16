D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d64_q4a_subtree student.h
samp "5\n50 30 70 20 40" "return: 50:0 main tree: ======== size = 1 ========= ()50:0[] left tree: ======== size = 3 ========= (()40:4[])30:1[()20:3[]] right tree: ======== size = 1 ========= ()70:2[]"
samp "0\n" "return: 0:0 main tree: ======== size = 0 ========= left tree: ======== size = 0 ========= right tree: ======== size = 0 ========="
samp "3\n1 2 3" "return: 1:0 main tree: ======== size = 1 ========= ()1:0[] left tree: ======== size = 0 ========= right tree: ======== size = 2 ========= (()3:2[])2:1[]"
fuzz 300 $D/gen.py "python3 $D/brute.py"
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
for s in $(seq 200); do r=$(python3 $D/gen.py $s | $BIN); [ "$r" = OK ] || { echo "HARNESS FAIL $s"; exit 1; }; done
# timing: a 200000-node tree (keys inserted in random order) -- process() visits each node once
python3 -c "
import random; r=random.Random(1); n=200000; a=r.sample(range(1,10**9),n); print(n); print(*a)" > $D/big.in
BIN=$D/m; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF harness=200"
