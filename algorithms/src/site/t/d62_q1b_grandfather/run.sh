D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog d62_q1b_grandfather
samp "5 4\n1 2\n1 3\n2 20\n3 30\n2 21\n1 2\n2 30\n30 20\n20 20" "NO NO YES NO"
samp "3 2\n1110001110001 1110001110002\n1110001110001 1110001110003\n1110001110003 1110001110009\n1334 22\n18273625162 283" "NO NO"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 $D/big.py > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
