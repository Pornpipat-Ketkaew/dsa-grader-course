D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog 69_AG2
samp "1" "0"; samp "2" "3"; samp "4" "11"; samp "6" "41"; samp "10" "571"; samp "36" "558008386"
samp "3" "0"; samp "999999" "0"
fuzz 200 $D/gen.py "python3 $D/brute.py"
# n = 1 000 000 against the profile DP
echo 1000000 > $D/big.in; timefast $D/big.in
[ "$($BIN.fast < $D/big.in)" = "$(python3 $D/brute.py < $D/big.in)" ] || { echo "FAIL big"; exit 1; }
echo "PASS samples=$NS fuzz=$NF"
