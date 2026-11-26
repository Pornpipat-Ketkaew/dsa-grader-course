D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog 69_AG3
samp "2 1\n20 45\n0 1 60" "65.00"
samp "5 7\n12 46 -3 -20 67\n0 1 30\n0 2 20\n0 4 18\n1 4 12\n2 3 24\n2 4 14\n3 4 27" "265.69"
samp "12 30\n127 -81 -35 144 -20 80 139 165 28 -81 133 39\n0 3 157\n0 7 61\n3 1 90\n3 9 101\n1 4 119\n3 5 91\n9 2 97\n3 10 34\n7 11 79\n9 8 116\n11 6 67\n9 11 80\n4 11 74\n7 8 63\n7 2 129\n3 8 113\n7 1 44\n1 10 43\n2 6 115\n3 7 129\n10 8 120\n1 2 104\n8 6 129\n4 10 142\n1 11 124\n4 6 120\n5 8 80\n1 6 149\n0 6 151\n10 11 144" "2281.50"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# n = 100, every pair measured (4 950 lines)
python3 $D/big.py > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
