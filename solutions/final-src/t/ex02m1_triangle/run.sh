D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex02m1_triangle
samp "2\n10\n20 3" "30"; samp "1\n9" "9"; samp "5\n7\n3 8\n8 1 0\n2 7 4 4\n4 5 2 6 5" "30"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
print(100)
for i in range(1,101): print(*([1000]*i))" > $D/big.in
samp "$(cat $D/big.in)" "100000"
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
