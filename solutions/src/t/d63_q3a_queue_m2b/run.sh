D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d63_q3a_queue_m2b student.h
samp "u 1\nu 2\nu 3\nu 4\no\nm 0\np\nm 1\np\nq\n" "Size 3: 3 4 2 Size 3: 3 2 4"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
