D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex00e3
samp "4\n4 1 3 2" "YES"; samp "7\n-1 -2 3 0 2 3 4" "NO"; samp "5\n5 4 3 1 3" "NO"; samp "1\n1" "YES"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
