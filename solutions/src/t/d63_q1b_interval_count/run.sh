set -e
D=$(dirname $0); S=$D/../../sol/d63_q1b_interval_count
g++ -O2 -o $D/a $S/main.cpp
[ "$(printf '5 5 1\n1 3 5 9 10\n1 2 3 7 20\n' | $D/a)" = "1 2 1 0 0" ]
[ "$(printf '3 5 1000000\n1000000 1 2000001\n1000000 1000001 1 2 3\n' | $D/a)" = "2 3 2 2 2" ]
[ "$(printf '3 5 0\n4 8 2\n1 2 3 4 5\n' | $D/a)" = "0 1 0 1 0" ]
cat > $D/brute.py <<'P'
import sys
d=sys.stdin.read().split(); n,m,k=int(d[0]),int(d[1]),int(d[2]); a=list(map(int,d[3:3+n])); q=list(map(int,d[3+n:3+n+m]))
print(" ".join(str(sum(1 for x in a if p-k<=x<=p+k)) for p in q))
P
for s in $(seq 300); do python3 -c "
import random; random.seed($s); n=random.randint(1,30); m=random.randint(1,30); k=random.randint(0,20)
a=random.sample(range(0,100),n); print(n,m,k); print(*a); print(*[random.randint(0,100) for _ in range(m)])" > $D/in
[ "$($D/a < $D/in)" = "$(python3 $D/brute.py < $D/in)" ] || { echo "FAIL seed $s"; exit 1; }
done
python3 -c "
import random; n=m=200000; print(n,m,10**9//3); print(*random.sample(range(10**9+1),n)); print(*[random.randint(0,10**9) for _ in range(m)])" > $D/big
s=$(date +%s.%N); $D/a < $D/big > /dev/null; echo "big: $(echo "$(date +%s.%N) - $s" | bc)s"
echo PASS
