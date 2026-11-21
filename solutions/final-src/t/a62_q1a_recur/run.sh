D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a62_q1a_recur
samp "3 3" "3 2 2 1 2 1 1 0 4 3 3 2 3 2 2 1 4 3 3 2 3 2 2 1 5 4 4 3 4 3 3 2 4 3 3 2 3 2 2 1 5 4 4 3 4 3 3 2 5 4 4 3 4 3 3 2 6 5 5 4 5 4 4 3"
samp "0 0" "0"
samp "1 0" "0 -1 1 0"
samp "1 5" "5 4 6 5"
samp "2 1" "1 0 0 -1 2 1 1 0 2 1 1 0 3 2 2 1"
samp "2 7" "7 6 6 5 8 7 7 6 8 7 7 6 9 8 8 7"
for a in 0 1 2 3 4 5 6 7 8; do for b in -100 -3 0 42 100; do
  [ "$(echo $a $b | $BIN | norm)" = "$(echo $a $b | python3 $D/brute.py | norm)" ] || { echo "FAIL $a $b"; exit 1; }; NS=$((NS+1)); done; done
echo "8 -100" > $D/big.in; timefast $D/big.in
echo "PASS cases=$NS"
