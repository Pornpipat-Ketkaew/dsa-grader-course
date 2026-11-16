D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d60_q1_v_uniq student.h
samp "3\n10 20 30" "Result 10 20 30"
samp "5\n3 2 1 2 3" "Result 3 2 1"
samp "10\n5 1 2 3 1 1 2 3 4 5" "Result 5 1 2 3 4"
samp "0\n" "Result"
fuzz 300 $D/gen.py "python3 $D/brute.py"
cp $D/types.cpp $D/pkg/; g++ -O2 -o $D/ty $D/pkg/types.cpp && [ "$($D/ty | tr '\n' '|')" = "b a c |1.5 2 |1000|" ] && echo "string/float/1e6 ok"
echo "PASS samples=$NS fuzz=$NF"
