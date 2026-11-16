D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d62_q2b_stack_deep_push student.h
samp "u 1\nu 2\nu 3\nu 4\np\nd 0 10\nd 5 11\np\no\no\np\nq\n" "Stack size = 4 Data = 1 2 3 4 Stack size = 6 Data = 11 1 2 3 4 10 Stack size = 4 Data = 11 1 2 3"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
