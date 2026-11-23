D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f_game_of_trades
samp "3 2 3\n1 5\n2 1\n5 3\n2 7\n1 3\n4 2\n1 1\n2 1\n0 3" "14"
samp "4 3 32\n461 710 494\n890 729 824\n279 507 263\n100 750 869\n212 167 25\n521 792 154\n563 425 361\n252 211 638\n509 150 252\n748 939 476\n795 793 515\n626 412 641" "14816"
samp "1 1 5\n1\n1000\n7" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); N=M=1000; print(N,M,10**9)
for t in range(2):
    for i in range(N): print(*[random.randint(1,1000) for _ in range(M)])
for i in range(N): print(*[random.randint(0,1000) for _ in range(M)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
