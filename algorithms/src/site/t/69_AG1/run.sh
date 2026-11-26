D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog 69_AG1
samp "2 3\n2 2 1" "5 AA AB AC BB BC"
samp "3 2\n2 1" "2 AAB ABA"
samp "4 3\n2 0 2" "4 AACC ACAC ACCA CAAC"
samp "3 26\n10000000000010000000000001" "3 AMZ AZM MAZ"
samp "4 2\n1 1" "0"
samp "1 1\n1" "1 A"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# largest allowed output: 9 distinct beads out of 9 kinds -> 9!/2 = 181440 > 100000, so use
# 8 distinct + one repeated letter: 9!/2/2 = 90720 bracelets
echo "9 9 211111110" > $D/big.in; timefast $D/big.in; [ "$($BIN.fast < $D/big.in | head -1)" = "90720" ] || { echo "FAIL big count"; exit 1; }
# many kinds: N = 6, K = 26 with c = 1 for the first 6 letters
echo "6 26 11111100000000000000000000" > $D/big2.in; timefast $D/big2.in
# N = 4, K = 20, every count 4: 20^4 strings, about 80 000 bracelets
echo "4 20 44444444444444444444" > $D/big3.in; timefast $D/big3.in
echo "PASS samples=$NS fuzz=$NF"
