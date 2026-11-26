D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog 69_AG4
samp "5 6 1\n1 2 4\n1 3 2\n2 4 5\n3 4 8\n4 5 3\n2 5 10" "4"
samp "4 3 1\n1 3 1\n2 3 100\n2 4 5" "6"
samp "8 7 2\n1 2 8\n1 4 20\n3 4 2\n3 8 10\n2 4 10\n6 7 0\n4 5 1" "2"
samp "3 2 5\n1 2 7\n2 3 4" "0"
samp "1 0 0" "0"
samp "2 1 0\n1 2 1000000000" "1000000000"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# N = M = 100 000, K = 20 (2.1 million states): a long chain with shortcuts, and a deep random tree
python3 $D/big.py 1 > $D/big.in; timefast $D/big.in
python3 $D/big.py 2 > $D/big2.in; timefast $D/big2.in
echo "PASS samples=$NS fuzz=$NF"
