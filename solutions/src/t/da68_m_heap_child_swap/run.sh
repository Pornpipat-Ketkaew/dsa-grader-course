D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg da68_m_heap_child_swap student.h
samp "1\n7\n10 8 6 7 3 4 5\n0" "Before Swap: 10 8 6 7 3 4 5 After Swap: 10 6 8 4 5 7 3 ----------------"
samp "1\n7\n10 8 6 7 3 4 5\n2" "Before Swap: 10 8 6 7 3 4 5 After Swap: 10 8 6 7 3 5 4 ----------------"
samp "1\n1\n5\n0" "Before Swap: 5 After Swap: 5 ----------------"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); T=20; print(T)
for _ in range(T):
    n=65535; print(n); print(*[random.randint(-10**9,10**9) for _ in range(n)]); print(0)" > $D/big.in; g++ -std=c++17 -O2 -o $BIN.fast $D/pkg/main.cpp; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
