D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d64_q4a_list_merge student.h
cp $D/pkg/main.cpp $D/pkg/m2.cpp; g++ -O2 -o $BIN.fast $D/pkg/m2.cpp; python3 $D/big.py > $D/big.in; timefast $D/big.in
BIN=$D/a; cp $D/harness.cpp $D/pkg/; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
samp "3 4\n1 2 3\n3 10 20 30\n1 100\n0\n3 990 991 992" "10: 1 2 3 10 20 30 100 990 991 992 | 992 991 990 100 30 20 10 3 2 1 ls 4: 0e 0e 0e 0e"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
