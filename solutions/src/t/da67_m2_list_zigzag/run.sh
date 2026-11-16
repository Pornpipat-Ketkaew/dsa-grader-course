D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg da67_m2_list_zigzag student.h
samp "3\n1 2 3\n3\n4 5 6" "1 4 2 5 3 6"; samp "1\n1\n7\n2 3 4 5 6 7 8" "1 2 3 4 5 6 7 8"
samp "8\n1 2 3 4 5 6 7 8\n5\n65 66 67 68 69" "1 65 2 66 3 67 4 68 5 69 6 7 8"
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
