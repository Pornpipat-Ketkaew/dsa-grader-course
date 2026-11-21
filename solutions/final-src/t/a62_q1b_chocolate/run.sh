D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a62_q1b_chocolate
samp "4 2\n1 3" "3"; samp "10 2\n1 2" "89"; samp "10 5\n1 2 4 6 8" "196"; samp "999 5\n1 2 4 50 999" "450619"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "10000 10
1 2 3 4 5 6 7 8 9 10" > $D/big.in
samp "$(cat $D/big.in)" "$(python3 -c "
w=[1]+[0]*10000
for i in range(1,10001): w[i]=sum(w[i-s] for s in range(1,11) if s<=i)%1000003
print(w[10000])")"
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
