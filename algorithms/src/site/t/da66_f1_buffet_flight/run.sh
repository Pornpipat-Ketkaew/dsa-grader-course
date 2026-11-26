D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_f1_buffet_flight
samp "4 3\n100 1 2 3\n10 20 30 40\n0 1\n1 2\n2 3" "0 11 33 66"
samp "4 6\n1 2 3 4\n9 8 7 6\n0 2\n0 3\n2 3\n1 0\n1 3\n1 2" "0 -1 12 13"
samp "5 10\n5 7 3 4 8\n1 4 4 2 6\n0 3\n0 4\n4 3\n3 4\n0 1\n4 1\n1 2\n2 4\n2 0\n1 0" "0 8 15 5 9"
samp "1 0\n5\n5" "0"
fuzz 300 $D/gen.py "python3 $D/brute.py $D/.."
python3 -c "
import random; random.seed(2); n=2000; print(n,n*n-n); print(*[random.randint(1,1000) for _ in range(n)]); print(*[random.randint(1,1000) for _ in range(n)])
print('\n'.join('%d %d'%(a,b) for a in range(n) for b in range(n) if a!=b))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
