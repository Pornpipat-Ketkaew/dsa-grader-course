D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex07e1_nqueen
samp "4" "2"
samp "8" "92"
# every N against the known sequence (OEIS A000170)
K=(0 1 0 0 2 10 4 40 92 352 724 2680 14200)
for n in $(seq 1 12); do samp "$n" "${K[$n]}"; done
fuzz 8 $D/gen.py "python3 $D/brute.py"
echo 12 > $D/big.in; timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
