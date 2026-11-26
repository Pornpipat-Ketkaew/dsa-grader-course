D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog d62_q1a_vote
samp "8 2\nsomchai\nadisak\nsomchai\nyingyos\nsomchai\nadisak\ndirek\nyingyos" "2"
samp "5 3\nsomchai\nsomchai\nsomchai\nsomchai\nyingyos" "1"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
