D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d58_q3_unary student.h
samp "5\n1 2 3 4 5" "Size = 1 unary_count = 0 Size = 2 unary_count = 1 Size = 3 unary_count = 2 Size = 4 unary_count = 3 Size = 5 unary_count = 4"
samp "8\n5 3 1 2 9 7 6 8" "Size = 1 unary_count = 0 Size = 2 unary_count = 1 Size = 3 unary_count = 2 Size = 4 unary_count = 3 Size = 5 unary_count = 2 Size = 6 unary_count = 3 Size = 7 unary_count = 4 Size = 8 unary_count = 3"
samp "3\n4 4 4" "Size = 1 unary_count = 0 Size = 1 unary_count = 0 Size = 1 unary_count = 0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# worst case: 5000 increasing keys -> a chain, count_unary after every insert = O(n^2) node visits
python3 -c "print(5000); print(*range(5000))" > $D/big.in; g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast; timeit $D/big.in
python3 -c "import random; r=random.Random(3); print(5000); print(*r.sample(range(10**6),5000))" > $D/big2.in; timeit $D/big2.in
rm -f $D/big2.in; echo "PASS samples=$NS fuzz=$NF"
