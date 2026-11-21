D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a60a_q3_component
samp "4 3\n1 2\n2 3\n3 1" "2"; samp "5 0" "5"; samp "5 1\n1 2" "4"; samp "5 2\n1 2\n4 5" "3"
samp "10 7\n1 2\n2 3\n3 4\n1 3\n2 4\n5 6\n6 7" "5"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
print(10000,9999)
for i in range(1,10000): print(i,i+1)" > $D/big.in
samp "$(cat $D/big.in)" "1"
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF (incl. a 10,000-node chain: deep recursion)"
