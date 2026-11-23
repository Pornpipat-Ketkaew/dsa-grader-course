D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex07e2_iss
samp "10" "42"
samp "1" "1"
samp "5" "7"
samp "100" "190569292"
fuzz 30 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
