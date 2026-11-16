D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
g++ -O2 -Wall -fsanitize=address,undefined -o $BIN $D/../../sol/ds00_reverse2/main.cpp
samp "6\n10 20 30 40 50 60\n1 4" "10 50 40 30 20 60"
samp "1\n7\n0 0" "7"
samp "4\n1 2 3 4\n0 3" "4 3 2 1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
