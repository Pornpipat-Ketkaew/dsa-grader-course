D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog ex07e3_coloring
samp "4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3" "4"
samp "1 0" "1"
samp "5 5\n0 1\n1 2\n2 3\n3 4\n4 0" "3"
fuzz 300 $D/gen.py "python3 $D/brute.py"
# hard-ish cases: n = 50 random graphs of several densities, checked against a slow exact search once
for p in 10 30 50 70 90; do
python3 -c "
import random; random.seed($p); n=50; E=[(a,b) for a in range(n) for b in range(a+1,n) if random.random()<$p/100]
print(n,len(E)); [print(a,b) for a,b in E]" > $D/big$p.in
echo "p=$p: $($BIN.fast < $D/big$p.in)"; timefast $D/big$p.in
done
# Mycielski graph M5 (23 vertices, no triangle, needs 5 colours): a classic hard case
python3 $D/myc.py > $D/bigm.in; samp "$(cat $D/bigm.in)" "5"; timefast $D/bigm.in
echo "PASS samples=$NS fuzz=$NF"
