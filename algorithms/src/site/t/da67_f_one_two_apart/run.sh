D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da67_f_one_two_apart
samp "1" "3"
samp "2" "7"
samp "3" "15"
samp "15" "198799"
samp "214" "89208675"
samp "545782" "8393098"
fuzz 12 $D/gen.py "python3 $D/brute.py"
echo 1000000 > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
