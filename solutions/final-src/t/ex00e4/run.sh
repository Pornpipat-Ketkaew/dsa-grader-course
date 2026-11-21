D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex00e4
# any order is accepted -> compare SORTED outputs and check there are no duplicates
for ab in "2 5" "1 3" "2 4" "0 2" "0 0" "3 3" "0 5" "5 5" "7 12" "10 20" "1 20" "19 20"; do
  got=$(echo $ab | $BIN | sort); exp=$(echo $ab | python3 $D/brute.py | sort)
  [ "$got" = "$exp" ] || { echo "FAIL $ab"; exit 1; }
  [ "$(echo "$got" | uniq -d | wc -l)" = 0 ] || { echo "DUP $ab"; exit 1; }; NS=$((NS+1))
done
for a in $(seq 0 20); do
  c=$(echo "$a 20" | $BIN.fast | wc -l); e=$(python3 -c "import math; print(math.comb(20,$a))")
  [ $c = $e ] || { echo "COUNT FAIL $a"; exit 1; }
done
echo "10 20" > $D/big.in; timefast $D/big.in
echo "PASS cases=$NS counts=21"
