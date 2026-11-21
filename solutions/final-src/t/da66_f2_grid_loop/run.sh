D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_f2_grid_loop
samp "2 3\n4 1 5\n3 1 6" "1 6"
samp "4 4\n4 5 4 5\n2 2 3 6\n2 3 1 5\n3 1 1 6" "2 12"
samp "4 5\n4 1 5 1 2\n2 1 3 5 3\n3 1 1 6 4\n1 2 4 1 6" "1 10"
samp "1 1\n1" "0"; samp "2 2\n4 5\n3 6" "1 4"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
R=C=1000; print(R,C)
for r in range(R):
    row=[]
    for c in range(C):
        top=r==0; bot=r==R-1; lef=c==0; rig=c==C-1
        row.append(4 if top and lef else 5 if top and rig else 3 if bot and lef else 6 if bot and rig else 1 if top or bot else 2 if lef or rig else 4 if (r+c)%2==0 else 6)
    print(*row)" > $D/big.in
timefast $D/big.in
[ "$($BIN.fast < $D/big.in | cut -d' ' -f2)" = "3996" ] || { echo "big loop length wrong"; $BIN.fast < $D/big.in; exit 1; }
python3 -c "
import random; random.seed(3); R=C=1000; print(R,C)
for r in range(R): print(*[random.randint(1,6) for _ in range(C)])" > $D/big2.in
samp "$(cat $D/big2.in)" "$(python3 $D/brute.py < $D/big2.in)"
timefast $D/big2.in
echo "PASS samples=$NS fuzz=$NF"
