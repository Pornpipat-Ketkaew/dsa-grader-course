D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d58_q1_erase_many student.h
samp "a 10 0 1 2 3 4 5 6 7 8 9\np\ne 1 1\np\ne 5 0 2 3 4 6\np\na 3 100 200 300\np\nq\n" "0 1 2 3 4 5 6 7 8 9\n0 2 3 4 5 6 7 8 9\n2 6 8 9\n2 6 8 9 100 200 300"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
n=1000000
print('a',n,*range(n)); print('e',n//2,*range(0,n,2)); print('p'); print('q')" > $D/big
g++ -std=c++17 -O2 -o $BIN $D/pkg/main.cpp; timeit $D/big
echo "PASS samples=$NS fuzz=$NF"
