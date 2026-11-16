D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d63_q2b_vector_compress student.h
samp "5\n1 2 3 4 5" "mSize of v is 5 mCap of v is 5 1 2 3 4 5"
samp "0\n" "mSize of v is 0 mCap of v is 0"
fuzz 200 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
