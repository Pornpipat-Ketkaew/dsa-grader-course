D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg da66_m2_furthest_distance student.h
samp "2\n-6 10" "1"
samp "10\n-1 7 -10 -2 -8 4 1 0 -4 -3" "9"
samp "10\n4 2 8 -3 -5 -7 5 1 -2 -10" "7"
samp "1\n5" "0"
samp "0\n" "-1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast
python3 -c "import random; r=random.Random(7); n=1000000; print(n); print(*r.sample(range(-10**9,10**9),n))" > $D/big.in; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF"
