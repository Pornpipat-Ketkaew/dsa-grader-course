D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg 69_DS3 student.h
samp "4 6\n1 2 3 4\n5 0 6 -2 8 -9\nl A\nl B\nf A B\nl A\nl B\nq" "1 2 3 4 5 0 6 -2 8 -9 5 0 7 11 -5"
samp "5 2\n1 2 3 4 5\n-3 8\nl A\nl B\nf A B\nl A\ni B 7\ni B 7\nf A B\nl A\ns A\nq" "1 2 3 4 5 -3 8 1 2 3 1 13 1 2 3 8 20 5 1 20"
samp "3 0\n5 -5 2\nl A\nf A A\nl A\ni B 10\ni B -4\nf A B\nl A\nq" "5 -5 2 10 -10 4 10"
samp "0 0\nf A B\ni A 0\nf A B\nl A\nq" "0"
fuzz 400 $D/gen.py "python3 $D/brute.py"
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
[ "$($BIN)" = OK ] || { echo "ADDRESS FAIL"; exit 1; }
# A has 500,000 elements; 100,000 commands alternate "push one into B" and "fuse B into A".
# An O(max(n, m)) fusion would do 5*10^10 steps here; O(m) does about 10^5.
python3 -c "
import random; r=random.Random(2); a=500000; print(a,0)
print(*[r.randint(-10**6,10**6) for _ in range(a)])
for i in range(50000): print('i B', r.randint(1,9)); print('f A B')
print('s A'); print('q')" > $D/big.in
g++ -std=c++17 -O2 -o $D/m.fast $D/pkg/main.cpp; BIN=$D/m.fast; timeit $D/big.in
echo "PASS samples=$NS fuzz=$NF harness=20000"
