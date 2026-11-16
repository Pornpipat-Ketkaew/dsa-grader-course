D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/m
pkg d58_q3_list_replace replace.h
[ "$($BIN | tail -1)" = "Right" ] && echo "starter main: Right"
sed '/^int main/,$d' $D/pkg/main.cpp > $D/pkg/base.h; cp $D/harness.cpp $D/pkg/
BIN=$D/a; g++ -std=c++17 -O2 -fsanitize=address,undefined -o $BIN $D/pkg/harness.cpp
samp "6 9 2 2 4 2 7\n2 3 3 2 1" "12: 9 3 2 1 3 2 1 4 3 2 1 7 | 7 1 2 3 4 1 2 3 1 2 3 9 | y 3 122"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
