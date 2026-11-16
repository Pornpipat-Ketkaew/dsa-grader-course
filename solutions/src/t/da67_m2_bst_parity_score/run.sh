D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg da67_m2_bst_parity_score student.h
samp "10 3\n12 7 18 1 15 3 17 2 5 16" "3"
samp "10 0\n12 7 18 1 15 3 17 2 5 16" "1"
samp "10 2\n7 4 9 2 5 8 10 1 3 6" "1"
samp "10 2\n12 7 18 1 15 3 17 2 5 16" "1"
samp "10 4\n12 7 18 1 15 3 17 2 5 16" "2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast
python3 -c "import random; r=random.Random(7); n=500000; print(n, 60); print(*r.sample(range(2*10**9),n))" > $D/big.in; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF"
