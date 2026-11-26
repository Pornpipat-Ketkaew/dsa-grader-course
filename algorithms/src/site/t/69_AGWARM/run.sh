D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog 69_AGWARM
samp "2 2\n0 0\n3 1" "3"
samp "3 3\n0 2 0\n3 1 0\n2 0 1" "3"
samp "6 7\n0 1 2 2 1 0 0\n2 1 1 2 1 3 0\n0 1 3 1 2 1 2\n2 3 2 1 3 2 1\n2 2 2 1 3 2 2\n2 1 2 0 3 2 0" "8"
samp "1 1\n3" "1"
# every cell walled off: 10 000 colors
python3 -c "print(100,100); [print(*[3]*100) for _ in range(100)]" > $D/all3.in; [ "$(timeout 5 $BIN < $D/all3.in)" = "10000" ] || { echo "FAIL all3"; exit 1; }
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 $D/big.py > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
