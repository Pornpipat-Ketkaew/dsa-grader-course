D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a59_q3_cycle
samp "9\n0 1\n0 2\n1 3\n1 4\n2 5\n2 6\n2 7\n4 5\n5 8" "5"
samp "3\n0 1\n1 2\n2 0" "3"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
n=100000; print(n)
for i in range(n): print(i,(i+1)%n)" > $D/big.in
samp "$(cat $D/big.in)" "100000"
python3 -c "
n=100000; print(n)
for i in range(1,n): print(i-1,i)
print(0,n-1)" > $D/big2.in
samp "$(cat $D/big2.in)" "100000"
python3 -c "
n=100000; print(n)
for i in range(1,n): print(i-1,i)
print(n-3,n-1)" > $D/big3.in
samp "$(cat $D/big3.in)" "3"
timefast $D/big3.in
echo "PASS samples=$NS fuzz=$NF"
