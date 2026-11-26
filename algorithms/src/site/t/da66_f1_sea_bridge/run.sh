D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da66_f1_sea_bridge
samp "3 5\n0 0 0 0 0\n0 2 0 0 1\n0 0 0 0 0" "4"
samp "5 5\n2 2 2 0 0\n0 0 0 1 1\n0 0 0 0 1\n2 0 0 0 0\n2 0 0 1 1" "3"
samp "5 5\n0 2 2 3 0\n0 0 3 1 1\n0 0 3 0 1\n2 0 0 0 0\n2 0 3 1 1" "5"
samp "3 3\n1 0 2\n1 2 0\n1 0 2" "2"
samp "3 3\n1 2 1\n2 1 2\n1 2 1" "2"
samp "5 5\n0 2 0 0 0\n3 3 3 3 0\n0 0 0 0 0\n0 3 3 3 3\n0 0 0 0 1" "16"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import sys; R=C=5000; o=sys.stdout
o.write('%d %d\n'%(R,C))
row0='1 '+' '.join(['0']*(C-1))+'\n'; row='0 '*(C-1)+'0\n'; last=' '.join(['0']*(C-1))+' 2\n'
o.write(row0)
for r in range(R-2): o.write(row)
o.write(last)" > $D/big.in
samp "$(head -c 0 /dev/null)5 5\n1 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 0\n0 0 0 0 2" "9"
timefast $D/big.in
[ "$($BIN.fast < $D/big.in)" = "9999" ] || { echo "big wrong"; exit 1; }
echo "PASS samples=$NS fuzz=$NF"
