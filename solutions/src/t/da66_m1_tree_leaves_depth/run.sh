D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg da66_m1_tree_leaves_depth student.h
samp "5\n4 2 5 1 3" "5"
samp "0\n" "0"
samp "1\n7" "0"
samp "3\n1 2 3" "2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast
python3 -c "import random; r=random.Random(7); n=500000; print(n); print(*r.sample(range(10**9),n))" > $D/big.in; timeit $D/big.in
# a 30,000-node chain (sorted input): deep recursion still fine; answer = 29999
python3 -c "print(30000); print(*range(30000))" > $D/big.in; [ "$($BIN < $D/big.in)" = 29999 ] || { echo CHAIN FAIL; exit 1; }
echo "PASS samples=$NS fuzz=$NF"
