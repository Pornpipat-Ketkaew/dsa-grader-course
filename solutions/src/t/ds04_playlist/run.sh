D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
g++ -std=c++17 -O2 -Wno-unused-result -fsanitize=address,undefined -x c++ -o $BIN $D/../../sol/ds04_playlist/attachment.h
samp "5\naa\nbb\ncc\ndd\nee\n2\n2\n4\n0" "cc ee aa bb dd dd bb aa ee cc"
samp "4\nA\nB\nC\nD\n1\n2\n4" "A B D C C D B A"
samp "4\nA\nB\nC\nD\n2\n1\n2\n0" "B C A D D A C B"
samp "5\nA\nB\nC\nD\nE\n2\n1\n3\n5" "A C E B D D B E C A"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
