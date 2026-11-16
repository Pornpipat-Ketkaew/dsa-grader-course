D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d63_q3a_rank_in_heap student.h
samp "5 5\n1 2 3 4 5\n0 1 2 3 4" "0 1 3 4 2"
samp "5 5\n1 1 1 1 1\n0 1 2 3 4" "0 0 0 0 0"
cp $D/selfcheck.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $D/sc $D/pkg/selfcheck.cpp && $D/sc
python3 -c "
n=20000; print(n,n); print(*range(n)); print(*range(n))" > $D/big.in; g++ -std=c++17 -O2 -o $BIN.fast $D/pkg/main.cpp; timefast $D/big.in
echo "PASS samples=$NS selfcheck=6000 heaps"
