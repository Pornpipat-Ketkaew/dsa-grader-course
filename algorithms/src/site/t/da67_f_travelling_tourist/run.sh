D=$(cd $(dirname $0); pwd); source $D/../lib.sh; BIN=$D/a
prog da67_f_travelling_tourist
samp "3 3 3\n1 2 3\n1 2 15\n1 3 4\n2 3 7" "11"
samp "4 6 4\n1 2 3 4\n1 2 38\n1 4 97\n2 4 47\n3 4 38\n2 3 24\n1 3 75" "100"
samp "5 4 2\n3 5\n1 2 22\n2 3 78\n3 4 30\n4 5 39" "69"
samp "5 5 3\n2 3 5\n1 2 1\n2 3 7\n3 4 250\n4 5 18\n1 5 4" "12"
fuzz 300 $D/gen.py "python3 $D/brute.py"
python3 -c "
import random; random.seed(1); n=500; E=[(a,b) for a in range(1,n+1) for b in range(a+1,n+1)]
print(n,len(E),8); print(*random.sample(range(1,n+1),8)); [print(a,b,random.randint(1,1000)) for a,b in E]" > $D/big.in
timefast $D/big.in
echo "PASS samples=$NS fuzz=$NF"
