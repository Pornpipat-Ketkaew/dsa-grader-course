D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog a64_q3_shortest_start
samp "5 4 2\n4\n0 1\n0 1 1\n1 2 1\n2 4 1\n3 4 2" "2"
samp "6 6 4\n5\n4 3 0 1\n0 1 10\n1 2 5\n1 3 7\n2 5 -4\n3 2 2\n1 4 8" "-2"
samp "1 1 1\n0\n0\n0 0 5" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# n = 5000, m = 100000, negative weights on a DAG order (no cycles at all), k = 1
python3 $D/big.py 1 > $D/big.in; timefast $D/big.in
# a long chain 4999 -> ... -> 0 listed in the worst order for Bellman-Ford, plus random forward edges
python3 $D/big.py 2 > $D/big2.in; timefast $D/big2.in
echo "PASS samples=$NS fuzz=$NF"
