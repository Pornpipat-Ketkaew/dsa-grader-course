D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_m1_heap_before_node
samp "6 4" "5 0 1 2 3 5"; samp "10 0" "0"; samp "12 11" "11 0 1 2 3 4 5 6 7 8 9 10"
samp "100 4" "69 0 1 2 3 5 6 7 8 11 12 13 14 15 16 17 18 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 95 96 97 98 99"
fuzz 200 $D/gen.py "python3 $D/brute.py"
echo "500000 499999" > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
