D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog d62_q3a_heap_descendant
samp "3 0" "3 0 1 2"; samp "2 0" "2 0 1"; samp "7 2" "3 2 5 6"; samp "6 2" "2 2 5"
samp "5478 214" "31 214 429 430 859 860 861 862 1719 1720 1721 1722 1723 1724 1725 1726 3439 3440 3441 3442 3443 3444 3445 3446 3447 3448 3449 3450 3451 3452 3453 3454"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "200000 0" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
