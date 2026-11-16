D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
pkg d58_q2_custom song.h
samp "5\nQueen Jazz 10\nQueen Bohemian 10\nTSquare Omen 10\nTSquare Takarajima 15\nBeatles Yesterday 3" "$(printf '5\nQueen Jazz 10\nQueen Bohemian 10\nTSquare Omen 10\nTSquare Takarajima 15\nBeatles Yesterday 3\n' | python3 $D/brute.py)"
fuzz 300 $D/gen.py "python3 $D/brute.py"
echo "PASS samples=$NS fuzz=$NF"
