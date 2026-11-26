D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da68_f2_sackknap
samp "3 10\n5 100\n5 50\n2 20" "150"
samp "5 20\n6 10\n6 10\n6 10\n6 10\n3 5" "-1"
samp "20 100\n12 50\n15 80\n10 30\n8 25\n20 100\n7 20\n5 15\n25 120\n18 70\n14 55\n6 18\n9 35\n11 45\n13 60\n17 85\n4 12\n16 75\n22 95\n3 10\n21 110" "363"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=V=10000; print(n,V); [print(random.randint(1,V), random.randint(1,10**9)) for _ in range(n)]" > $D/big.in
timefast $D/big.in
python3 -c "
n=V=10000; print(n,V); [print(1, 10**9) for _ in range(n)]" > $D/big2.in
samp "$(cat $D/big2.in)" "10000000000000"
timefast $D/big2.in
echo "PASS samples=$NS fuzz=$NF"
