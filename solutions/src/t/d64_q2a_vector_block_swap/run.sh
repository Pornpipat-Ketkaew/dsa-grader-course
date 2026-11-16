D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d64_q2a_vector_block_swap student.h
samp "8\n10 20 30 40 50 60 70 80\n5 1 2" "result is 1 Size of v is 8 v: 10 60 70 40 50 20 30 80"
samp "8\n10 20 30 40 50 60 70 80\n1 2 2" "result is 0 Size of v is 8 v: 10 20 30 40 50 60 70 80"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
