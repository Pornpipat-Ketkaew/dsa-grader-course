D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg da68_m_count_value student.h
samp "5 3\n10 5\n2 6\n9 9\n-1 0\n4 2\n-10 10\n0 5\n1 10" "5 3 4"
# repeated keys overwrite: data[1] ends as 7
samp "3 2\n1 3\n1 7\n2 3\n3 3\n7 7" "1 1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=m=200000; print(n, m)
print('\n'.join(f'{random.randint(-10**9,10**9)} {random.randint(-10**9,10**9)}' for _ in range(n)))
print('\n'.join(f'{a} {a+random.randint(0,10**8)}' for a in (random.randint(-10**9,10**9) for _ in range(m))))" > $D/big.in
g++ -std=c++17 -O2 -o $BIN.fast $D/pkg/main.cpp; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
