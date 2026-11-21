D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a64_q1_permu_before
samp "3 0" "0 1 2 0 2 1 1 0 2 1 2 0 2 0 1 2 1 0"
samp "3 1\n1 2" "0 1 2 1 0 2 1 2 0"
samp "3 2\n1 2\n0 1" "0 1 2"
samp "4 2\n3 2\n2 1" "0 3 2 1 3 0 2 1 3 2 0 1 3 2 1 0"
samp "4 2\n3 2\n0 1" "0 1 3 2 0 3 1 2 0 3 2 1 3 0 1 2 3 0 2 1 3 2 0 1"
samp "2 2\n0 1\n1 0" ""
fuzz 300 $D/gen.py "python3 $D/brute.py"
# n = 11 with 5 rules -> 11!/2^5 = 1,247,400 lines
python3 -c "print(11,5); [print(2*i,2*i+1) for i in range(5)]" > $D/big.in; timefast $D/big.in
[ $($BIN.fast < $D/big.in | wc -l) = 1247400 ] || { echo COUNT FAIL; exit 1; }
# n = 20, chain 0<1<...<19: pruning makes this instant (only 1 answer out of 20! orders)
python3 -c "print(20,19); [print(i,i+1) for i in range(19)]" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
