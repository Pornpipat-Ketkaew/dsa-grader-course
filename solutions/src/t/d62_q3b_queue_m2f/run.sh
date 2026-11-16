D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d62_q3b_queue_m2f student.h
samp "u 1\nu 2\nu 3\nu 4\no\nm 1\np\nm 2\np\nq\n" "Size 3: 3 2 4 Size 3: 4 3 2"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
