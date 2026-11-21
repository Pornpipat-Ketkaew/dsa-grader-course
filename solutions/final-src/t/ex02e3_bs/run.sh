D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex02e3_bs
samp "10 8\n10 13 14 14 14 15 16 16 18 200\n9 10 11 14 0 200 20 16" "-1 0 0 4 -1 9 8 7"
samp "5 3\n7 7 7 7 7\n6 7 8" "-1 4 4"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=m=100000
A=sorted(random.randint(1,1000000) for _ in range(n)); print(n,m); print(*A); print(*[random.randint(0,1000001) for _ in range(m)])" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
