D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
g++ -std=c++17 -O2 -Wno-unused-result -fsanitize=address,undefined -x c++ -o $BIN $D/../../sol/ds03_heap_erase/attachment.h
samp "i 5\ni 3\ni 2\ni 1\nq\n" "5 3 2 1"
samp "i 1\ni 2\ni 3\ni 4\ni 5\nd 2\nq\n" "5 4 3 1"
samp "i 1\ni 5\ni 2\ni 10\ni 15\ni 3\nd 10\nq\n" "15 5 3 2 1"
samp "i 5\ni 3\ni 7\ni 1\ni 2\nd 3\ni 13\nx\nx\nd 2\nq\n" "5 1"
samp "i 5\ni 3\nd 99\nq\n" "5 3"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
