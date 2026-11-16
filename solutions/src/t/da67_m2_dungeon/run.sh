D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da67_m2_dungeon
samp "1 1 10 1\n1 0\n1 0" "1"
samp "1 1 10 2\n1 1\n1 0" "0"
samp "3 5 100 10\n1 0\n4 9\n13 5\n95 0\n2 1\n3 0 9 5\n1 0\n1 1" "1"
samp "3 5 100 10\n1 0\n4 9\n13 5\n40 0\n2 1\n3 0 9 5\n1 0\n1 1" "3"
samp "2 1 5 1\n3 0\n0\n0" "2"
fuzz 400 $D/gen.py "python3 $D/brute.py"
# N = D = 100,000, every boss needs 100 items (10^7 numbers to read), Z = 1000
python3 -c "
import random; r=random.Random(4); N=D=100000; Z=1000; print(N,D,10**9,Z)
print('\n'.join(f'{r.randint(0,20000)} {r.randrange(Z)}' for _ in range(D)))
print('\n'.join('100 '+' '.join(str(x) for x in r.sample(range(Z),100)) for _ in range(N)))" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
