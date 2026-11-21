D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex00e5
samp "3 2" "011 110 111"
samp "4 2" "0011 0110 0111 1011 1100 1101 1110 1111"
# the PDF prints this sample without 11100, which clearly has 3 consecutive ones (a typo in the PDF)
samp "5 3" "00111 01110 01111 10111 11100 11101 11110 11111"
for nk in "0 0" "1 0" "1 1" "3 0" "3 3" "6 1" "8 4" "10 10" "12 5" "15 2" "20 20" "20 7"; do
  [ "$(echo $nk | $BIN.fast)" = "$(echo $nk | python3 $D/brute.py)" ] || { echo "FAIL $nk"; exit 1; }; NS=$((NS+1))
done
echo "20 0" > $D/big.in; timefast $D/big.in
echo "20 1" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS"
