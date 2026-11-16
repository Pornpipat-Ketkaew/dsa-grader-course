D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog d57_q3_zuma
samp "3 1 10\n2 3 4" "2 10 3 4"; samp "5 1 4\n1 1 1 1 1" "1 4 1 1 1 1"; samp "7 2 4\n1 1 4 4 4 1 1" ""
samp "10 5 4\n1 3 1 4 4 1 1 5 5 5" "1 3 5 5 5"
fuzz 400 $D/gen.py "python3 $D/brute.py"
python3 $D/big.py > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
