D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d60_q1_qat student.h
samp "a 10\na 20\na 30\na 40\na 50\np\nk 0\nk 1\nk -1\nd\nd\np\nk 0\nk 1\nk -1\nq" "Queue size = 5 Data = 10 20 30 40 50 Data at 0 is 10 Data at 1 is 20 Data at -1 is 50 Queue size = 3 Data = 30 40 50 Data at 0 is 30 Data at 1 is 40 Data at -1 is 50 Exit"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
